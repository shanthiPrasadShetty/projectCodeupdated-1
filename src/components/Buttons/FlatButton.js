import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Button = (props) => (
  <div className='RaisedButtonContainer'>
    <RaisedButton
      label={props.label}
      style={props.raisedButtonStyle}
      disableTouchRipple={props.disableTouchRipple}
      disabled={props.disabled}
      onClick={props.onClick}
      buttonStyle={props.buttonStyle}
      labelColor={props.labelColor}
    />
  </div>
);

export default Button;

Button.defaultProps = {
  label: 'Button testing',
  raisedButtonStyle: {
  },
  onClick: ()=>{},
  disableTouchRipple: false,
  disabled: false,
  labelColor: '',
  labelStyle:{},
  icon: ()=>null,
  buttonStyle: {
  },
}
