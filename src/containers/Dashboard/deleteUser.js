import React, { Component } from 'react';
import {getAllUser,
    deleteUser
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
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import { Loader } from "../../components/Loader";
import Confirm from '../../../src/components/Modal/confirm'
import Alert  from '../../../src/components/Modal/Alert';
 import Paper from '@material-ui/core/Paper';
import { CustomTable, CustomTableBody, CustomTableHead, CustomTableRow, CustomTableCell} from '../../../src/components/Modal/cTabel';
import { withStyles } from '@material-ui/core/styles';
import { Checkbox } from 'material-ui';

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

class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
        errors:{},
        searchVal:'',
        users: [],
        onAlertOpenModal: false,
        orgId: [],
      
    }
  }

   onSubmit = e => {
    e.preventDefault()
     this.setState({ onDeleteOpenModal: true, alertMessage: "Are you sure want to delete"})
 }   

  onDelete =() =>{
     this.props.deleteUser(this.state.orgId)
   this.setState({onDeleteOpenModal:false})
}
 
  componentWillReceiveProps(nextProps) {     
    if(nextProps.getAllUserStatus === 'success' && nextProps.getAllUserStatus != this.props.getAllUserStatus){
        this.setState({users: nextProps.getAllUserResponse })
    }

    if(nextProps.deleteUserStatus === 'success' && nextProps.deleteUserStatus != this.props.deleteUserStatus){
        this.setState({users: nextProps.deleteUserResponse })
    }
    
    if(nextProps.orgId && !this.userDownloaded){
        this.props.getAllUser(nextProps.orgId)
        this.userDownloaded =true;
    }
}  


  handleDeleteUser(e){
    this.setState({orgId: e.target.value});
   
}

onDeleteModalClose = () => {
    this.setState({ onDeleteOpenModal: false })
  }

  handleSearch_a_project = (e) => {
    this.setState({searchVal: e.target.value})
  }

  updateDeleteids=(val)=>{
    this.setState({
      orgId:[...this.state.orgId,parseInt(val)]
    })
  }

render(){
    const classes = this.props;
    const { errors } = this.state
    const  { users }  = this.state
    const inputLabel = (null);

    this. filtered_projectList = users.filter(x => ((x.name.toLowerCase().indexOf(this.state.searchVal.toLowerCase()) > -1) ))
    // || (x.Id.toLowerCase().indexOf(this.state.searchVal.toLowerCase()) > -1))
    let userList = users.map((item, i) => {
        return(<MenuItem value={item.id}>{item.name} ({item.id})</MenuItem>
        )
    })
    return(
        <div className="container-fluid" style={{ textAlign: "center", marginTop: 50, marginBottom: 50, paddingLeft:"150px", paddingRight:"150px"}}>
             <div className="col-md-12" style={{ display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
                <h1>
                     <b>Delete User</b>
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
                value={this.state.orgId}
                onChange={this.handleDeleteUser}>

                </div>
              
                </div>
                      <div style={{marginLeft:'20%',marginTop:'2%',paddingLeft:'8%'}}>
                        <CButton
                           variant="contained"
                           color="primary"
                           standOut={'type1'}
                           label={<span style={{letterSpacing: '1.25px',color:'#fff'}}>Delete</span>}
                           type={"submit"}
                           onClick={this.onSubmit}
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
                                    <CustomTableCell align='right'>UserId</CustomTableCell>
                                    <CustomTableCell align='right'>UserName</CustomTableCell>
                                </CustomTableRow>
                            </CustomTableHead>
                                <CustomTableBody>
                                {
                                    this.filtered_projectList.map((item, i) => {
                                        return(
                                            <CustomTableRow>
                                              <MenuItem value={item.id}>
                                                <Checkbox onClick={(e)=> this.updateDeleteids(item.id) } ischecked={this.state.orgId.indexOf(item.id)> -1} />
                                                </MenuItem>
                                                <CustomTableCell align='right'>{item.id}</CustomTableCell>
                                                <CustomTableCell align='right'>{item.name}</CustomTableCell>
                                                {/* <ListItemText primary={item.name}/>  */}
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
            {this.props.getAllUsersStatus === 'started' && <Loader />}   
    </div>
    
    )
}
}
function mapStateToProps(state, ownProps) {
    return {
        getAllUserStatus: state.userReducer.getAllUserStatus,
        getAllUserResponse:state.userReducer.getAllUserResponse,
        getAllUserError:state.userReducer.getAllUserError,
        deleteUserStatus: state.projectReducer.deleteUserStatus,
        deleteUserResponse:state.projectReducer.deleteUserResponse,
        deleteUserError:state.projectReducer.deleteUserError,
        orgId:state.organisationReducer.orgId
    };
  }
  
  export default withRouter(connect(mapStateToProps, {
    getAllUser,
    deleteUser,
  })(DeleteUser));