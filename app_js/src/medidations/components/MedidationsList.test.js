import React from 'react';
import jasmineEnzyme from 'jasmine-enzyme';
import {shallow} from 'enzyme';

import MedidationsList from './MedidationsList';

describe('MedidationsList', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });

  let onPaginate;

  beforeEach(() => {
    onPaginate = jasmine.createSpy('onPaginate');
  });

  function render ({loading = false, items = [], totalResults = items.length} = {}) {
    return shallow(<MedidationsList loading={loading} items={items} totalResults={totalResults} onPaginate={onPaginate} />);
  }

  it('renders a row per medidation', () => {
    let component = render({items: [
      {id: 1, name: 't1', title: {id: 1, value: 'v1'}},
      {id: 2, name: 't2', title: {id: 1, value: 'v1'}},
      {id: 3, name: 't3', title: {id: 1, value: 'v1'}},
      {id: 4, name: 't4', title: {id: 1, value: 'v1'}}
    ]});

    // 4 rows, plus the header row
    expect(component.find('tr').length).toEqual(5);
  });

  it('passes through pagination events', () => {
    let component = render({items: [
      {id: 1, name: 't1', title: {id: 1, value: 'v1'}},
      {id: 2, name: 't2', title: {id: 1, value: 'v1'}}
    ]});
    component.find('Paginate').simulate('paginate', {page: 2, perPage: 10});
    expect(onPaginate).toHaveBeenCalledWith({page: 2, perPage: 10});
  });
});
