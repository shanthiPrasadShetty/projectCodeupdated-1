import { CONSTANTS, ACTION_TYPES } from "../utils";
import Services from "../utils/services";
import { testUser } from './user.js';
export * from './loginActions.js';
export * from './projectAction';
export * from './OrganisationActions';
export * from './UserActions';

export const authentication = (
  client_id,
  response_type,
  redirect_uri,
  response_mode,
  scope,
  state,
  nonce
) => {
  return dispatch => {
    dispatch({
      type: "authorization"
    });
    if (response) {
      dispatch({
        type: "success"
      });
   } else if (error) {
      dispatch({
        type: "failure"
      });
    }
  };
};