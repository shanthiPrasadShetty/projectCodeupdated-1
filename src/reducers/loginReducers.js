import ip from 'icepick';
import { ACTION_TYPES } from '../utils';

const initialState = ip.freeze({
    loginOrganisationStatus: null,
    loginOrganisationResponse: null,
    loginOrganisationError: null,

    sign_Up: {
        
        userAuthentication_Status: null,
        userAuthentication_Response: null,
        userAuthentication_Error: null,

    }
});

export default function loginReducer(state = initialState, action){
    switch(action.type){
        case ACTION_TYPES.LOGIN_ORGANISATION: {
            
            state = ip.setIn(state, ['loginOrganisationStatus'], 'started');
            return state;
        }
        case ACTION_TYPES.LOGIN_ORGANISATION_SUCCESS: {
            
            state = ip.setIn(state, ['loginOrganisationStatus'], 'success');
            state = ip.setIn(state, ['loginOrganisationResponse'], action.payload);
            state = ip.setIn(state, ['loginOrganisationError'], null);
            return state;
        }
        case ACTION_TYPES.LOGIN_ORGANISATION_FAILED: {
            
            state = ip.setIn(state, ['loginOrganisationStatus'], 'failed');
            state = ip.setIn(state, ['loginOrganisationError'], action.payload);
            state = ip.setIn(state, ['loginOrganisationResponse'], null);
            return state;
        }

//Sign Up process
       case ACTION_TYPES.SIGN_UP: {
              state = ip.setIn(state, ['sign_Up','confirmationCode_Status'], 'started');
                return state;
            }
           case ACTION_TYPES.SIGN_UP_SUCCESS: {
                state = ip.setIn(state, ['sign_Up','confirmationCode_Status'], 'success');
                state = ip.setIn(state, ['sign_Up','confirmationCode_Response'], action.payload);
                state = ip.setIn(state, ['sign_Up','confirmationCode__Error'], null);
                return state;
            }
            case ACTION_TYPES.SIGN_UP_FAILED: {
                state = ip.setIn(state, ['sign_Up','confirmationCode_Status'], 'failed');
                state = ip.setIn(state, ['sign_Up','confirmationCode_Response'], action.payload);
                state = ip.setIn(state, ['sign_Up','confirmationCode__Error'], null);
                return state;
            }
    
            case ACTION_TYPES.CONFIRM_USER: {
                state = ip.setIn(state, ['sign_Up','confirmUser_Status'], 'started');
                return state;
            }
            case ACTION_TYPES.CONFIRM_USER_SUCCESS: {
                state = ip.setIn(state, ['sign_Up','confirmUser_Status'], 'success');
                state = ip.setIn(state, ['sign_Up','confirmUser_Response'], action.payload);
                state = ip.setIn(state, ['sign_Up','confirmUser_Error'], null);
                return state;
            }
            case ACTION_TYPES.CONFIRM_USER_FAILED: {
                state = ip.setIn(state, ['sign_Up','confirmUser_Status'], 'failed');
                state = ip.setIn(state, ['sign_Up','confirmUser_Response'], action.payload);
                state = ip.setIn(state, ['sign_Up','confirmUser_Error'], null);
                return state;
            }

        case ACTION_TYPES.USER_AUTHENTICATION: {
            state = ip.setIn(state, ['sign_Up','userAuthentication_Status'], 'started');
            return state;
        }
        case ACTION_TYPES.USER_AUTHENTICATION_SUCCESS: {
            state = ip.setIn(state, ['sign_Up','userAuthentication_Status'], 'success');
            state = ip.setIn(state, ['sign_Up','userAuthentication_Response'], action.payload);
            state = ip.setIn(state, ['sign_Up','userAuthentication_Error'], null);
            return state;
        }
        case ACTION_TYPES.USER_AUTHENTICATION_FAILED: {
            state = ip.setIn(state, ['sign_Up','userAuthentication_Status'], 'failed');
            state = ip.setIn(state, ['sign_Up','userAuthentication_Response'], action.payload);
            state = ip.setIn(state, ['sign_Up','userAuthentication_Error'], null);
            return state;
        }

        case ACTION_TYPES.GET_CODE: {
                        state = ip.setIn(state, ['sign_Up','getCode_Status'], 'started');
                        return state;
                    }
                    case ACTION_TYPES.GET_CODE_SUCCESS: {
                        state = ip.setIn(state, ['sign_Up','getCode_Status'], 'success');
                        state = ip.setIn(state, ['sign_Up','getCode_Response'], action.payload);
                        state = ip.setIn(state, ['sign_Up','getCode_Error'], null);
                        return state;
                    }
                    case ACTION_TYPES.GET_CODE_FAILED: {
                        state = ip.setIn(state, ['sign_Up','getCode_Status'], 'failed');
                        state = ip.setIn(state, ['sign_Up','getCode_Response'], action.payload);
                        state = ip.setIn(state, ['sign_Up','getCode_Error'], null);
                        return state;
                    }
            
                    case ACTION_TYPES.RESET_PASSWORD: {
                        state = ip.setIn(state, ['sign_Up','resetPasswordCode_Status'], 'started');
                        return state;
                    }
                    case ACTION_TYPES.RESET_PASSWORD_SUCCESS: {
                        state = ip.setIn(state, ['sign_Up','resetPasswordCode_Status'], 'success');
                        state = ip.setIn(state, ['sign_Up','resetPasswordCode_Response'], action.payload);
                        state = ip.setIn(state, ['sign_Up','resetPasswordCode_Error'], null);
                        return state;
                    }
                    case ACTION_TYPES.RESET_PASSWORD_FAILED: {
                        state = ip.setIn(state, ['sign_Up','resetPasswordCode_Status'], 'failed');
                        state = ip.setIn(state, ['sign_Up','resetPasswordCode_Response'], action.payload);
                        state = ip.setIn(state, ['sign_Up','resetPasswordCode_Error'], null);
                        return state;
                    }
            
                    case ACTION_TYPES.CONFIRM_NEW_PASSWORD: {
                        state = ip.setIn(state, ['sign_Up','newPassword_confirmation_Status'], 'started');
                        return state;
                    }
                    case ACTION_TYPES.CONFIRM_NEW_PASSWORD_SUCCESS: {
                        state = ip.setIn(state, ['sign_Up','newPassword_confirmation_Status'], 'success');
                        state = ip.setIn(state, ['sign_Up','newPassword_confirmation_Response'], action.payload);
                        state = ip.setIn(state, ['sign_Up','newPassword_confirmation_Error'], null);
                        return state;
                    }
                    case ACTION_TYPES.CONFIRM_NEW_PASSWORD_FAILED: {
                        state = ip.setIn(state, ['sign_Up','newPassword_confirmation_Status'], 'failed');
                        state = ip.setIn(state, ['sign_Up','newPassword_confirmation_Response'], action.payload);
                        state = ip.setIn(state, ['sign_Up','newPassword_confirmation_Error'], null);
                        return state;
                    }
            
                    case ACTION_TYPES.CHECK_USER_EXIST: {
                        state = ip.setIn(state, ['sign_Up','check_user_exist', 'status'], 'started');
                        return state;
                    }
                    case ACTION_TYPES.CHECK_USER_EXIST_SUCCESS: {
                        state = ip.setIn(state, ['sign_Up', 'check_user_exist', 'status'], 'success');
                        state = ip.setIn(state, ['sign_Up', 'check_user_exist', 'response'], action.payload);
                        return state;
                    }
                    case ACTION_TYPES.CHECK_USER_EXIST_FAILED: {
                        state = ip.setIn(state, ['sign_Up','check_user_exist', 'status'], 'failed');
                        state = ip.setIn(state, ['sign_Up','check_user_exist', 'response'], action.payload);
                        return state;
                    }
        default:
            return state;
    }
}
