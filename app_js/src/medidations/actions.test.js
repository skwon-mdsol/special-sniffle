import {
  loadMedidations, MEDIDATIONS_LOADED, MEDIDATIONS_LOADING,
  addMedidation, MEDIDATION_CREATED
} from './actions';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('loadMedidations', () => {
  let mockAxios, mockDispatch;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    mockDispatch = jasmine.createSpy('dispatch');
  });

  afterEach(() => {
    mockAxios.restore();
  });

  function mockSuccess (data, page = 1, perPage = 10, totalCount = data.length) {
    mockAxios.onGet('/api/medidations', {params: {
      _expand: 'title',
      _page: page,
      _limit: perPage
    }}).reply(200, data, {'x-total-count': totalCount});
  }

  it('dispatches the right events', (done) => {
    let mockData = [{
      name: 'test',
      title: {
        value: 'test title'
      }
    }];
    mockSuccess(mockData);
    loadMedidations()(mockDispatch).then(() => {
      expect(mockDispatch.calls.count()).toEqual(2);
      expect(mockDispatch.calls.argsFor(0)).toEqual([
        {type: MEDIDATIONS_LOADING}
      ]);
      expect(mockDispatch.calls.argsFor(1)).toEqual([
        {
          type: MEDIDATIONS_LOADED,
          payload: {items: mockData, totalResults: 1}
        }
      ]);
      done();
    }).catch(done.fail);
  });
});

describe('addMedidation', () => {
  let mockAxios, mockDispatch;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    mockDispatch = jasmine.createSpy('dispatch');
  });

  afterEach(() => {
    mockAxios.restore();
  });

  function mockSuccess (data) {
    mockAxios.onPost('/api/medidations').reply(200, data);
  }

  it('should dispatch the right events', (done) => {
    let med = {name: 'test user', title: {id: 1, value: 'test title'}};
    mockSuccess(med);
    addMedidation(med)(mockDispatch)
    .then(() => {
      expect(mockDispatch.calls.count()).toEqual(3);
      expect(mockDispatch.calls.argsFor(0)).toEqual([
        {type: MEDIDATIONS_LOADING}
      ]);
      expect(mockDispatch.calls.argsFor(1)).toEqual([
        {
          type: MEDIDATION_CREATED,
          payload: med
        }
      ]);
    })
    .then(done)
    .catch(done.fail);
  });
});
