import React, { Component } from "react";

import { createMuiTheme } from '@material-ui/core/styles';
import { COLORS, FONTS } from '../../utils';
import { withStyles, ThemeProvider} from '@material-ui/styles';
import { Button } from '@material-ui/core';

const styles = {
    CButtonStyle:{
        //fontFamily: "Open Sans",
        cursor:'pointer',
        fontWeight:'bold',
        '&:hover': {
            backgroundColor: COLORS.taskMonk_buttonHover,
        }
    }
}

const dullStyle = {
    color: COLORS.taskMonk_labelColor,
    backgroundColor: COLORS.taskMonk_darkGrey
}

const type1 = {
    color: '#FFF',
    backgroundColor: COLORS.taskMonk_NavBlue,   
}

const type2 = {
    color: '#FFF',
    backgroundColor: COLORS.taskMonk_Yellow
}

const defaultColor = {
    color: '#FFF',
    backgroundColor: COLORS.taskMonk_buttonRest
}

function CButtonMaster(props){
    let bStyle = {}
    if((props.type && props.type == 'dull') || props.disabled){
        bStyle = dullStyle
    }
    else if(props.standOut){
        if(props.standOut == 'type1'){
            bStyle = type1;
        }
        else {
            bStyle = type2;
        }
    }
    else{
        bStyle = defaultColor
    }
    
    return (
            <Button
                disabled={props.disabled}
                variant="contained"
                type={props.type==='submit'?props.type:null}
                className={props.classes.CButtonStyle}
                fullWidth={props.fullWidth?props.fullWidth:false}
                style={{...props.style, ...bStyle}}
                onClick={props.onClick}
            >{props.label}</Button>
    );
}

export const CButton = withStyles(styles)(CButtonMaster);
 
