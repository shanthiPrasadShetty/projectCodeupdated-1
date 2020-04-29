import React from 'react';
import "./styles.scss";

const styles = {
  defaultTitleTextStyle:{
    fontSize: 20,
    // position: 'relative',
    // alignItems: 'center',
    // backgroundColor:'red',
  },
  textStyle: {
    color: 'black',
    textAlign: 'center',
    position: 'relative',
  }
}

export const TitleText = (props) => {
  return(
    <div className="titleText" style={props.TitleTextStyle}>
      <p className="textstyle" style={props.textstyle}>
        {props.text}
      </p>
    </div>
  )
}

TitleText.defaultProps = {
  defaultTitleTextStyle: styles.defaultTitleTextStyle,
  TitleTextStyle: styles.defaultTitleTextStyle,
  textstyle: styles.textStyle,
  text: 'titleText ',
}
