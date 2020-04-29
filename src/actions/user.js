import { services, CONSTANTS, URLS } from "../utils";

export const testUser  = (data) => {
  return async dispatch => {
    dispatch({
      type: CONSTANTS.ADD_USER,
      payload: {}
    });
    const {
      error,
      response,
    } = await services.makeCall('post', URLS.User, data);
    if (response) {
      dispatch({
        type: CONSTANTS.ADD_USER_SUCCESS,
        payload: response,
      });
    }
    if (error) {
      dispatch({
        type: CONSTANTS.ADD_USER_FAILED,
        payload: error,
      });
    }
  };
};
