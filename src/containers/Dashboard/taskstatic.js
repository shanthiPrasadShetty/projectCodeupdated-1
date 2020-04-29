import React, { Component } from 'react';
import {
    taskState
} from "../../actions";
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { CButton } from '../../components/Buttons/CButton';
import { Link, withRouter } from "react-router";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { shadows } from '@material-ui/system';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Loader } from "../../components/Loader";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

import TextField from '@material-ui/core/TextField';
import { object } from 'prop-types';
import { throws } from 'assert';
class Taskstatic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskDbState: {},
            taskStatistics:[],
            isPresentInRedis:"",
            user_id:[],
            user_level:[],
            start_time:[],

        }

    }

    onHandleTaskId = (e) => {
        if (e.target.value.match(/^[0-9.]+$|^$/)) {
            this.setState({ taskIds: e.target.value })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.getTaskState_status === 'success' && this.props.getTaskState_status != nextProps.getTaskState_status){
            if(Object.keys(nextProps.getTaskState_response).length){
                this.setState({taskDbState: nextProps.getTaskState_response.taskDbState})
                this.setState({taskStatistics: nextProps.getTaskState_response.taskStatistics})
                this.setState({isPresentInRedis: nextProps.getTaskState_response.isPresentInRedis})
            }
        }
    }

    taskHandle = (e) => {
        this.setState({user_id:e.target.value})
        var tID = this.state.taskIds
        this.props.taskState(tID);
    }

    handleProject = () => {
        this.setState({ project_id: e.target.value })
    }
    render() {
        const classes = this.props;
        const inputLabel = (null);
        return (
            <div style={{paddingLeft:'10%'}}>
                <Grid container spacing={3} style={{ margin: "10px", width: "100%" }}>
                    <Grid item md={12} >
                        <b>Task Statistics</b>
                    </Grid>
                    <Grid item md={12}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div>
                                <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                                    <TextField
                                        value={this.state.taskIds}
                                        value={this.state.project_id}
                                        placeholder='TaskId'
                                        onChange={this.onHandleTaskId}
                                        variant="outlined"
                                    >
                                    </TextField>
                                </FormControl>
                            </div>
                            <div style={{ paddingLeft: '5%' }}>
                                <CButton
                                    variant="contained"
                                    color="primary"
                                    standOut={'type1'}
                                    label={<span style={{ letterSpacing: '1.25px', color: '#fff', padding: '10px 20px',textAlign: 'center'}}>Submit</span>}
                                    onClick={this.taskHandle}
                                    type={"submit"}
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid container>
                            <Grid item xs={12} style={{ display: 'flex', flexDirection: 'col' }}>
                                <Box width="25%">
                                    <Box width="100%"
                                        bgcolor="grey.300"
                                        textAlign="left"
                                        spacing="margin-right"
                                        fontWeight="fontWeightBold" m={2}
                                        p={2} my={1}

                                    >
                                        Project Id:{this.state.taskDbState.project_id}
                                    </Box> 
                                </Box>
                                <Box width="25%">
                                    <Box width="90%"
                                        bgcolor="grey.300"
                                        textAlign="left"
                                        fontWeight="fontWeightBold" m={2}
                                        p={2} my={1}

                                    >
                                        Batch Id:{this.state.taskDbState.batch_id}
                                    </Box>
                                </Box>
                                <Box width="25%">
                                    <Box width="100%"
                                        bgcolor="grey.300"
                                        textAlign="left"
                                        fontWeight="fontWeightBold" m={2}
                                        p={2} my={1}
                                    >
                                        Next Level:{this.state.taskDbState.next_level}
                                    </Box>
                                </Box>
                                <Box width="25%">
                                    <Box width="90%"
                                        bgcolor="grey.300"
                                        textAlign="left"
                                        fontWeight="fontWeightBold" m={2}
                                        p={2} my={1}

                                    >
                                        Status:{this.state.taskDbState.status}
                                    </Box>
                                </Box>
                            </Grid>
                        
                        <Grid container>
                            <Box width="25%">
                                <Box width="100%"
                                    bgcolor="grey.300"
                                    textAlign="left"
                                    fontWeight="fontWeightBold" m={2}
                                    p={2} my={1}

                                >
                                     User Id:
                                     { this.state.taskStatistics[0] && this.state.taskStatistics[0].user_id}
                                </Box>
                            </Box>
                            <Box width="25%">
                                <Box width="90%"
                                    bgcolor="grey.300"
                                    textAlign="left"
                                    fontWeight="fontWeightBold" m={2}
                                    p={2} my={1}

                                >
                                    StartTime:{  this.state.taskStatistics[0] && this.state.taskStatistics[0].start_time}
                                </Box>
                            </Box>

                            <Box width="25%">
                                <Box width="100%"
                                    bgcolor="grey.300"
                                    textAlign="left"
                                    fontWeight="fontWeightBold" m={2}
                                    p={2} my={1}

                                >
                                    User Level:{  this.state.taskStatistics[0] && this.state.taskStatistics[0].user_level}
                                </Box>
                            </Box>
                            <Box width="25%">
                                <Box width="90%"
                                    bgcolor="grey.300"
                                    textAlign="left"
                                    fontWeight="fontWeightBold" m={2}
                                    p={2} my={1}

                                >
                                    Attempt Number:{ this.state.taskStatistics[0] && this.state.taskStatistics[0].attempt_no}
                                </Box>
                            </Box>
                        <Grid container>
                            <Box width="25%">
                                <Box width="100%"
                                    bgcolor="grey.300"
                                    textAlign="left"
                                    fontWeight="fontWeightBold" m={2}
                                    p={2} my={1}

                                >
                                     Email:
                                     {JSON.parse(localStorage.getItem('loggedInUserDetails')).email}
                                </Box>
                            </Box>
                            <Box width="25%">
                                <Box width="90%"
                                    bgcolor="grey.300"
                                    textAlign="left"
                                    fontWeight="fontWeightBold" m={2}
                                    p={2} my={1}

                                >
                                    User Name:{JSON.parse(localStorage.getItem('loggedInUserDetails')).name}
                                </Box>
                            </Box>
                            <Box width="25%">
                                <Box width="100%"
                                    bgcolor="grey.300"
                                    textAlign="left"
                                    fontWeight="fontWeightBold" m={2}
                                    p={2} my={1}

                                >
                                   FirstName:{JSON.parse(localStorage.getItem('loggedInUserDetails')).first_name}
                                </Box>
                            </Box>
                            <Box width="25%">
                                <Box width="90%"
                                    bgcolor="grey.300"
                                    textAlign="left"
                                    fontWeight="fontWeightBold" m={2}
                                    p={2} my={1}

                                >
                                  LastName:{JSON.parse(localStorage.getItem('loggedInUserDetails')).last_name}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                        <Grid item md={12} >
                            <b>isPresentInRedis:{(this.state.isPresentInRedis.toString())}</b>
                        </Grid>
                        <Grid container spacing={3} style={{ margin: "0px", width: "100%" }}>
                             <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                                <InputLabel ref={inputLabel} htmlFor="outlined-projectName-simple">

                                </InputLabel>
                                <br></br>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>Input</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                             {
                                                this.state.taskDbState.input && Object.values(this.state.taskDbState.input).map((item, i) => {
                                                    
                                                    return <MenuItem value={item}>{item}</MenuItem>
                                                })
                                            }
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <br></br>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>Output</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                             { 
                                              this.state.taskDbState.output && this.state.taskDbState.output.map((item, i) => {
                                                    return <MenuItem value={i}>{item}</MenuItem>
                                                })
                                            }  
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <br></br>
                                <Grid container>
                                    <Box width="25%">
                                        <Box width="100%"
                                            bgcolor="grey.300"
                                            textAlign="left"
                                            fontWeight="fontWeightBold" m={2}
                                            p={2} my={1}

                                        >
                                            LastModifiedTime:{this.state.taskDbState.lastModifiedTime}
                                           
                                        </Box>
                                    </Box>

                                    <Box width="25%">
                                        <Box width="100%"
                                            bgcolor="grey.300"
                                            textAlign="left"
                                            fontWeight="fontWeightBold" m={2}
                                            p={2} my={1}

                                        >
                                            PendingUsers:{this.state.taskDbState.pendingUsers}
                                           
                                        </Box>
                                    </Box>
                                    <Box width="25%">
                                        <Box width="100%"
                                            bgcolor="grey.300"
                                            textAlign="left"
                                            fontWeight="fontWeightBold" m={2}
                                            p={2} my={1}

                                        >
                                            PendingCompletion:{this.state.taskDbState.pendingCompletion}
                                        </Box>
                                    </Box>
                                </Grid>
                            </FormControl> 
                        </Grid>
                    </Grid>
                </Grid>
                    {this.props.getTaskState_status === 'started' && <Loader />}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        getTaskState_status: state.projectReducer.TaskStateStatus,
        getTaskState_response : state.projectReducer.TaskStateResponse || {},
        gettaskStateError: state.projectReducer.taskStateError,
        taskstatepayload: state.taskStateResponse
    };
}

export default withRouter(connect(mapStateToProps, {
    taskState
})(Taskstatic));