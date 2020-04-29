import { services, ACTION_TYPES, URLS } from "../utils";
import cognitoServer from "../containers/Login/cognitoServices.js"


export const loginOrganisation = (data) => {
    return async dispatch => {
        dispatch({
            type: ACTION_TYPES.LOGIN_ORGANISATION,
            payload: {}
        });
        const {
          error,
          response,
        } = await services.makeCall('get', URLS.Login+'/'+data.email);
        if(response) {
        
          if(response && response.organization_id){
            localStorage.setItem('orgId', response.organization_id)
          }

          dispatch({
                 type: ACTION_TYPES.LOGIN_ORGANISATION_SUCCESS,
                 payload: response
             });
        }
        if(error) {
              dispatch({
                 type: ACTION_TYPES.LOGIN_ORGANISATION_FAILED,
                 payload: {error: "Inavlid Email or Password"},
             });
        }

    };
};


export const authenticate = (authenticationData) => {
    return async dispatch => {
           dispatch({
                type: ACTION_TYPES.USER_AUTHENTICATION,
                payload: {}
                },
           );
           await cognitoServer.authenticate(authenticationData,
                (response) => {
                    localStorage.setItem('accessToken',response.getAccessToken().getJwtToken());
                    localStorage.setItem('idToken',response.getIdToken().getJwtToken());
                    localStorage.setItem('refreshToken',response.getRefreshToken().getToken());
                    localStorage.setItem('loggedInUser',"true");
                    // localStorage.setItem(ACTION_TYPES.ORG_LOGIN_DB, response.id);
                    // localStorage.setItem('userId',response.getIdToken().getJwtToken());
                    dispatch({
                            type: ACTION_TYPES.USER_AUTHENTICATION_SUCCESS,
                            payload: response
                            });
                    },
                (error) => {
                    dispatch({
                            type: ACTION_TYPES.USER_AUTHENTICATION_FAILED,
                            payload: error,
                            });
                        }
                );

    };
};

// Sign up process

// get signUp confirmation code
export const signUp = (authenticationData, attributeList) => {
    
    return async dispatch => {
        
           dispatch({
                type: ACTION_TYPES.SIGN_UP,
                payload: {}
                },
           );
           await cognitoServer.signup(authenticationData, attributeList,
                (response) => {
                   
                    
                    dispatch({
                            type: ACTION_TYPES.SIGN_UP_SUCCESS,
                            payload: response
                            });
                       
                    },
                (error) => {
                    dispatch({
                            type: ACTION_TYPES.SIGN_UP_FAILED,
                            payload: error,
                            });
                        }
                );
            

    };

};
// confirm signUp code
export const confirmUser = (username, code) => {
    return async dispatch => {
           dispatch({
                type: ACTION_TYPES.CONFIRM_USER,
                payload: {}
                },
           );
           await cognitoServer.confirmUser(username, code,
                (response) => {
                    dispatch({
                            type: ACTION_TYPES.CONFIRM_USER_SUCCESS,
                            payload: response
                            });
                    },
                (error) => {
                    dispatch({
                            type: ACTION_TYPES.CONFIRM_USER_FAILED,
                            payload: error,
                            });
                        }
                );

    };
};