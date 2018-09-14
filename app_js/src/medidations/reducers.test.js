import {medidations} from './reducers';
import {
  MEDIDATIONS_LOADING,
  MEDIDATIONS_LOADED
} from './actions';

describe('medidations reducer', () => {
  it('has a default value', () => {
    expect(medidations(undefined, {type: 'doesnt matter'})).toEqual({
      loading: false,
      loaded: false,
      totalResults: 0,
      items: []
    });
  });

  it('can start loading', () => {
    expect(medidations(undefined, {type: MEDIDATIONS_LOADING}))
      .toEqual({
        loading: true,
        loaded: false,
        totalResults: 0,
        items: []
      });
  });

  it('can load data', () => {
    const action = {
      type: MEDIDATIONS_LOADED,
      payload: {
        items: [{x: 1}],
        totalResults: 1
      }
    };
    expect(medidations({loading: true, items: []}, action))
      .toEqual({
        loading: false,
        loaded: true,
        totalResults: 1,
        items: [{x: 1}]
      });
  });
});
