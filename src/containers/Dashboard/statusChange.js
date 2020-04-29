import React, { Component } from 'react';
import {
    getAllProjects,
    getBatch,
    getTaskStatus,
    insertStatusData

} from "../../actions";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import { ICONS } from '../../utils';
import SelectField from 'material-ui/SelectField';
import { Link, withRouter } from "react-router";
import { connect } from "react-redux";
import { CButton } from '../../components/Buttons/CButton';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Loader } from "../../components/Loader";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { borderRadius } from '@material-ui/system';
import Autocomplete from '@material-ui/lab/Autocomplete';

var querystring = require('querystring');

class StatusChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            projectId: "",
            name: "",
            batchId: "",
            batchName: "",
            sourceStatus: "",
            taskIdStatus: "",
            messageFromServer: "",
            projects: [],
            batches: [],
            totalTask: [],
            results: ['Pending', 'Active', 'Complete', 'Skipped'],
            statusCodes: [1, 2, 3, 5],
            targetStatus: [],
            errors: {},
        };
        this.filtered_projectList = []
        this.handleOnProjectChange = this.handleOnProjectChange.bind(this)
        this.handleOnBatchChange = this.handleOnBatchChange.bind(this)
        
    }

    onChange = value => {

        this.setState({ projectId: value });
        this.getBatch(value);
    };

    onSubmit = e => {
        e.preventDefault()
        const newStatus = {
            projectId: this.state.projectId,
            batchId: this.state.batchId,
            sourceStatus: this.state.sourceStatus,
            targetStatus: this.state.targetStatus,
        };
        const { projectId, batchId, sourceStatus, targetStatus} = this.state
        this.props.insertStatusData(projectId, batchId, this.state.statusCodes[sourceStatus], this.state.statusCodes[targetStatus])
        this.setState({
            projectId:"",
            projectName:"",
            batchId:"",
            sourceStatus:"",
            targetStatus:""})
    };

    componentDidMount() {
        this.props.getAllProjects(this.state.projectId)
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.getAllProjectsStatus === 'success' && nextProps.getAllProjectsStatus != this.props.getAllProjectsStatus) {
            this.setState({ projects: nextProps.getAllProjectsResponse })
        }

        if (nextProps.getTaskStatus === 'success' && nextProps.getAllProjectsStatus != this.props.getTaskStatus) {
            this.setState({ totalTask: nextProps.getTaskResponse })
        }

        if (nextProps.getAllBatchesStatus === 'success' && nextProps.getAllBatchesStatus != this.props.getAllBatchesStatus) {
            this.setState({ batches: nextProps.getAllBatchesResponse })
        }

        if (nextProps.insertStatusData === 'success' && nextProps.insertStatusData != this.props.insertStatusData) {
            this.setState({ batches: nextProps.insertStatusData })
        }
    }

    // getAllProjects() {
    //     axios({
    //         method: 'get',
    //         url: `${configuration.Url}?orgId=3&accessToken=${configuration.AccessToken}`,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     }).then(response => {
    //          //return response.json
    //          console.log("Response from get projects api " , response.data)
    //          this.setState({
    //              projects: response.data
    //          })
    //          return response.json
    //     }).catch(err => {
    //         console.log("Unable to load projects" + err);
    //     })
    // }

    // getBatch = async (data) => {
    //     await axios({
    //         method: 'get',
    //         url: `${configuration.Url}/${data}/batch?projId=${data}&accessToken=${configuration.AccessToken}`,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     }).then(response => {
    //          //return response.json
    //          console.log("Response from get batch api " , response.data)
    //          this.setState({
    //              batches: response.data
    //          })
    //          return response.json
    //     }).catch(err => {
    //         console.log("Unable to load batch", err);
    //     })
    // }

    // getTask = (e) => {
    //     this.setState({taskId: e.target.value})
    //     const { taskId } = this.props;
    //     this.props.taskId(taskId.id)
    //   }


    // getSourceStatus = (e) => {
    //     this.setState({sourceStatus: e.target.value})
    //     console.log(">>>>>>>>",e.target.value)
    //     const { sourceStatus } = this.props;
    //     this.props.sourceStatus(sourceStatus.id)
    // }  

   

    // insertStatusData(e) {
    //     console.log(e.state.projectName, e.state.targetStatus, e.state.projectId, e.state.sourceStatus, e.state.batchId)
    // axios({
    //     method: 'post',
    //     url: `${configuration.Url}/${e.state.projectId}/TaskStatusChange`,
    //     data: querystring.stringify ({

    //         projectId: e.state.projectId,
    //         taskId: e.state.taskId,
    //         targetStatus: e.state.targetStatus

    //     })
    // }).then(response => {
    //         this.setState({messageFromServer: response.data})
    // }).catch(err => {
    //         alert("Unable to change status")
    // })
    //}

    // onClick = (e) => {
    //     console.log("foiugbWOdyb*AEfbAOILsdj")
    //     //this.props.insertStatusData(this.state.projectName, this.state.targetStatus, this.state.projectId, this.state.sourceStatus, this.state.batchId)
    // }

  
 handleOnProjectChange(e,project) {
        this.props.getAllProjects(this.state.projectId)
        this.setState({projectId:project.id})
        this.props.getBatch(project.id);
    }

    handleOnBatchChange(e) {
        let pro = this.state.batches.filter((data) => data.id == e.target.value)
        this.setState({ batchName: pro[0].name, batchId: e.target.value })
        this.setState({ batchId: e.target.value });
    }

    handleOnSourceChange(e) {
        this.setState({
            sourceStatus: e.target.value,
        });
        var pID = this.state.projectId
        var bID = this.state.batchId
        var sSTATUS = this.state.statusCodes[e.target.value]
        this.props.getTaskStatus(pID, bID, sSTATUS)

    }

    handleOnTargetChange(e) {
        this.setState({ targetStatus: e.target.value });
    }








    getTargetStatus = (e) => {
        this.setState({ targetStatus: e.target.value })
        const { targetStatus } = this.props;
        this.props.targetStatus(targetStatus.id)

    }
    render() {
        const { errors } = this.state
        const { projects } = this.state
        const { batches } = this.state
        const { results } = this.state
        const { totalTask } = this.state
        const classes = this.props;
        const inputLabel = (null);

        let projectList = projects.map((item, i) => {
            return (<MenuItem value={item.id}>{item.name} ({item.id}) {item.processName}</MenuItem>
            )
        })
        let batchList = batches.map((item, i) => {
            return (<MenuItem value={item.id}>{item.name}</MenuItem>

            )
        })
        //this.filtered_projectList = projects.filter(x => x.name.toLowerCase().indexOf(this.state.projectId.toLowerCase()) > -1)
        let resultList = results.map((item, i) => {
            return (<MenuItem value={i}>{item}</MenuItem>
            )
        })
        return (
            <div className="container-fluid" style={{ textAlign: "center", marginTop: 50, marginBottom: 50, paddingLeft: "150px", paddingRight: "150px" }}>
                <Grid item xs={9} >
                    <div className="col-md-12" style={{ textAlign: "center", marginTop: 5, paddingLeft: "11.250px" }}>
                        <h1>
                            <b>Status Change</b> below
							</h1>
                    </div>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="col-md-12" style={{ textAlign: "left", marginBottom: 30 }}>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                                    <InputLabel ref={inputLabel} htmlFor="outlined-projectName-simple">

                                    </InputLabel>
                                    <Autocomplete
                                        id="free-solo-demo"
                                        onChange={(event, value)=>this.handleOnProjectChange(event, value)}
                                        options={projects}
                                        getOptionLabel={option => option.name}
                                        renderOption={option => (
                                        <React.Fragment>
                                                {option.id + " " + option.name + " " + option.processName}
                                        </React.Fragment>)
                                        }
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                label="ProjectName"
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />  
                                </FormControl>
                            </Grid>
                        </div>
                        <div className="col-md-12" style={{ textAlign: "left", marginBottom: 25 }}>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                                    <InputLabel ref={inputLabel} htmlFor="outlined-batchName-simple">
                                        Batch Name
                                            </InputLabel>
                                    <Select
                                        value={this.state.batchId}
                                        onChange={(e) => this.handleOnBatchChange(e)}
                                        error={errors.batchId}
                                        labelWidth="60"
                                        inputProps={{
                                            name: 'batchName',
                                            id: 'outlined-batchName-simple',
                                        }}
                                    >
                                        {batchList}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </div>
                        <div className="col-md-12" style={{ textAlign: "left", marginBottom: 25 }}>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                                    <InputLabel ref={inputLabel} htmlFor="outlined-sourceStatus-simple">
                                        Source Status
                                            </InputLabel>
                                    <Select
                                        value={this.state.sourceStatus}
                                        onChange={(e) => this.handleOnSourceChange(e)}
                                       // onClick={this.getTaskStatus}
                                        error={errors.sourceStatus}
                                        labelWidth="100"
                                        inputProps={{
                                            name: 'sourcestatus',
                                            id: 'outlined-sourcestatus-simple',
                                        }}
                                    >
                                        {this.state.results.map((item, i) => {
                                            return (
                                                this.state.batchId ? <MenuItem value={i}>{item} </MenuItem> : console.log("Batch is not selected")
                                            )
                                            
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </div>
                        <div className="col-md-12" style={{ textAlign: "left", marginBottom: 25 }}>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                                    <InputLabel ref={inputLabel} htmlFor="outlined-targetStatus-simple">
                                        Target Status
                                            </InputLabel>
                                    <Select
                                        value={this.state.targetStatus}
                                        onChange={(e) => this.handleOnTargetChange(e)}
                                        error={errors.tavaluergetStatus}
                                        labelWidth="100"
                                        inputProps={{
                                            name: 'targetStatus',
                                            id: 'outlined-targetStatus-simple',
                                        }}
                                    >
                                        {this.state.results.map((item, i) => {                                            
                                       return (this.state.sourceStatus ?  <MenuItem value={i}>{item} </MenuItem> : console.log("Batch is not selected")
                                                 )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </div>
                         <div className={classes.root}>
                            <Paper className={classes.paper}>
                                <Grid container wrap="nowrap">
                                    <Grid item />
                                    <Grid item xs zeroMinWidth>
                                        <Typography noWrap style={{ flexDirection: 'row', justifyContent: 'start', backgroundColor: 'skyblue' }}>
                                            <div style={{ padding: '2px', display: 'grid' }}>
                                                <span style={{ textAlign: 'start', width: '100%', marginLeft: '50px' }}>ProjectName:
                                                    <span style={{ paddingLeft: '30px' }}>{this.state.projectName}{this.state.projectId}{this.state.processName}</span>
                                                </span>
                                            </div>
                                            <div style={{ padding: '2px', display: 'grid' }}>
                                                <span style={{ textAlign: 'start', width: '100%', marginLeft: '50px' }}>BatchName:
                                                    <span style={{ paddingLeft: '30px' }}>{this.state.batchId}</span>
                                                </span>
                                            </div>
                                            <div style={{ padding: '2px', display: 'grid' }}>
                                                <span style={{ textAlign: 'start', width: '100%', marginLeft: '50px' }}>SourceStatus:
                                                    <span style={{ paddingLeft: '30px' }}> {this.state.sourceStatus}</span>
                                                </span>
                                            </div>
                                            <div style={{ padding: '2px', display: 'grid' }}>
                                                <span style={{ textAlign: 'start', width: '100%', marginLeft: '50px' }}>TargetStatus:
                                                    <span style={{ paddingLeft: '30px' }}> {this.state.targetStatus}</span>
                                                </span>
                                            </div>
                                            <div style={{ padding: '2px', display: 'grid' }}>
                                                <span style={{ textAlign: 'start', width: '100%', marginLeft: '50px' }}>Total Task:
                                                    <span style={{ paddingLeft: '30px' }}>{this.props.getTaskStatusResponse}</span>
                                                </span>
                                                <div style={{ padding: '2px', display: 'grid' }}>
                                                    <span style={{ textAlign: 'start', width: '100%', marginLeft: '50px' }}>Messege:
                                                        <span style={{ paddingLeft: '30px' }}> 
                                                        {
                                                             Object.values(this.props.insertStatusDataResponse)
                                                        }
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>    
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </div> 
                        <br></br>
                        <div className="col-md-12" style={{ textAlign: "center", paddingLeft: "11.250" }}>
                            <CButton
                                variant="contained"
                                color="primary"
                                standOut={'type1'}
                                label={<span style={{ letterSpacing: '1.25px', color: '#fff' }}>Change Status</span>}
                                // onClick={(e)=>this.onClick(e)}
                                type={"submit"}
                            />
                        </div>

                    </form>
                </Grid>
                 {this.props.getAllProjectsStatus === 'started' && <Loader />}
                 {this.props.getAllBatchesStatus === 'started' && <Loader />}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        getAllProjectsStatus: state.projectReducer.getAllProjectsStatus,
        getAllProjectsResponse: state.projectReducer.getAllProjectsResponse,
        getAllProjectsError: state.projectReducer.getAllProjectsError,
        getAllBatchesStatus: state.projectReducer.getAllBatchesStatus,
        getAllBatchesResponse: state.projectReducer.getAllBatchesResponse,
        getAllBatchesError: state.projectReducer.getAllBatchesError,
        getTaskStatusStatus: state.projectReducer.getTaskStatusStatus,
        getTaskStatusResponse: state.projectReducer.getTaskStatusResponse,
        getTaskStatusError: state.projectReducer.getTaskStatusError,
        insertStatusData: state.projectReducer.insertStatusData,
        insertStatusDataResponse: state.projectReducer.insertStatusDataResponse,
        insertStatusDataError: state.projectReducer.insertStatusDataError
    };
}

export default withRouter(connect(mapStateToProps, {
    getAllProjects,
    getBatch,
    insertStatusData,
    getTaskStatus
})(StatusChange));