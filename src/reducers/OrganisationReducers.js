import ip from 'icepick';
import { services, ACTION_TYPES } from "../utils";

const initialState = ip.freeze({
  getAllOrganisationStatus: null,
  getAllOrganisationResponse: null,
  getAllOrganisationError: null,

});

export default function organisationReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_ORGANISATION: {
      state = ip.setIn(state, ['getAllOrganisationStatus'], 'started');
      return state;
    }

    case ACTION_TYPES.GET_ALL_ORGANISATION_SUCCESS: {
      state = ip.setIn(state, ['getAllOrganisationStatus'], 'success');
      state = ip.setIn(state, ['getAllOrganisationResponse'], action.payload);
      state = ip.setIn(state, ['getAllOrganisationError'], null);
      return state;
    }

    case ACTION_TYPES.GET_ALL_ORGANISATION_FAILED: {
      state = ip.setIn(state, ['getAllOrganisationStatus'], 'failed');
      state = ip.setIn(state, ['getAllOrganisationError'], action.payload);
      state = ip.setIn(state, ['getAllOrganisationResponse'], null);
      return state;
    }

    //Set org

    case ACTION_TYPES.SET_ORGANISATION_ID: {
      state = ip.setIn(state, ['orgId'],action.payload.orgId);
      return state;
    }

    default: {
      return state;
    }
  }
}