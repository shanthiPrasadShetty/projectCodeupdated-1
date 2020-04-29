import { services, ACTION_TYPES } from "../utils";
import _ from 'lodash';
import axios from "axios";
import { path } from "../utils/config";
const accesstoken = localStorage.getItem('accessToken')
const idtoken = localStorage.getItem('idToken')

export const getAllProjects = (oid) => {
  if (!oid) {
    oid = localStorage.getItem('orgId')
  }
  const accesstoken = localStorage.getItem('accessToken')
  const idtoken = localStorage.getItem('idToken')
  return async dispatch => {
    dispatch({
      type: ACTION_TYPES.GET_ALL_PROJECTS,
      payload: {}
    });

    axios({
      method: 'get',
      url: `${path.Url}?orgId=${oid}&accessToken=${accesstoken}&idToken=${idtoken}`,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      dispatch({
        type: ACTION_TYPES.GET_ALL_PROJECTS_SUCCESS,
        payload: response.data,
      });
    }).catch(err => {
      dispatch({
        type: ACTION_TYPES.GET_ALL_PROJECTS_FAILED,
        payload: err,
      });
    })

  }
}

export const getBatch = (data) => {
  return async dispatch => {
    dispatch({
      type: ACTION_TYPES.GET_ALL_BATCHES,
      payload: {}
    });

    await axios({
      method: 'get',
      url: `${path.Url}/${data}/batch?projId=${data}&accessToken=${accesstoken}&idToken=${idtoken}`,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      //return response.json
      dispatch({
        type: ACTION_TYPES.GET_ALL_BATCHES_SUCCESS,
        payload: response.data,
      });
    }).catch(err => {
      dispatch({
        type: ACTION_TYPES.GET_ALL_BATCHES_FAILED,
        payload: err,
      });
    })

  }
}

export const getSourceLevel = (data) => {
  return async dispatch => {
    dispatch({
      type: ACTION_TYPES.GET_SOURCE_LEVEL,
      payload: {}
    });

    await axios({
      method: 'get',
      url: `${path.Url}/${data}/role?accessToken=${accesstoken}&idToken=${idtoken}`,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      //return response.json
      dispatch({
        type: ACTION_TYPES.GET_SOURCE_LEVEL_SUCCESS,
        payload: response.data,
      });
    }).catch(err => {
      dispatch({
        type: ACTION_TYPES.GET_SOURCE_LEVEL_FAILED,
        payload: err,
      });
    })

  }
}

export const deleteRequest = (projectId) => {
  return async dispatch => {
    dispatch({
      type: ACTION_TYPES.DELETE_REQUEST,
      payload: {}
    });
    await axios({
      method: 'delete',
      url: `${path.Url}/${projectId}?accessToken=${accesstoken}&idToken=${idtoken}`,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      //return response.json
      dispatch({
        type: ACTION_TYPES.DELETE_REQUEST_SUCCESS,
        payload: response.data,
      });
    }).catch(err => {
      dispatch({
        type: ACTION_TYPES.DELETE_REQUEST_FAILED,
        payload: err,
      });
    })

  }
}


export const deleteUser = (deleteItems) => { 
   let oid = localStorage.getItem('orgId')
  return async dispatch => {
    dispatch({
      type: ACTION_TYPES.DELETE_USER,
      payload: {}
    });

    await axios({
      method: 'delete',
      url: `${path.DelUrl}/${oid}/users?accessToken=${accesstoken}&idToken=${idtoken}`,

      headers: {
        'Content-Type': 'application/json'
      },
      data:{
        	"ids" : deleteItems
      }
    }).then(response => {
      //return response.json
      dispatch({
        type: ACTION_TYPES.DELETE_USER_SUCCESS,
        payload: response.data,
      });
    }).catch(err => {
      dispatch({
        type: ACTION_TYPES.DELETE_USER_FAILED,
        payload: err,
      });
    })

  }
}

export const resetTask = (projectId, batchId, data) => {
  return async dispatch => {
    dispatch({
      type: ACTION_TYPES.RESET_TASK,
      payload: {}
    });

    await axios({
      method: 'put',
      url: `${path.Url}/${projectId}/batch/${batchId}/reset-task?accessToken=${accesstoken}&idToken=${idtoken}`,
      data: data,

      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      //return response.json
      dispatch({
        type: ACTION_TYPES.RESET_TASK_SUCCESS,
        payload: response.data,
      });
    }).catch(err => {
      dispatch({
        type: ACTION_TYPES.RESET_TASK_FAILED,
        payload: err,
      });
    })

  }
}

