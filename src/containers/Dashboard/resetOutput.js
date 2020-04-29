import React, { Component } from 'react';
import { Loader } from "../../components/Loader";
import {
    resetTask
} from "../../actions";
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { CButton } from '../../components/Buttons/CButton';
import { Link, withRouter } from "react-router";
import { connect } from "react-redux";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Alert  from '../../../src/components/Modal/Alert';
import Confirm from '../../../src/components/Modal/confirm'
var querystring = require('querystring');
class ResetLevel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taskId: "",
            taskIds: '',
            projectId: '',
            onAlertOpenModal: false,
            alertMessage:'',
            batchId: '',
            tasklevel: '',
            errors: {},
            level: ''
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.resetTaskStatus === 'success' && nextProps.resetTaskStatus != this.props.resetTaskStatus) {
            this.setState({ totalTaskId: nextProps.resetTaskResponse })
        }
    }

    onTaskIdEdit = (e) => {
        if(e.target.value.match(/^[0-9.,]+$|^$/)){
            this.setState({ taskIds: e.target.value,taskId:'' })
        }
    }

    onLevelChange = (e) => {
        if(e.target.value.match(/^[0-9.,]+$|^$/)){
            this.setState({ level: e.target.value })
            }
    }
    onTaskprojectIdEdit = (e) => {
            if(e.target.value.match(/^[0-9.]+$|^$/)){
            this.setState({ projectId: e.target.value })
        }
    }

    onTaskBatchIdEdit = (e) => {
        if(e.target.value.match(/^[0-9.]+$|^$/)){
            this.setState({ batchId: e.target.value })
        }
    }

    resetTask = (e) => {
        this.setState({ onDeleteOpenModal: true, alertMessage: "Are you sure want to reset"})
    }

    onDelete = () =>{
        var pID = this.state.projectId
         var bID = this.state.batchId
         var tID = this.state.taskIds.split(',')
         var data = {
           "id": tID,
             "resetToLevel": parseInt(this.state.level),
         }
         this.props.resetTask(pID, bID, data);
            this.setState({ onDeleteOpenModal: false})
            this.setState({projectId:'',batchId:''})
    }

    onDeleteModalClose = () => {
        this.setState({ onDeleteOpenModal: false })
      }

    render() {
        const { errors } = this.state
        const classes = this.props;
        const inputLabel = (null);
        const { taskId } = this.props;

        const actions = [<CButton
            label={"Ok"}
            onClick={this.onDelete} />,
          <CButton 
            type={'dull'}
            label={"cancel"}
            onClick={this.onDeleteModalClose}
          />]

        return (<div>
            <div className="container-fluid" style={{ textAlign: "center", marginTop: 40, marginBottom: 40, paddingLeft: "150px", paddingRight: "150px" }}>
                <Grid item xs={9}>
                    <div className="col-md-12" style={{ textAlign: "center", marginTop: 5, paddingLeft: "11.250px" }}>
                        <h1>
                            <b>Reset Task</b>
                        </h1>
                    </div>
                </Grid>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
                <div className="col-md-12" style={{ textAlign: "left", marginBottom: 30, width: '400px', marginLeft: '300px' }}>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                            <TextField
                                value={this.state.projectId}
                                placeholder='ProjectId'
                                onChange={this.onTaskprojectIdEdit}
                                variant="outlined"
                            >
                            </TextField>
                        </FormControl>
                    </Grid>
                </div>
            </form>
            <form noValidate onSubmit={this.onSubmit}>
                <div className="col-md-12" style={{ textAlign: "left", marginBottom: 30, width: '400px', marginLeft: '300px' }}>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                            <TextField
                                value={this.state.batchId}
                                placeholder='BatchId'
                                onChange={this.onTaskBatchIdEdit}
                                variant="outlined"
                            >
                            </TextField>
                        </FormControl>
                    </Grid>
                </div>
            </form>
            <form noValidate onSubmit={this.onSubmit}>
                <div className="col-md-12" style={{ textAlign: "left", marginBottom: 30, width: '400px', marginLeft: '300px' }}>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                            <TextField
                                value={this.state.level}
                                placeholder='Reset to Level'
                                onChange={this.onLevelChange}
                                variant="outlined"
                            >
                            </TextField>
                        </FormControl>
                    </Grid>
                </div>
            </form>
            <form noValidate onSubmit={this.onSubmit}>
                <div className="col-md-12" style={{ textAlign: "left", marginBottom: 30, width: '400px', marginLeft: '300px' }}>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                            <InputLabel ref={inputLabel} htmlFor="outlined-projectName-simple" />
                            <TextField
                                value={this.state.taskIds}
                                placeholder='TaskIds (Comma separated)'
                                onChange={this.onTaskIdEdit}
                                variant="outlined"
                            >
                            </TextField>
                        </FormControl>
                    </Grid>
                </div>
            </form>
            <div className="col-md-12" style={{ textAlign: "center", paddingLeft: "11.250", paddingRight: '250px' }}>
                <CButton
                    variant="contained"
                    color="primary"
                    standOut={'type1'}
                    label={<span style={{ letterSpacing: '1.25px', color: '#fff' }}>Submit</span>}
                    onClick={this.resetTask}
                    type={"submit"}
                />
            </div>

            <Confirm
                    msg="Are you sure want to reset"
                    openModal={this.state.onDeleteOpenModal} 
                    modalOnClosed={this.onDeleteModalClose}
                    onOk={this.onDelete}
                    onCancel={this.onDeleteModalClose}
                  />

            
            {this.props.getAllProjectsStatus === 'started' && <Loader />}  
            {this.props.getresetTaskStatus === 'started' && <Loader />}  
        </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        getresetTaskStatus: state.projectReducer.getresetTaskStatus,
        getresetTaskResponse: state.projectReducer.getresetTaskResponse,
        getresetTaskError: state.projectReducer.getresetTaskError,
    };
}

export default withRouter(connect(mapStateToProps, {
    resetTask
})(ResetLevel));