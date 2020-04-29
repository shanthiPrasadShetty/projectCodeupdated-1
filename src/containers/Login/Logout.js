import React, { Component } from "react";
import { connect } from "react-redux";


class Logout extends Component {

  componentDidMount () {
    //this.props.clearAppSession();
    // this.props.navigation.replace('/')
    // localStorage.removeItem('userId')
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('idToken');
    // localStorage.removeItem('refreshToken');
    // localStorage.removeItem('UserPrivileges');
  }
  render() {
    return (
      <div />
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    navigation: ownProps.router,
  };
}

export default connect(mapStateToProps, {
})(Logout);
