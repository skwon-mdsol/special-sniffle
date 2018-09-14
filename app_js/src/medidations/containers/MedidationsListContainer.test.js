import React from 'react';
import {MedidationsListContainer} from './MedidationsListContainer';
import jasmineEnzyme from 'jasmine-enzyme';
import {shallow} from 'enzyme';

describe('MedidationsListContainer', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });

  const defaultMedidations = [{id: 1, name: 'Test User', title: {id: 1, value: 'Test Title'}}];
  let loadMedidations;

  beforeEach(() => {
    loadMedidations = jasmine.createSpy('loadMedidations');
  });

  function render (items, totalResults = items.length, loading = true, loaded = true) {
    return shallow(<MedidationsListContainer medidations={{items, totalResults, loading, loaded}} loadMedidations={loadMedidations} />);
  }

  it('passes medidations to the child component', () => {
    const component = render(defaultMedidations);
    expect(component.find('MedidationsList')).toHaveProp('items', defaultMedidations);
  });

  it('loads data if the data wasn\'t previously loaded', () => {
    render([], 0, false, false).instance().componentDidMount();
    expect(loadMedidations).toHaveBeenCalled();
  });

  it('does not load data if data has been loaded already', () => {
    render(defaultMedidations).instance().componentDidMount();
    expect(loadMedidations).not.toHaveBeenCalled();
  });
});
