const { mount } = require('enzyme');
const { AuthContext } = require('../../auth/AuthContext');
const { AppRouter } = require('../../routers/AppRouter');

describe('Pruebas en <AppRouter />', () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };

  test('debe de mostrar login si no esta autenticado', () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de mostrar el component marvel si esta autenticado', () => {
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        logged: true,
        name: 'Nelson',
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    console.log(wrapper.html());
    expect(wrapper.find('.navbar').exists()).toBe(true);
  });
});
