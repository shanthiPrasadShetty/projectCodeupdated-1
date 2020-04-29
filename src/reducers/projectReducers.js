import ip from 'icepick';
import { ACTION_TYPES } from '../utils';
 

const initialState = ip.freeze({
  getAllProjectsStatus: null,
  getAllProjectsResponse: [],
  getAllProjectsError: null, 

  getAllBatchesStatus: null,
  getAllBatchesResponse: [], 
  getAllBatchesError: null, 

  getSourceLevelStatus: null,
  getSourceLevelResponse: [],
  getSourceLevelError: null,
   
  getTaskStatus: null,
  getTaskStatusResponse: [],
  getTaskStatusError: null,

  getTaskLevel: null,
  getTaskLevelResponse: [],
  getTaskLevelError: null,

  getresetTask: null,
  getresetTaskResponse: [],
  getresetTaskError: null,

  deleteRequestStatus: null,
  deleteRequestResponse: [],
  deleteRequestError: null,

  deleteUserStatus: null,
  deleteUserResponse: [],
  deleteUserError: null,

  gettaskState: null,
  gettaskStateResponse: [],
  gettaskStateError: null,

  insertStatusData: null,
  insertStatusDataResponse: [],
  insertStatusDataError: null,
   
  insertLevelData: null,
  insertLevelDataResponse: [],
  insertLevelDataError: null, 

  
});

