import { mount } from 'enzyme';
import { MemoryRouter, Router } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { Navbar } from '../../components/ui/NavBar';
import { types } from '../../types/types';

describe('Prueba en <NavBar/>', () => {
  const historyMock = {
    push: jest.fn(),
    replace: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
  };

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: 'Maria',
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('debe de mostarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('Maria');
  });

  test('debe de llamart el logout y usar el history ', () => {
    wrapper.find('button').prop('onClick')();

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.logout,
    });

    expect(historyMock.replace).toHaveBeenCalledWith('/login');
  });
});
