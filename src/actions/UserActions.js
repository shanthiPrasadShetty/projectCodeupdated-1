import { services, ACTION_TYPES, URLS } from "../utils";

export const getUserPrivileges = (id) => {
  var UserPrivileges = [];
  let userId = id;// || localStorage.getItem("userId")

  return async dispatch => {
    dispatch({
      type: ACTION_TYPES.GET_USER_PRIVILEGES,
      payload: {}
    });
    const {
      error,
      response,
    } = await services.makeCall('get', URLS.Privilege + '/user/' + userId);
    if (response) {
      localStorage.setItem('UserPrivileges', response[0].privilegeName)
      response.map((data) => {
        UserPrivileges.push({
          "name": data.privilegeName
        })
      })


      dispatch({
        type: ACTION_TYPES.GET_USER_PRIVILEGES_SUCCESS,
        payload: UserPrivileges,
      });
      UserPrivileges = [];
    }
    if (error) {
      dispatch({
        type: ACTION_TYPES.GET_USER_PRIVILEGES_FAILED,
        payload: error,
      });
    }
  };
}

export const getAllUser = (orgId) => {
  return async dispatch => {
    dispatch({
      type: ACTION_TYPES.GET_ALL_USER,
      payload: {}
    });
    const {
      error,
      response,
    } = await services.makeCall('get', URLS.User, {}, { orgId });
    if (response) {
      dispatch({
        type: ACTION_TYPES.GET_ALL_USER_SUCCESS,
        payload: response,
      });
    }
    if (error) {
      dispatch({
        type: ACTION_TYPES.GET_ALL_USER_FAILED,
        payload: error,
      });
    }
  };
};
