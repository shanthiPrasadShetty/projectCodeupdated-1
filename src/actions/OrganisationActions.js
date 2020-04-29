import { services, ACTION_TYPES, URLS } from "../utils";


export const getAllOrganisation  = () => {
    return async dispatch => {
      dispatch({
        type: ACTION_TYPES.GET_ALL_ORGANISATION,
        payload: {}
      });
      const {
        error,
        response,
      } = await services.makeCall('get', URLS.Organisation);
      if (response) {
        dispatch({
          type: ACTION_TYPES.GET_ALL_ORGANISATION_SUCCESS,
          payload: response,
        });
      }
      if (error) {
        dispatch({
          type: ACTION_TYPES.GET_ALL_ORGANISATION_FAILED,
          payload: error,
        });
      }
    };
  };

  export const setOrganisationId  = (orgId) => {
    return async dispatch => {
      dispatch({
        type: ACTION_TYPES.SET_ORGANISATION_ID,
        payload: {orgId}
      });
  }
};