import axios from 'axios';
import { createAction } from 'redux-actions';

export const fetchLocationsRequest = createAction('LOCATIONS_FETCH_REQUEST');
export const fetchLocationsSuccess = createAction('LOCATIONS_FETCH_SUCCESS');
export const fetchLocationsFailure = createAction('LOCATIONS_FETCH_FAILURE');
export const toggleIsOpen = createAction('TOGGLE_IS_OPEN');

export const fetchLocations = () => async (dispatch) => {
  dispatch(fetchLocationsRequest());
  try {
    // const url = "https://nomad-map.herokuapp.com/nomad_cities/index";
    const url = "http://localhost:3000/nomad_cities/index";
    const response = await axios.get(url);
    const updatedLocations = response.data.map(user => {
      return {...user, isOpen: false}
    });
    dispatch(fetchLocationsSuccess(updatedLocations));
  } catch (e) {
    console.log(e);
    dispatch(fetchLocationsFailure());
  }
};