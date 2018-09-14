import {push} from 'react-router-redux';
import {API_ENDPOINT} from '../config';
import api, { denormalizeData } from './../api';

export const MEDIDATIONS_LOADED = 'MEDIDATIONS_LOADED';
export const MEDIDATIONS_LOADING = 'MEDIDATIONS_LOADING';
export const MEDIDATION_CREATED = 'MEDIDATION_CREATED';

export function medidatationsLoading (medidatations) {
  return {
    type: MEDIDATIONS_LOADING
  };
}

export function medidatationsLoaded (medidatations) {
  return {
    type: MEDIDATIONS_LOADED,
    payload: medidatations
  };
}

export function createMedidation (medidation) {
  return {
    type: MEDIDATION_CREATED,
    payload: medidation
  };
}

export const loadMedidations = (page = 1, perPage = 10) => dispatch => {
  dispatch(medidatationsLoading());
  const response = api.getState();
  const { medidations, titles } = response;
  const data = denormalizeData(medidations, 'titleId', titles.entities, 'title')
  dispatch(medidatationsLoaded({
    items: data,
    totalResults: data.length
  }));
};

export const addMedidation = (medidation) => async dispatch => {
  dispatch(medidatationsLoading());
  let response = await axios.post(API_ENDPOINT + 'medidations', medidation);
  dispatch(createMedidation(response.data));
  dispatch(push('/medidations/'));
};
