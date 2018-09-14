import {
  MEDIDATIONS_LOADED,
  MEDIDATIONS_LOADING,
  MEDIDATION_CREATED
} from './actions';

const defaultMedidations = {
  loading: false,
  loaded: false,
  totalResults: 0,
  items: []
};

export const medidations = (state = defaultMedidations, action) => {
  switch (action.type) {
    case MEDIDATIONS_LOADED: return {
      loading: false,
      loaded: true,
      totalResults: action.payload.totalResults,
      items: action.payload.items
    };
    case MEDIDATIONS_LOADING: return Object.assign({}, state, {loading: true});
    case MEDIDATION_CREATED: {
      let newMedidation = action.payload;
      newMedidation.titleId = parseInt(newMedidation.titleId, 10);
      newMedidation.title = state.items.find(m => m.titleId === newMedidation.titleId).title;
      const newItems = [...state.items, action.payload];
      return Object.assign({}, state, {items: newItems, loading: false, totalResults: state.totalResults + 1});
    }
    default: return state;
  }
};
