import React, { Component } from 'react';
import {
  getAllOrganisation,
  setOrganisationId,
  getAllProjects
} from "../../actions";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { CButton } from '../../components/Buttons/CButton';
import { Loader } from "../../components/Loader";
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgId: "",
      organisation: "",
      errors: "",
      organize: []
    }
    this.filtered_orgList=[]
  }

  componentDidMount() {
    this.props.getAllOrganisation()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getAllOrganisationStatus === 'success' && nextProps.getAllOrganisationStatus != this.props.getAllOrganisationStatus) {
      this.setState({ organize: nextProps.getAllOrganisationResponse })
    }
  }

  onSubmit = e => {
    e.preventDefault()
    const newStatus = {
      orgId: this.state.orgId
    }
    const { orgId } = this.state
  };

  handleOnOrgChange(e) {
    //setto state
    this.setState({ orgId: e.target.value });
    var oID=e.target.value
    localStorage.setItem("orgId", oID)
    this.props.setOrganisationId(oID)
    this.props.getAllProjects()
  }

  onChange = value => {

    this.setState({ orgId: value });
    //this.getBatch(value);
  };

  render() {
    const { organize } = this.state
    //this. filtered_projectList = users.filter(x => ((x.name.toLowerCase().indexOf(this.state.searchVal.toLowerCase()) > -1) ))
    // this.filtered_orgList = organize.filter(x => ((x.id.toLowerCase().indexOf(this.state.orgId.toLowerCase()) > -1)))
    let orgList = organize.map((item, i) => {
      return (<MenuItem value={item.id}>{item.name} ({item.id})</MenuItem>
      )
    })

    return(
     <div style={{display:"flex", flexDirection:"row", width:"50%"}}>       
                <span style={{fontSize:'18px',marginTop:'15px'}}>
                    Select Organisation
                </span>
            <div style={{width:'50%'}}>
                <FormControl variant="outlined" fullWidth={true}>
                {/* <Typography component="h1" variant="h6" color="inherit" style={{textAlign:'center'}}>
                   Select Organisation
                </Typography> */}
                     {/* <Autocomplete
                         id="free-solo-demo"
                          value={this.state.orgId}
                          onChange={(e) => this.handleOnOrgChange(e)}
                         freeSolo
                         options={this.filtered_orgList.map(option => option.name)}
                         renderInput={params => (
                         <TextField
                             {...params}
                             //label="ProjectName"
                             margin="normal"
                             variant="outlined"
                             width="100%"
                             fullWidth                   
                           />
                         )}
                     />       */}
                    <Select
                        style={{color:'white',paddingBottom:'5%'}}
                        value={this.state.orgId}
                        onChange={(e) => this.handleOnOrgChange(e)}
                        // error={errors.organisation}
                        labelWidth="100"
                        
                        inputProps={{
                            name: 'orgId',
                            id: 'outlined-orgId-simple',
                        }}
                        >{orgList}
                          {
                               this.filtered_orgList.map((item, i) => {
                                return(<MenuItem value={item.name}> {item.name} {item.id}
                                </MenuItem>
                               )
                          })}    
                    </Select>
                </FormControl>
            </div>
            {this.props.getAllOrganisationStatus === 'started' && <Loader />}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    getAllOrganisationStatus: state.organisationReducer.getAllOrganisationStatus,
    getAllOrganisationResponse: state.organisationReducer.getAllOrganisationResponse,
    getAllOrganisationError: state.organisationReducer.getAllOrganisationError,
  };
}

export default withRouter(connect(mapStateToProps, {
  getAllOrganisation,
  setOrganisationId,
  getAllProjects
})(Organization));