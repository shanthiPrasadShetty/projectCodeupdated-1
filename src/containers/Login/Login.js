import React, { Component } from "react";
import {
  authenticate,
  loginOrganisation, 
  getUserPrivileges  
} from "../../actions";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import { Field, reduxForm } from "redux-form";
import { COLORS, FONTS, ICONS } from "../../utils";
import { Link, withRouter} from "react-router";
import "./loginstyles.scss";
import localeString from "../../utils/localization";
import { CButton } from "../../components/Buttons/CButton";
import { Loader } from "../../components/Loader";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const styles = theme => ({
  '@global': {
    body: { 
      backgroundColor: COLORS.taskMonk_backGround,
    },
  },
  paper: {
    border:'solid 0.8px #a1a1a1',
    borderRadius:'5px',
    padding:'30px',
    backgroundColor: theme.palette.common.white,
   //marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#c5cae9'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
  
});
const FormInput = props => {
  return (
    <TextField
         {...props.input}
      //floatingLabelText={props.label}
      //floatingLabelStyle={props.labelStyle}
      value={props.input.value}
       
      label={props.label}
           margin="dense"
            variant="outlined"
      
      type={props.type}
      onChange={(e) => {
        props.input.onChange(e.target.value);
      }}
      className={props.className}
      style={props.style || { width: "100%" }}
      error={props.meta.error && props.meta.touched}
      helperText={props.meta.error && props.meta.touched ? props.errortext : ''}
      disabled={props.disabled}
      onKeyPress={props.onKeyDown?props.onKeyDown:null}
    />
  );
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organisationName: "",
      regState: 'register',
      confirm_code: '',
      confirmCode_ErrorText:'',
      userLoginStatus:'',
      orgLoginStatus:'',
      passwordHideState:true,
      onAlertOpenModal: false,
      alertMessage: '',
    };

  this.crowdUser = false;//TODO: must change to make dynamic

  this.userData = '';
  this.userAuthentication = true;
  this.userPrivileges = true;
  this.loginControl = false;
  this.authentication_Responce = true;
  this.code_confirmation_status = true;
  this.priviliges_status = true;
}

componentWillReceiveProps(nextProps) {

  if(nextProps.userAuthentication_status == 'success' && this.props.userAuthentication_status != nextProps.userAuthentication_status){
    this.props.loginOrganisation(this.state.loginDetail);
  }
  
  if(nextProps.loginOrganisationStatus == 'success' && nextProps.loginOrganisationStatus!=this.props.loginOrganisationStatus){
    if(nextProps.loggedInUser_Details && nextProps.loggedInUser_Details.id){
      this.props.getUserPrivileges(nextProps.loggedInUser_Details.id)
    }
  }

  if(nextProps.userPrivileges_status== 'success' && nextProps.userPrivileges_status != this.props.userPrivileges_status){
    if(nextProps.userPrivileges){
      var allow = false;
      nextProps.userPrivileges.forEach(element => {
        if(element.name == 'SUPER_ADMIN'){ //Change to admin privilege
          allow = true;
        }
      });

      if(allow){
        localStorage.setItem('userId', this.props.loggedInUser_Details.id);
        localStorage.setItem('loggedInUserDetails', JSON.stringify(this.props.loggedInUser_Details))
        //localStorage.setItem('userName', (response.first_name?response.first_name:'') +" "+ (response.last_name?response.last_name:''));
        //localStorage.setItem('loggedInUser', JSON.stringify(response));
        //localStorage.setItem('location',response.location);
        this.props.navigation.push({pathname: '/Dashboard'});
      }
      else{
        alert("Not allowed!!")
      }
    }
  }
}


// _setUserPrivileges = (id) => {
//   this.userPrivileges = false;
//   this.priviliges_status = true;
//   this.props.getUserPrivileges(id)
// }


getAuthentication = async values => {
  this.userData = values;
  this.userAuthentication = true;
  this.loginControl = true;
  this.setState({loginDetail: values})
  var authenticationData = {
     username : values.email.toLowerCase(),
     password : values.password,
   };
   
   this.props.authenticate(authenticationData)
  //  await this.props.loginOrganisation( values)
  //  await this.props.getUserPrivileges(489)
}