export const taskState = (taskId, data) => {
  return async dispatch => {
    dispatch({
      type: ACTION_TYPES.TASK_STATE,
      payload: {}
    });
    // GET /api/internal/task-state/:taskId
    await axios({
      method: 'get',
      url: `${path.PUrl}/task-state/${taskId}?accessToken=${accesstoken}&idToken=${idtoken}`,
      data: data,

      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      //return response.json
      dispatch({
        type: ACTION_TYPES.TASK_STATE_SUCCESS,
        payload: response.data,
      });
    }).catch(err => {
      dispatch({
        type: ACTION_TYPES.TASK_STATE_FAILED,
        payload: err,
      });
    })

  }
}

export const getTaskStatus = (projectId, batchId, sourceStatus) => {
  return async dispatch => {
    dispatch({
      type: ACTION_TYPES.GET_TASK_STATUS,
      payload: {}
    });

    await axios({
      method: 'get',
      url: `${path.Url}/${projectId}/GetTasksCountForStatus?batchId=${batchId}&sourceStatus=${sourceStatus}&accessToken=${accesstoken}&idToken=${idtoken}`,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      //return response.json
      dispatch({
        type: ACTION_TYPES.GET_TASK_STATUS_SUCCESS,
        payload: response.data,
      });
    }).catch(err => {
      dispatch({
        type: ACTION_TYPES.GET_TASK_STATUS_FAILED,
        payload: err,
      });
    })

  }
}

export const getTaskLevel = (projectId, batchId, sourceStatus, sourceLevel) => {
  return async dispatch => {
    dispatch({
      type: ACTION_TYPES.GET_TASK_LEVEL,
      payload: {}
    });

    await axios({
      method: 'get',
      url: `${path.Url}/${projectId}/GetTasksCountForStatusAndLevel?batchId=${batchId}&sourceStatus=${sourceStatus}&sourceLevel=${sourceLevel}&accessToken=${accesstoken}&idToken=${idtoken}`,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      //return response.json
      dispatch({
        type: ACTION_TYPES.GET_TASK_LEVEL_SUCCESS,
        payload: response.data,
      });
    }).catch(err => {
      dispatch({
        type: ACTION_TYPES.GET_TASK_LEVEL_FAILED,
        payload: err,
      });
    })

  }
}


export const insertStatusData = (projectId, batchId, sourceStatus, targetStatus) => {
  var headers = new Headers()
  headers.append('Content-Type', 'application/json')
  return async dispatch => {
    dispatch({
      type: ACTION_TYPES.INSERT_STATUS_DATA,
      payload: {}
    });

    await axios({
      method: 'post',
      url: `${path.Url}/${projectId}/BatchStatusChange?accessToken=${accesstoken}&idToken=${idtoken}`,
      data: JSON.stringify({
        "batchId": `${batchId}`,
        "sourceStatus": `${sourceStatus}`,
        "targetStatus": `${targetStatus}`
      }),

      headers: {
        'Content-Type': 'application/json',
      }

     }).then(response => {
      //return response.json
      dispatch({
        type: ACTION_TYPES.INSERT_STATUS_DATA_SUCCESS,
        payload: response.data,
      });
    }).catch(err => {
      dispatch({
        type: ACTION_TYPES.INSERT_STATUS_DATA_FAILED,
        payload: err,
      });
    })

  }
}

export const insertLevelData = (projectId, batchId, sourceLevel, targetLevel, sourceStatus) => {
  var headers = new Headers()
  headers.append('Content-Type', 'application/json')

  return async dispatch => {
    dispatch({
      type: ACTION_TYPES.INSERT_LEVEL_DATA,
      payload: {}
    });

    await axios({
      method: 'post',
      url: `${path.Url}/${projectId}/BatchLevelChange?accessToken=${accesstoken}&idToken=${idtoken}`,
      data: JSON.stringify({
        "batchId": `${batchId}`,
        "sourceLevel": `${sourceLevel}`,
        "targetLevel": `${targetLevel}`,
        "sourceStatus": `${sourceStatus}`
      }
      ),
      headers: {
        'Content-Type': 'application/json',
      }

    }).then(response => {
      //return response.json
      dispatch({
        type: ACTION_TYPES.INSERT_LEVEL_DATA_SUCCESS,
        payload: response.data,
      });
    }).catch(err => {
      dispatch({
        type: ACTION_TYPES.INSERT_LEVEL_DATA_FAILED,
        payload: err,
      });
    })

  }
}
