import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { COLORS,FONTS,ICONS } from '../../utils';
import Paper from '@material-ui/core/Paper';

class CustomConst extends React.Component{
  constructor(props){
    super(props);
  }

  render(){CustomTableCell
    const { classes } = this.props;
    return <Paper className={classes.root}>
      <Table>
        {this.props.children}
      </Table>
    </Paper>
  }
}

const CustomTable  = withStyles(theme => ({
  root: {
    borderRadius: "8px 8px 0px 0px",
    overflowX: "auto",
    width:'100%'
  }
}))(CustomConst);

const CustomTableBody = withStyles(theme => ({

}))(TableBody);

const CustomTableHead = withStyles(theme => ({

}))(TableHead);

const CustomTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const CustomTableCell= withStyles(theme => ({
    head: {
      backgroundColor: COLORS.taskMonk_buttonHover,
      color: COLORS.taskMonk_tableHead,
      fontFamily: FONTS.tableHeader_font,
      fontSize: FONTS.fontSizeLevel2,
      fontWeight: "bold",
      padding:"12px",
    },
    body: {
      fontSize: FONTS.fontSizeLevel3,
      fontFamily: FONTS.tableHeader_font,
      color:COLORS.taskMonk_content
    }
}))(TableCell);


export { 
  CustomTable,
  CustomTableCell,
  CustomTableRow,
  CustomTableHead,
  CustomTableBody
}