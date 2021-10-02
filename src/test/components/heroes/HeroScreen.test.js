import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { HeroScreen } from '../../../components/heroes/HeroScreen';

describe('Pruebas en <HeroScreen />', () => {
  const history = {
    length: 10,
    goBack: jest.fn(),
    push: jest.fn(),
  };

  test('debe de mostrarse redirect si no hay argumento en el url', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <HeroScreen history={history} />
      </MemoryRouter>
    );
    expect(wrapper.find('Redirect').exists()).toBe(true);
  });

  test('debe de mostrar un hero si el parametro eexiste y se encuentra', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route path='/hero/:heroId' component={HeroScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find('.row').exists()).toBe(true);
  });

  test('debe de regresar a la pantalla anterior con PUSH', () => {
    const history = {
      length: 2,
      goBack: jest.fn(),
      push: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route
          path='/hero/:heroId'
          component={() => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper.find('button').prop('onClick')();
    expect(history.push).toHaveBeenCalledWith('/');
    expect(history.goBack).not.toHaveBeenCalled();
  });

  test('debe de regresar a la pantalla anterior con GOBACK', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route
          path='/hero/:heroId'
          component={() => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper.find('button').prop('onClick')();
    expect(history.push).toHaveBeenCalledTimes(0);
    expect(history.goBack).toHaveBeenCalled();
  });

  test('debe de llamar el redirect si el hero no existe', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider45564564']}>
        <Route
          path='/hero/:heroId'
          component={() => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );

    expect(wrapper.text()).toBe('');
  });
});
