import React, { Component } from 'react';
import {
  getAllOrganisation

} from "../../actions";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { secondaryListItems } from './listItems';
import MainListItems from './listItems';
import TextField from '@material-ui/core/TextField';
import RenderToLayer from 'material-ui/internal/RenderToLayer';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { CButton } from '../../components/Buttons/CButton';
import { Loader } from "../../components/Loader";
import MenuItem from '@material-ui/core/MenuItem';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'© Copyright '}
      <Link color="inherit" href="https://www.taskmonk.ai">
        Taskmonk Technology Pvt Ltd.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgId: "",
      organisation: "",
      errors: "",
      organize: []
    }
  }

  componentDidMount() {
    let data, projectId;
    this.props.getAllOrganisation()
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.getAllOrganisationStatus === 'success' && nextProps.getAllOrganisationStatus != this.props.getAllOrganisationStatus) {
      this.setState({ organize: nextProps.getAllOrganisationResponse })
    }
  }

  handleOnOrgChange(e) {
    localStorage.setItem("orgId", e.target.value);
  }

  render() {
    const { organize } = this.state

    let orgList = organize.map((item, i) => {
      return (<MenuItem value={item.id}>{item.name} ({item.id})</MenuItem>
      )
    })
    
    return (
      <main>
        <div />
        <Container maxWidth="lg" >
          <Grid container spacing={1} >
            <Grid item xs={12} >
              <Paper style={{padding:40}}>
                <div style={{textAlign: 'center'}}>
                  <h1>Welcome to dashboard</h1>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Copyright />

        {this.props.getAllOrganisationStatus === 'started' && <Loader />} 
      </main>
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
  getAllOrganisation
})(Organization));