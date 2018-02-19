import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const locationFetchingState = handleActions({
  [actions.fetchLocationsRequest]() {
    return 'requested';
  },
  [actions.fetchLocationsFailure]() {
    return 'failed';
  },
  [actions.fetchLocationsSuccess]() {
    return 'successed';
  },
}, 'none');

const initialLocationState = {
  locations: [],
};

const locations = handleActions({
	[actions.fetchLocationsSuccess](state, { payload: locations }) {
		return { ...state, locations };
  },
  [actions.toggleIsOpen](state, { payload: entry }) {
    const deleteEntry = state.locations.filter(elem => entry.id !== elem.id);
    const newEntry = { ...entry, isOpen: !entry.isOpen }
    const newLocations = [...deleteEntry, newEntry];
    return { ...state, locations: newLocations };
  },
}, initialLocationState);

export default combineReducers({
	locationFetchingState,
  locations,
});