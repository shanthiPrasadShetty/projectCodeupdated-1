import ip from 'icepick';
import { services, ACTION_TYPES } from "../utils";

const initialState = ip.freeze({
  getAllUserStatus: null,
  getAllUserResponse: null,
  getAllUserError: null,
});

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.GET_USER_PRIVILEGES: {
      state = ip.setIn(state, ['getUserPrivilegesStatus'], 'started');
      return state;
    }
    case ACTION_TYPES.GET_USER_PRIVILEGES_SUCCESS: {
      state = ip.setIn(state, ['getUserPrivilegesStatus'], 'success');
      state = ip.setIn(state, ['getUserPrivilegesResponse'], action.payload);
      state = ip.setIn(state, ['getUserPrivilegesError'], null);
      return state;
    }
    case ACTION_TYPES.GET_USER_PRIVILEGES_FAILED: {
      state = ip.setIn(state, ['getUserPrivilegesStatus'], 'failed');
      state = ip.setIn(state, ['getUserPrivilegesResponse'], null);
      state = ip.setIn(state, ['getUserPrivilegesError'], action.payload);
      return state;
    }
    // Get UserId

    case ACTION_TYPES.GET_ALL_USER: {
      state = ip.setIn(state, ['getAllUserStatus'], 'started');
      return state;
    }

    case ACTION_TYPES.GET_ALL_USER_SUCCESS: {
      state = ip.setIn(state, ['getAllUserStatus'], 'success');
      state = ip.setIn(state, ['getAllUserResponse'], action.payload);

      state = ip.setIn(state, ['getAllUserError'], null);
      return state;
    }

    case ACTION_TYPES.GET_ALL_USER_FAILED:{
      state = ip.setIn(state, ['getAllUserStatus'], 'failed');
      state = ip.setIn(state, ['getAllUserResponse'], null);
      state = ip.setIn(state, ['getAllUserError'], action.payload);
      return state;
    }
    default : {
      return state;
    }
  }
}
