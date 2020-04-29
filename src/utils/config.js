

var config = {}
let s3Folder = 'testing';

if(process.env.NODE_ENV == "production") {
  config = {
    region: '',
    IdentityPoolId: '',
    UserPoolId: 'ap-south-1_YA9z71a4d',
    ClientId: '24hu3kv4nq3gb4ne6dig7dpuvt',
    baseURL: window.location.port != "" ? window.location.protocol + "//"+window.location.hostname+":"+window.location.port : window.location.protocol + "//"+window.location.hostname
  }
  s3Folder = 'live';
}
else if(process.env.NODE_ENV == "stage") {
  config = {
    region: '',
    IdentityPoolId: '',
    UserPoolId: 'ap-south-1_b58Vhw0vM',
    ClientId: '1985q7pmq67en620r91lp7br27',
    baseURL: window.location.port != "" ? window.location.protocol + "//"+window.location.hostname+":"+window.location.port : window.location.protocol + "//"+window.location.hostname
  }
  s3Folder = 'staging'
}
else {
  config = {
    region: '',
    IdentityPoolId: '',
    UserPoolId: 'ap-south-1_b58Vhw0vM',
    ClientId: '1985q7pmq67en620r91lp7br27',
    baseURL: 'http://dev.taskmonk.io'
  }
  s3Folder = 'testing'
}

export { s3Folder };
export default config;

export const URLS = {
    User: '/api/user',
    Roles: '/api/role',
    AccessTypes: '/api/accesstype',
    Organisation: '/api/organization',
    User: '/api/user',
    Project: '/api/project',
    Field: '/api/field',
    Privilege: '/api/privilege',
    Login: '/api/user/email',
    Skill:'/api/skill',
    AddCrowdUser: '/api/user/crowduser/add',
    UpdateCrowdUserDetail: '/api/user/crowduser'
  }
  
  export const baseURL = 'http://mspl-internal-api.eastus2.cloudapp.azure.com:9001';
  export const azureURL = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
  export const reportUrl = 'http://101.53.141.126:8080/jasperserver/flow.html?decorate=no&j_username=jasperadmin&j_password=jasperadmin&_flowId=viewReportFlow&ParentFolderUri=/reports&standAlone=false' //prod
  export const cvatURL = 'http://' + window.location.hostname+ ":8000"

  export const privileges = [
    "SETUP_COMPANY_INFO",
    "CREATE_ROLE",
    "MODIFY_ROLE",
    "DELETE_ROLE",
    "CREATE_ADD_USERS",
    "MODIFY_USERS",
    "DELETE_USERS",
    "JUDE_SERVICE_REQUEST",
    "CREATE_PROJECT", 
    "EDIT_PROJECT", 
    "DELETE_PROJECT", 
    "REASSIGN_PROECT", 
    "REASSIGN_PROECT", 
    "ADD_USERS"
  ]

  export const CROWD_ORG_ID = 1;
  export const path = {
    PUrl: config.baseURL+'/api/internal',
    Url: config.baseURL+'/api/project',
    DelUrl: config.baseURL+'/api/organization'
}
