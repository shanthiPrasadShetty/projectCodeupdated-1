import React, { Component } from 'react';
import {getAllProjects,
    deleteRequest
  } from "../../actions";
import { Link, withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import { CButton } from '../../components/Buttons/CButton';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import { Loader } from "../../components/Loader";
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import Confirm from '../../../src/components/Modal/confirm'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { CustomTable, CustomTableBody, CustomTableHead, CustomTableRow, CustomTableCell} from '../../../src/components/Modal/cTabel';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    overflowX: "auto",
    borderRadius: "8px 8px 0px 0px"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    },
  }
});

class DeletePro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors:{},
      projectName: [],
      onAlertOpenModal: false,
      projects: [],
      projectId: [],
      searchVal:'',
      alertMessage: '',
    }
    this.handleOnProjectChange=this.handleOnProjectChange.bind(this)
  }

  onChange = value => {
        
    this.setState({projectId: value});
};

onSubmit = e => {
    e.preventDefault()
    const newStatus = {
        projectId: this.state.projectId,
    }  
        const {projectId}=this.state  
}        

  componentWillReceiveProps(nextProps) {
        
    if(nextProps.getAllProjectsStatus === 'success' && nextProps.getAllProjectsStatus != this.props.getAllProjectsStatus){
        this.setState({projects: nextProps.getAllProjectsResponse })
    }
    
}  

componentDidMount() {
    let orgId = localStorage.getItem("orgId");
    if(orgId)
        this.props.getAllProjects(orgId)
}

  handleOnProjectChange(e){
    this.setState({projectId:e.target.value});
}

    deleteProject = async () => {
    this.setState({ onDeleteOpenModal: true, alertMessage: "Are you sure want to delete"})
        
    }
    onDelete = () =>{
         this.state.projectId.map((deleteItem)=>{
          this.props.deleteRequest(deleteItem)
         });
         this.setState({onDeleteOpenModal:false})
    }

    onDeleteModalClose = () => {
        this.setState({ onDeleteOpenModal: false })
      }

      handleSearch_a_project = (e) => {
        this.setState({searchVal: e.target.value})
      }
      updateDeleteids=(val)=>{
        this.setState({
          projectId:[...this.state.projectId,val]
        })
      }

render(){
    const { errors } = this.state
    const { classes } = this.props;
    const { projects }  = this.state
    const inputLabel = (null);

    const actions = [<CButton
        label={"Ok"}
        onClick={this.onDelete} />,
      <CButton 
        type={'dull'}
        label={"cancel"}
        onClick={this.onDeleteModalClose}
      />]
      
      this. filtered_projectList = projects.filter(x => ((x.name.toLowerCase().indexOf(this.state.searchVal.toLowerCase()) > -1) ))
          // || (x.Id.toLowerCase().indexOf(this.state.searchVal.toLowerCase()) > -1))
    let projectList = projects.map((item, i) => {
        return(<MenuItem value={item.id}>{item.name} ({item.id})</MenuItem>
        )
    })

    return(
         <div className="container-fluid" style={{ textAlign: "center", marginTop: 50, marginBottom: 50, paddingLeft: "150px", paddingRight: "150px" }}>
            <div className="col-md-12" style={{ display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
                <h1>
                     <b>Delete Project</b>
                </h1>
                <div style={{marginLeft:'20%',marginTop:'2%'}}>
                <TextField
                  value = {this.state.searchVal}
                  inputRef={this.searchInputRef}
                  onChange = {this.handleSearch_a_project}
                  InputProps={{
                      startAdornment: (
                          <InputAdornment position="start">
                              <i className="material-icons">
                                  search
                              </i>
                          </InputAdornment>
                        ),
                    }}
              />
              
              <div
                  value={this.state.projectId}
                  onChange={this.handleOnProjectChange}>
              </div>
                </div>
                      <div style={{marginLeft:'20%',marginTop:'2%',paddingLeft:'5%'}}>
                        <CButton
                            variant="contained"
                            color="primary"
                            standOut={'type1'}
                            label={<span style={{letterSpacing: '1.25px',color:'#fff'}}>Delete</span>}
                            type={"submit"}
                            onClick={this.deleteProject}
                        />
                    </div>
            </div>
    <form noValidate onSubmit={this.onSubmit}>
        <div className="row">
            <div className="col-md-12">
                        <CustomTable className={classes.table} aria-label="simple table">
                            <CustomTableHead>
                                <CustomTableRow>
                                <CustomTableCell align='right'></CustomTableCell>
                                    <CustomTableCell align='right'>ProjectId</CustomTableCell>
                                    <CustomTableCell align='right'>ProjectName</CustomTableCell>
                                    <CustomTableCell align='right'>ProcessName</CustomTableCell>
                                </CustomTableRow>
                            </CustomTableHead>
                                <CustomTableBody>
                                {
                                    this.filtered_projectList.map((item, i) => {
                                        return(
                                            <CustomTableRow>
                                            <MenuItem value={item.id}>
                                                <Checkbox onClick={(e)=> this.updateDeleteids(item.id) } ischecked={this.state.projectName.indexOf(item.id)> -1} />
                                                </MenuItem>
                                                <CustomTableCell align='right'>{item.id}</CustomTableCell>
                                                <CustomTableCell align='right' >{item.name}</CustomTableCell>
                                                <CustomTableCell align='right'>{item.processName}</CustomTableCell>
                                            </CustomTableRow>
                                        )
                                    })
                                 }
                            </CustomTableBody>
                        </CustomTable>
              </div>    
        </div>
    </form> 
            <Confirm
                    msg="Are you sure want to delete"
                    openModal={this.state.onDeleteOpenModal} 
                    modalOnClosed={this.onDeleteModalClose}
                    onOk={this.onDelete}
                    onCancel={this.onDeleteModalClose}
                  />

            
            {this.props.getAllProjectsStatus === 'started' && <Loader />}   
            {this.props.deleteRequestStatus === 'started' && <Loader />}
    </div>
    )
}
}
function mapStateToProps(state, ownProps) {
    return {
        getAllProjectsStatus: state.projectReducer.getAllProjectsStatus,
        getAllProjectsResponse:state.projectReducer.getAllProjectsResponse,
        getAllProjectsError:state.projectReducer.getAllProjectsError,
        deleteRequestStatus: state.projectReducer.deleteRequestStatus,
        deleteRequestResponse:state.projectReducer.deleteRequestResponse,
        deleteRequestError:state.projectReducer.deleteRequestError,
        orgId:state.organisationReducer.orgId
    };
  }
  
  export default withRouter(withStyles(styles)(connect(mapStateToProps, {
    getAllProjects,
    deleteRequest
    
  })(DeletePro)));