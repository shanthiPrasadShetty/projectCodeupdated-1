import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails
} from "amazon-cognito-identity-js";

import appConfig from "../../utils/config.js";

define(function (require) {
    Config.region = appConfig.region;
    Config.credentials = new CognitoIdentityCredentials({
        IdentityPoolId: appConfig.IdentityPoolId
    });

    const userPool = new CognitoUserPool({
        UserPoolId: appConfig.UserPoolId,
        ClientId: appConfig.ClientId,
    });
    var cognitoUser;
    var cognitoServer = {
        
        signup: function(userData, attributeList, cbSuccess, cbFailure) {
            
            userPool.signUp(userData.username, userData.password, attributeList, null, function(err, result) {            
                    if (err) {
                        // alert(err.message);
                        if(cbFailure)
                            cbFailure(err.message);
                        return;
                    }
                    if (cbSuccess) {
                        cbSuccess(result)
                    }  
            });
            
        },
        requestCode: function(username, cbSuccess, cbFailure) {
            var userData = {
                Username : username,
                Pool : userPool
            };
            
            cognitoUser = new CognitoUser(userData);
            cognitoUser.resendConfirmationCode(function(err, result) {
                if (err) {
                    alert("Error occured!!");
                    return;
                }
            });
        },
        confirmUser: function(username, code, cbSuccess, cbFailure) {
            var userData = {
                Username : username,
                Pool : userPool
            };

            cognitoUser = new CognitoUser(userData);
            cognitoUser.confirmRegistration(code, true, function(err, result) {
                if (err) {
                    if(cbFailure)
                        cbFailure(err)
                    return;
                }
                if (cbSuccess)
                    cbSuccess(result)
            });
        },
        updateAttribute: function(username, attribute, cbSuccess, cbFailure) {
            var attribute = new CognitoUserAttribute(attribute);
            var attributeList = [];
            attributeList.push(attribute);
            var userData = {
                Username : username,
                Pool : userPool
            };
            cognitoUser.updateAttributes(attributeList, function(err, result) {
                if (err) {
                    alert("Error occured!!");
                    return;
                }
                if(cbSuccess) {
                    cbSuccess(result);
                }
            });
        },
        getAttributes: function(cbSuccess, cbFailure) {
            cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                    if(cbFailure)
                        cbFailure(err)
                    return;
                }
                if(cbSuccess) {
                    cbSuccess(result)
                }
            });
        },
        authenticate: function (userdata, cbSuccess, cbFailure) {
            var authenticationData = {
                Username: userdata.username,
                Password: userdata.password,
            };
            var authenticationDetails = new AuthenticationDetails(authenticationData);

            var userData = {
                Username: userdata.username,
                Pool: userPool
            };
            cognitoUser = new CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    if (cbSuccess) {
                        cbSuccess(result)
                    }
                },
                onFailure: function (err) {                   
                        // alert(err.message);
                         if(cbFailure)
                        cbFailure(err);
                },
            });
        },
        forgotPassword: function(userdata, cbSuccess, cbFailure) {
            var userData = {
                Username: userdata,
                Pool: userPool
            };
            cognitoUser = new CognitoUser(userData);
            cognitoUser.forgotPassword({
                onSuccess: function (result) {
                    if (cbSuccess)
                        cbSuccess(result)
                },
                onFailure: function (err) {
                    //alert(err);
                    if (cbFailure)
                        cbFailure(err)
                },
            });
        },
        confirmPassword: function(userdata, cbSuccess, cbFailure) {
            var userData = {
                Username: userdata.userName,
                Pool: userPool
            };
            cognitoUser = new CognitoUser(userData);
            cognitoUser.confirmPassword(userdata.code, userdata.password, {
                onSuccess: function (result) {
                    if (cbSuccess)
                        cbSuccess(result)
                },
                onFailure: function (err) {
                    //alert("err");
                    if (cbFailure)
                        cbFailure(err)
                }
            });
        }
    }
    return cognitoServer;
});
