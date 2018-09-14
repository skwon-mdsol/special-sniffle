import React from 'react';
import {MedidationDetailContainer} from './MedidationDetailContainer';
import jasmineEnzyme from 'jasmine-enzyme';
import {shallow} from 'enzyme';

describe('MedidationDetailContainer', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });

  const defaultMedidation = {id: 1, name: 'Test User', title: {id: 1, value: 'Test Title'}};
  let loadMedidations;

  beforeEach(() => {
    loadMedidations = jasmine.createSpy('loadMedidations');
  });

  function render (medidation) {
    return shallow(<MedidationDetailContainer medidation={medidation} loadMedidations={loadMedidations} />);
  }

  it('passes medidation to the child component', () => {
    const component = render(defaultMedidation);
    expect(component.find('MedidationDetail')).toHaveProp('medidation', defaultMedidation);
  });

  it('loads data if there is no medidation', () => {
    render().instance().componentDidMount();
    expect(loadMedidations).toHaveBeenCalled();
  });

  it('does not load data if there is a medidation', () => {
    render(defaultMedidation).instance().componentDidMount();
    expect(loadMedidations).not.toHaveBeenCalled();
  });
});