export default function projectReducer(state = initialState, action) {
    switch (action.type) {

      //Projects
      case ACTION_TYPES.GET_ALL_PROJECTS: {
        state = ip.setIn(state, ['getAllProjectsStatus'], 'started');
        return state;
      }
  
      case ACTION_TYPES.GET_ALL_PROJECTS_SUCCESS: {
        var projects = action.payload
        state = ip.setIn(state, ['getAllProjectsStatus'], 'success');
        state = ip.setIn(state, ['getAllProjectsResponse'], projects);
        state = ip.setIn(state, ['getAllProjectsError'], null);
        return state;
      }
  
      case ACTION_TYPES.GET_ALL_PROJECTS_FAILED: {
        state = ip.setIn(state, ['getAllProjectsStatus'], 'failed');
        state = ip.setIn(state, ['getAllProjectsResponse'], []);
        state = ip.setIn(state, ['getAllProjectsError'], action.payload);
        return state;
      }

       //Batches
       case ACTION_TYPES.GET_ALL_BATCHES: {
        state = ip.setIn(state, ['getAllBatchesStatus'], 'started');
        return state;
      }
  
      case ACTION_TYPES.GET_ALL_BATCHES_SUCCESS: {
        var projects = action.payload
        state = ip.setIn(state, ['getAllBatchesStatus'], 'success');
        state = ip.setIn(state, ['getAllBatchesResponse'], projects);
        state = ip.setIn(state, ['getAllBatchesError'], null);
        return state;
      }
  
      case ACTION_TYPES.GET_ALL_BATCHES_FAILED: {
        state = ip.setIn(state, ['getAllBatchesStatus'], 'failed');
        state = ip.setIn(state, ['getAllBatchesResponse'], []);
        state = ip.setIn(state, ['getAllBatchesError'], action.payload);
        return state;
      }

      //SourceLevel
      case ACTION_TYPES.GET_SOURCE_LEVEL: {
        state = ip.setIn(state, ['getSourceLevelStatus'], 'started');
        return state;
      }
  
      case ACTION_TYPES.GET_SOURCE_LEVEL_SUCCESS: {
        var projects = action.payload
        state = ip.setIn(state, ['getSourceLevelStatus'], 'success');
        state = ip.setIn(state, ['getSourceLevelResponse'], projects);
        state = ip.setIn(state, ['getSourceLevelError'], null);
        return state;
      }
  
      case ACTION_TYPES.GET_SOURCE_LEVEL_FAILED: {
        state = ip.setIn(state, ['getSourceLevelStatus'], 'failed');
        state = ip.setIn(state, ['getSourceLevelResponse'], []);
        state = ip.setIn(state, ['getSourceLevelError'], action.payload);
        return state;
      }

      //RESET TASK
      case ACTION_TYPES.RESET_TASK: {
        state = ip.setIn(state, ['ResetTaskStatus'], 'started');
        return state;
      }
  
      case ACTION_TYPES.RESET_TASK_SUCCESS: {
        var projects = action.payload
        state = ip.setIn(state, ['ResetTaskStatus'], 'success');
        state = ip.setIn(state, ['ResetTaskResponse'], projects);
        state = ip.setIn(state, ['ResetTaskError'], null);
        return state;
      }
  
      case ACTION_TYPES.RESET_TASK_FAILED: {
        state = ip.setIn(state, ['ResetTaskStatus'], 'failed');
        state = ip.setIn(state, ['ResetTaskResponse'], []);
        state = ip.setIn(state, ['ResetTaskError'], action.payload);
        return state;
      }
      //task state
      case ACTION_TYPES.TASK_STATE: {
        state = ip.setIn(state, ['TaskStateStatus'], 'started');
        return state;
      }
  
      case ACTION_TYPES.TASK_STATE_SUCCESS: {
        var projects = action.payload
        state = ip.setIn(state, ['TaskStateStatus'], 'success');
        state = ip.setIn(state, ['TaskStateResponse'], projects);
        state = ip.setIn(state, ['TaskStateError'], null);
        return state;
      }
  
      case ACTION_TYPES.TASK_STATE_FAILED: {
        state = ip.setIn(state, ['TaskStateStatus'], 'failed');
        state = ip.setIn(state, ['TaskStateResponse'], []);
        state = ip.setIn(state, ['TaskStateError'], action.payload);
        return state;
      }

       //DELETE REQUEST
       case ACTION_TYPES.DELETE_REQUEST: {
        state = ip.setIn(state, ['DeleteRequestStatus'], 'started');
        return state;
      }
  
      case ACTION_TYPES.DELETE_REQUEST_SUCCESS: {
        var projects = action.payload
        state = ip.setIn(state, ['DeleteRequestStatus'], 'success');
        state = ip.setIn(state, ['DeleteRequestResponse'], projects);
        state = ip.setIn(state, ['DeleteRequestError'], null);
        return state;
      }
  
      case ACTION_TYPES.DELETE_REQUEST_FAILED: {
        state = ip.setIn(state, ['DeleteRequestStatus'], 'failed');
        state = ip.setIn(state, ['DeleteRequestResponse'], []);
        state = ip.setIn(state, ['DeleteRequestError'], action.payload);
        return state;
      }

      //DELETE USER
      case ACTION_TYPES.DELETE_USER: {
        state = ip.setIn(state, ['DeleteUserStatus'], 'started');
        return state;
      }
  
      case ACTION_TYPES.DELETE_USER_SUCCESS: {
        var projects = action.payload
        state = ip.setIn(state, ['DeleteUserStatus'], 'success');
        state = ip.setIn(state, ['DeleteUserResponse'], projects);
        state = ip.setIn(state, ['DeleteUserError'], null);
        return state;
      }
  
      case ACTION_TYPES.DELETE_USER_FAILED: {
        state = ip.setIn(state, ['DeleteUserStatus'], 'failed');
        state = ip.setIn(state, ['DeleteUserResponse'], []);
        state = ip.setIn(state, ['DeleteUserError'], action.payload);
        return state;
      }
      
      //Task status
      case ACTION_TYPES.GET_TASK_STATUS: {
        state = ip.setIn(state, ['getTaskStatusStatus'], 'started');
        return state;
      }
      
      case ACTION_TYPES.GET_TASK_STATUS_SUCCESS: {
        var projects = action.payload
        state = ip.setIn(state, ['getTaskStatusStatus'], 'success');
        state = ip.setIn(state, ['getTaskStatusResponse'], projects);
        state = ip.setIn(state, ['getTaskStatusError'], null);
        return state;
      }
  
      case ACTION_TYPES.GET_TASK_STATUS_FAILED: {
        state = ip.setIn(state, ['getTaskStatus'], 'failed');
        state = ip.setIn(state, ['getTaskStatusResponse'], []);
        state = ip.setIn(state, ['getTaskStatusError'], action.payload);
        return state;
      }
      //Task level
      case ACTION_TYPES.GET_TASK_LEVEL: {
        state = ip.setIn(state, ['getTaskLevelStatusStatus'], 'started');
        return state;
      }
  
      case ACTION_TYPES.GET_TASK_LEVEL_SUCCESS: {
        var projects = action.payload
        state = ip.setIn(state, ['getTaskLevel'], 'success');
        state = ip.setIn(state, ['getTaskLevelResponse'], projects);
        state = ip.setIn(state, ['getTaskLevelError'], null);
        return state;
      }
  
      case ACTION_TYPES.GET_TASK_LEVEL_FAILED: {
        state = ip.setIn(state, ['getTaskLevel'], 'failed');
        state = ip.setIn(state, ['getTaskLevelResponse'], []);
        state = ip.setIn(state, ['getTaskLevelError'], action.payload);
        return state;
      }

      //insertStatusData
      case ACTION_TYPES.INSERT_STATUS_DATA: {
        state = ip.setIn(state, ['insertStatusData'], 'started');
        return state;
      }
  
      case ACTION_TYPES.INSERT_STATUS_DATA_SUCCESS: {
        var projects = action.payload
        state = ip.setIn(state, ['insertStatusData'], 'success');
        state = ip.setIn(state, ['insertStatusDataResponse'], projects);
        state = ip.setIn(state, ['insertStatusDataError'], null);
        return state;
      }
  
      case ACTION_TYPES.INSERT_STATUS_DATA_FAILED: {
        state = ip.setIn(state, ['insertStatusData'], 'failed');
        state = ip.setIn(state, ['insertStatusDataResponse'], []);
        state = ip.setIn(state, ['insertStatusDataError'], action.payload);
        return state;
      }

      //insertLevelData
      case ACTION_TYPES.INSERT_STATUS_DATA: {
        state = ip.setIn(state, ['insertLevelData'], 'started');
        return state;
      }
  
      case ACTION_TYPES.INSERT_STATUS_DATA_SUCCESS: {
        var projects = action.payload
        state = ip.setIn(state, ['insertLevelData'], 'success');
        state = ip.setIn(state, ['insertLevelDataResponse'], projects);
        state = ip.setIn(state, ['insertLevelDataError'], null);
        return state;
      }
  
      case ACTION_TYPES.INSERT_STATUS_DATA_FAILED: {
        state = ip.setIn(state, ['insertLevelData'], 'failed');
        state = ip.setIn(state, ['insertLevelDataResponse'], []);
        state = ip.setIn(state, ['insertLevelDataError'], action.payload);
        return state;
      }


     default: {
     return state;
     }
   }
}

