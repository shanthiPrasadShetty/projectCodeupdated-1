import React, { Component } from 'react';
import {getAllProjects, 
    getBatch,
    getSourceLevel,
    getTaskLevel,
    insertLevelData
  } from "../../actions";
import { Link, withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import { CButton } from '../../components/Buttons/CButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Loader } from "../../components/Loader";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';

var querystring = require('querystring'); 

class StatusChange extends Component {
    constructor(props){
        super(props);
        this.state = {
            projectName: "",
            projectId: "",
            batchId:"",
            batchName: "",
            sourceLevel: "",
            targetLevel: "",
            sourceStatus: "",
            messageFromServer: "",
            projects: [],
            batches: [],
            levels: [],
            totalLevel:[],
            errors: {},
            age:''
        };

        // this.onClick = this.onClick.bind(this);
        // this.insertStatusData = this.insertStatusData.bind(this);
        this.handleOnProjectChange=this.handleOnProjectChange.bind(this)
        this.handleOnBatchChange=this.handleOnBatchChange.bind(this)
    }
    
    onChange = value => {
        
        this.setState({projectId: value});
        this.getBatch(value);
        this.getSourceLevel(value);
    };

    onSubmit = e => {
        e.preventDefault()
        const newStatus = {
            projectId: this.state.projectId,
            batchId: this.state.batchId,
            sourceLevel: this.state.sourceLevel,
            targetLevel: this.state.targetLevel,
            sourceStatus: this.state.sourceStatus,
        };
        
        const {projectId,batchId,sourceLevel,targetLevel,sourceStatus}=this.state
        this.props.insertLevelData(projectId,batchId,sourceLevel,targetLevel,sourceStatus)
        this.setState({
            projectId:"",
            batchId:"",
            batchName:"",
            sourceLevel:"",
            targetLevel:"",
            sourceStatus:""
        })
    };

    componentDidMount() {
            this.props.getAllProjects()
    }

    componentWillReceiveProps(nextProps) {
        
        if(nextProps.getAllProjectsStatus === 'success' && nextProps.getAllProjectsStatus != this.props.getAllProjectsStatus){
            this.setState({projects: nextProps.getAllProjectsResponse })
        }

         
        if(nextProps.getTaskLevelStatus === 'success' && nextProps.getTaskLevelStatus != this.props.getTaskLevelStatus){
            this.setState({totalLevel: nextProps.getTaskLevelResponse })
        }

        if(nextProps.getAllBatchesStatus === 'success' && nextProps.getAllBatchesStatus != this.props.getAllBatchesStatus){
            this.setState({batches: nextProps.getAllBatchesResponse })
        }

        if(nextProps.getSourceLevelStatus === 'success' && nextProps.getSourceLevelStatus != this.props.getSourceLevelStatus){
            this.setState({levels: nextProps.getSourceLevelResponse })
        }

        if(nextProps.insertLevelData === 'success' && nextProps.insertLevelData != this.props.insertLevelData){
            this.setState({batches: nextProps.insertLevelDataResponse })
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
    
        // getSourceLevel = async (data) => {
        //     await axios({
        //         method: 'get',
        //         url: `${configuration.Url}/${data}/role?accessToken=${configuration.AccessToken}`,
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //     }).then(response => {
        //          //return response.json
        //          console.log("Response from get level api " , response.data)
        //          this.setState({
        //              levels: response.data
        //          })
        //          return response.json
        //     }).catch(err => {
        //         console.log("Unable to load level", err);
        //     })
        // }
    
        // getTargetLevel = async (data) => {
        //     await axios({
        //         method: 'get',
        //         url: `${configuration.Url}/${data}/role?accessToken=${configuration.AccessToken}`,
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //     }).then(response => {
        //          //return response.json
        //          console.log("Response from get level api " , response.data)
        //          this.setState({
        //              levels: response.data
        //          })
        //          return response.json
        //     }).catch(err => {
        //         console.log("Unable to load level", err);
        //     })
       // }
    
    
        // getTask = (e) => {
        //     this.setState({taskId: e.target.value})
        //     const { taskId } = this.props;
        //     this.props.taskId(taskId.id)
        //   }
    
        // getSourceLevel = (e) => {
        //     this.setState({sourceLevel: e.target.value})
        //     const { sourceLevel } = this.props;
        //     this.props.sourceLevel(sourceLevel.id)
        // }  
         
    
    getSourceStatus = (e) => {
        this.setState({sourceStatus: e.target.value})
        const { sourceStatus } = this.props;
        this.props.sourceStatus(sourceStatus.id)
    }  

    getSourceLevel = (e) => {
        this.setState({sourceLevel: e.target.value})
        const { sourceLevel } = this.props;
        this.props.sourceLevel(sourceLevel.id)
    }  

    // insertStatusData(e) {
    //     console.log(e.state.projectName, e.state.targetLevel, e.state.projectId, e.state.sourceLevel, e.state.batchId)
        // axios({
        //     method: 'post',
       //     url: `${configuration.Url}/${e.state.projectId}/TaskStatusChange`,
        //     data: querystring.stringify ({

        //         projectId: e.state.projectId,
        //         taskId: e.state.taskId,
        //         targetLevel: e.state.targetLevel

        //     })
        // }).then(response => {
        //         this.setState({messageFromServer: response.data})
        // }).catch(err => {
        //         alert("Unable to change status")
        // })
    // }
    // onClick(e) {
    //     this.insertStatusData(this)
    // }

    handleOnProjectChange(e,project){
        this.setState({projectId:project.id})
        this.props.getBatch(project.id);
        this.props.getSourceLevel(project.id);
    }
    
    handleOnBatchChange(e){
        let pro = this.state.batches.filter((data) => data.id == e.target.value)
        this.setState({batchName: pro[0].name, batchId: e.target.value})
        this.setState({batchId: e.target.value});
    }

    handleOnSourceLevelChange(e){
        this.setState({sourceLevel: e.target.value});
        var pID=this.state.projectId
        var bID = this.state.batchId
        var sStatus=this.state.sourceStatus
        var sLevel=e.target.value
        this.props.getTaskLevel(pID,bID,sStatus,sLevel)
        
    }

    handleOnTargetChange(e){
        this.setState({targetLevel: e.target.value});
    }

    handleOnSourceStatusChange(e){
        this.setState({sourceStatus: e.target.value});
    }

    render() {
        const { errors } = this.state
        const  { projects }  = this.state
        const  {batches} = this.state
        const {levels} = this.state
        const {totalLevel} = this.state
        const classes = this.props;
        const inputLabel = (null);
        const {values} = this.state;
        const {setValues} = this.state;
        
        // this.filtered_projectList = projects.filter(x => x.name.toLowerCase().indexOf(this.state.projectId.toLowerCase()) > -1)
        let projectList = projects.map((item, i) => {
            return(<MenuItem value={item.id}>{item.name} ({item.id}) {item.processName}</MenuItem>
            )
        })
        let batchList = batches.map((item, i) => {
            return (<MenuItem value={item.id}>{item.name}</MenuItem>
            )
        })
        let TargetLevel=this.state.targetLevel == 2 ? [{orgId: "3", noOfTasks: 1, level: 1, name: "QA"}] : [{orgId: "3", noOfTasks: 1, level: 2, name: "QC"}];
        let levelList = levels.map((item, i) => {
            return (<MenuItem value= {item.level}>{item.name}</MenuItem>
            )

        })
        let TargetLevelList=TargetLevel.map((item, i) => {
            return (<MenuItem value= {item.level}>{item.name}</MenuItem>
            )

        })
    
        return (
			<div className="container-fluid" style={{ textAlign: "center", marginTop: 50, marginBottom: 50, paddingLeft:"150px", paddingRight:"150px"}}>
                <Grid item xs={9}>
						<div className="col-md-12" style={{ textAlign: "center", marginTop: 5, paddingLeft:"11.250px"}}>
							<h1>
								<b>Level Change</b> below
							</h1>
						</div>
						<form noValidate onSubmit={this.onSubmit}>
							<div className="col-md-12" style={{ textAlign: "left", marginBottom: 30}}>
                                <Grid item xs={12}>
                                    <FormControl variant="outlined" fullWidth={true}  className={classes.formControl}>
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

                            <div className="col-md-12" style={{ textAlign: "left", marginBottom: 25}}>  
                                    <Grid item xs={12}>
                                        <FormControl variant="outlined" fullWidth={true} className={classes.formControl }>
                                          <InputLabel ref={inputLabel}  htmlFor="outlined-batchId-simple">
                                            Batch ID
                                            </InputLabel>
                                            <Select
                                                value={this.state.batchId}
                                                onChange={(e)=>this.handleOnBatchChange(e)}
                                                error={errors.batchId}
                                                labelWidth="60"
                                                inputProps={{
                                                    name: 'batchId',
                                                    id: 'outlined-batchId-simple',
                                                }}
                                                >
                                                {batchList}
                                        </Select>
                                        </FormControl>
                                    </Grid> 
                            </div>  
                            <div className="col-md-12" style={{ textAlign: "left", marginBottom: 25}}>
                                <Grid item xs={12}>
                                        <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                                            <InputLabel ref={inputLabel} htmlFor="outlined-sourceStatus-simple">
                                            Source Status
                                            </InputLabel>
                                            <Select
                                            value={this.state.sourceStatus}
                                            onChange={(e)=>this.handleOnSourceStatusChange(e)}
                                            error={errors.sourceStatus}
                                            labelWidth="100"
                                            inputProps={{
                                                name: 'sourcestatus',
                                                id: 'outlined-sourcestatus-simple',
                                            }}
                                            >
                                            <MenuItem value={0}>Created</MenuItem>
                                            <MenuItem value={1}>Ready</MenuItem>
                                            <MenuItem value={2}>Active</MenuItem>
                                            <MenuItem value={3}>Complete</MenuItem>
                                            <MenuItem value={4}>On hold </MenuItem>
                                            <MenuItem value={5}>Skipped</MenuItem>
                                            <MenuItem value={6}>Invalid</MenuItem>
                                            </Select>
                                        </FormControl>
                                </Grid>  
                            </div>
                            <div className="col-md-12" style={{ textAlign: "left", marginBottom: 25}}>
                                <Grid item xs={12}>
                                        <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                                            <InputLabel ref={inputLabel} htmlFor="outlined-sourceLevel-simple">
                                            Source Level
                                            </InputLabel>
                                            <Select
                                            value={this.state.sourceLevel}
                                            onChange={(e)=>this.handleOnSourceLevelChange(e)}
                                            error={errors.sourceLevel}
                                            labelWidth="100"
                                            inputProps={{
                                                name: 'sourcelevel',
                                                id: 'outlined-sourcelevel-simple',
                                            }}
                                            >
                                                {levelList}
                                            </Select>
                                        </FormControl>
                                </Grid>  
                            </div>

                            <div className="col-md-12" style={{ textAlign: "left", marginBottom: 25}}>
                                <Grid item xs={12}>
                                    <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                                            <InputLabel ref={inputLabel} htmlFor="outlined-targetLevel-simple">
                                            Target Level
                                            </InputLabel>
                                            <Select
                                            value={this.state.targetLevel}
                                            onChange={(e)=>this.handleOnTargetChange(e)}
                                            error={errors.targetLevel}
                                            labelWidth="100"
                                            inputProps={{
                                                name: 'targetLevel',
                                                id: 'outlined-targetLevel-simple',
                                            }}
                                            >
                                                {levelList}
                                            </Select>
                                    </FormControl>
                                </Grid> 
                            </div>
                             <div className={classes.root}>
                                <Paper className={classes.paper}>
                                    <Grid container wrap="nowrap">
                                    <Grid item>
                                    </Grid>
                                    <Grid item xs zeroMinWidth>
                                        <Typography noWrap style={{flexDirection:'row',justifyContent:'start',backgroundColor:'skyblue'}}>
                                            <div style={{padding:'2px',display:'grid'}}>
                                                <span style={{textAlign:'start',width:'100%',marginLeft:'50px'}}>ProjectName:
                                                    <span style={{paddingLeft:'30px'}}>{this.state.projectName}{this.state.projectId}</span>
                                                </span>
                                            </div>
                                            <div style={{padding:'2px',display:'grid'}}>
                                                <span style={{textAlign:'start',width:'100%',marginLeft:'50px'}}>BatchName:
                                                    <span style={{paddingLeft:'30px'}}>{this.state.batchName}{this.state.batchId}</span>
                                                </span>
                                            </div>
                                            <div style={{padding:'2px',display:'grid'}}>
                                                <span style={{textAlign:'start',width:'100%',marginLeft:'50px'}}>Source Level:
                                                    <span style={{paddingLeft:'30px'}}> {this.state.sourceLevel}</span>
                                                </span>
                                            </div>
                                            <div style={{padding:'2px',display:'grid'}}>   
                                                <span style={{textAlign:'start',width:'100%',marginLeft:'50px'}}>Target Level:
                                                    <span style={{paddingLeft:'30px'}}>{this.state.targetLevel}</span>
                                                </span>
                                            </div>
                                            <div style={{padding:'2px',display:'grid'}}>   
                                                <span style={{textAlign:'start',width:'100%',marginLeft:'50px'}}>Total Task:
                                                    <span style={{paddingLeft:'30px'}}>{this.props.getTaskLevelResponse}</span>
                                                </span>
                                            </div>
                                            <div style={{ padding: '2px', display: 'grid' }}>
                                                    <span style={{ textAlign: 'start', width: '100%', marginLeft: '50px' }}>Messege:
                                                        <span style={{ paddingLeft: '30px' }}> 
                                                        
                                                             {
                                                                Object.values(this.props.insertLevelDataResponse)
                                                             }
                                                        </span>
                                                    </span>
                                                </div>
                                        </Typography>
                                    </Grid>
                                    </Grid>
                                </Paper>
                                </div> 
                                <br></br>
							   <div className="col-md-12" style={{ textAlign:"center", paddingLeft: "11.250" }}>
                                    <CButton
                                            variant="contained"
                                            color="primary"
                                            standOut={'type1'}
                                            label={<span style={{letterSpacing: '1.25px',color:'#fff'}}>Change Level</span>}
                                            //onClick={this.onClick}
                                            type={"submit"}
                                            onClick={this.onSubmit}
                                    />
							    </div>
                     </form>
                </Grid>
                    {this.props.getAllProjectsStatus === 'started' && <Loader />}
                    {this.props.getAllBatchesStatus === 'started' && <Loader />}
                    {this.props.getSourceLevelStatus === 'started' && <Loader />} 
                    {this.props.getTaskLevelStatus === 'started' && <Loader />} 
      
         </div>
           
		);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        getAllProjectsStatus: state.projectReducer.getAllProjectsStatus,
        getAllProjectsResponse:state.projectReducer.getAllProjectsResponse,
        getAllProjectsError:state.projectReducer.getAllProjectsError,
        getAllBatchesStatus: state.projectReducer.getAllBatchesStatus,
        getAllBatchesResponse: state.projectReducer.getAllBatchesResponse,
        getAllBatchesError: state.projectReducer.getAllBatchesError,
        getSourceLevelStatus: state.projectReducer.getSourceLevelStatus,
        getSourceLevelResponse: state.projectReducer.getSourceLevelResponse,
        getSourceLevelError: state.projectReducer.getSourceLevelError,
        getTaskLevelStatus: state.projectReducer.getTaskLevelStatus,
        getTaskLevelResponse: state.projectReducer.getTaskLevelResponse,
        getTaskLevelError: state.projectReducer.getTaskLevelError,
        insertLevelData: state.projectReducer.insertLevelData,
        insertLevelDataResponse: state.projectReducer.insertLevelDataResponse,
        insertLevelDataError: state.projectReducer.insertLevelDataError
    };
  }

export default withRouter(connect(mapStateToProps, {
    getAllProjects,
    getBatch,
    getSourceLevel,
    getTaskLevel,
    insertLevelData
})(StatusChange));