// handleSubmit = async event => {
//   event.preventDefault();

//   try {
//     this.props.getAuthentication(true);
//   } catch (e) {
//     alert(e.message);
//   }
// }

onSubmit = async values => {
  this.userAuthentication = false;
  this.setState({values})
  //await this.props.loginOrganisation(values);
  // if (this.props.lOrg.loginOrganisationStatus === "success") {
  //       const { orgname } = this.props.routeParams;
  //       localStorage.setItem('organisation', JSON.stringify(this.organisationSelected));
  //       this.props.navigation.push({
  //                                    pathname: `${'/org/'}${orgname}${'/'}`,
  //                                    // pathname: `${'/org'}`,
  //                                    state: { organisation: this.organisationSelected },
  //                                  });
  // }
};


passwordHide = () =>{ 
  this.setState({passwordHideState:!this.state.passwordHideState});
}


render() {    
  const {classes} = this.props;
   return(
      <div className="container-fluid" style={{backgroundColor:COLORS.taskMonk_backGround}}>
        <div className="row" style={{marginTop:"80px"}}>
          <Container className={classes.body} component="main" maxWidth="xs">
          <CssBaseline />
    <div className={classes.paper}>
    <Avatar style={{background:'#c5cae9'}}>
          {ICONS.signin_person}
        </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      {/* <div className="col-md-12" style={{textAlign:'center', marginTop:'10px'}}>
        {
          this.state.userLoginStatus === 'failed' && (
              <strong style={{ color: "red"}}>Incorrect username or password.!</strong>
          )
        }
      </div> */}
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Field
            name="email"
            label={localeString.email_id}
            type = "email"
            component={FormInput}
            errortext="Invalid mail id"
          />
          </Grid>
          <Grid item xs={10}>
          <Field
              name="password"
              label={localeString.password}
              type = {this.state.passwordHideState ? "password" : "text"}
              component={FormInput}
              errortext="Invalid Password"
            />
          </Grid>
          <Grid item xs={2} sm={2} container justify="flex-end">
              <span style={{margin:'33%',cursor:'pointer'}} title={this.state.passwordHideState ? "Show password" : "Hide password"} onClick={this.passwordHide}>
              {this.state.passwordHideState ? ICONS.visibility_off : ICONS.visibility}
              </span>
          </Grid>
          <Grid item xs={12}>
          <CButton 
            standOut={'type1'}
            variant="contained"
            label={<span style={{fontWeight:'bold',letterSpacing: '.25px',color:'#fff'}}>Login</span>}
            type={"submit"}
            onClick={this.props.handleSubmit(this.getAuthentication)}
            fullWidth
            className={classes.submit} />
          </Grid>
        </Grid>
        <div className="field">
              {
                  this.state.orgLoginStatus === 'failed' && (
                    <strong style={{color: "red"}}>Organisation fetch failed</strong>
                  )
              }
              {this.props.loginOrganisationStatus === "started" && <Loader />}
          </div>
      </form>
      </div>
      </Container>
    </div>
    </div>
   )
 }

}
const validate = values => {
  const errors = {};
  return errors;
};

const LoginForm = reduxForm({
  form: "LoginForm",
  validate
  })(Login);

function mapStateToProps(state, ownProps) {
  return {
    loginOrganisationStatus: state.loginReducer.loginOrganisationStatus,
    navigation: ownProps.router,
    userAuthentication_status: state.loginReducer.sign_Up.userAuthentication_Status,
    //userAuthentication_responce: state.loginReducer.sign_Up.userAuthentication_Response,
    loggedInUser_Details: state.loginReducer.loginOrganisationResponse,
    userPrivileges_status: state.userReducer.getUserPrivilegesStatus,
    userPrivileges: state.userReducer.getUserPrivilegesResponse,
    enableReinitialize:true
  };
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, {
  authenticate,
  loginOrganisation,
  getUserPrivileges
})(LoginForm)));
