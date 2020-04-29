import React, { Component } from "react";
import CircularProgress from "material-ui/CircularProgress";
import './notification.scss'
export const Loader = (props) => {
  return(
    <div className="loading">Loading&#8230;</div>
  )
  // return (
  //   <div style={props.containerStyle}>
  //    <CircularProgress  size={props.size} color={props.color }/>
  //   </div>
  // )
}

// Loader.defaultProps = {
//   size: 50,
//   color: 'rgba(123, 244, 8, 0.9)',
//   containerStyle: {
//     color: 'rgba(123, 244, 8, 0.9)',
//     position: 'fixed',
//     zIndex: 1000,
//     height: '2em',
//     width: '2em',
//     overflow: 'visible',
//     margin: 'auto',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   }
// }