import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import DnsIcon from '@material-ui/icons/Dns';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Button from '@material-ui/core/Button';



import { Link, withRouter } from "react-router";
import { connect } from "react-redux";

class LiveProject extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        selected_Change:""
    }
  } 
  componentWillMount(){
    this.props.refreshChangeList();
    
  }
  editChange = (changeDetails) => {
    this.props.editChangeDetails(changeDetails)
  } 
}

const MainListItems = (props) => {
  return (
      <div style={{display:'flex',flexDirection:'column'}}>
    <ListItem button test={props}
      onClick={() => { props.router.push('/Dashboard') }}
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem  button test={props}
      onClick={() => { props.router.push('/status') }}
    >
      <ListItemIcon>
        <QueryBuilderIcon />
      </ListItemIcon>
      <ListItemText  primary="Status Change" />
      </ListItem>
      <ListItem  button test={props}
        onClick={() => { props.router.push('/level') }}
      >
      <ListItemIcon>
      <DnsIcon />
      </ListItemIcon>
      <ListItemText primary="Level Change" />
    </ListItem>
    <ListItem  button test={props}
        onClick={() => { props.router.push('/reset') }}
      >
      <ListItemIcon>
      <UpdateIcon />
      </ListItemIcon>
      <ListItemText primary="Reset Output" />
    </ListItem>
    <ListItem  button test={props}
        onClick={() => { props.router.push('/deletepro') }}
      >
      <ListItemIcon>
      <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Delete Project" />
    </ListItem>
    <ListItem  button test={props}
        onClick={() => { props.router.push('/Taskstatic') }}
      >
      <ListItemIcon>
      < FormatListBulletedIcon/>
      </ListItemIcon>
      <ListItemText primary="Task Statistics" />
  </ListItem>
    <ListItem  button test={props}
        onClick={() => { props.router.push('/deleteuser') }}
      >
      <ListItemIcon>
      <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Delete User" />
  </ListItem>
  </div>
  );
}

// export const secondaryListItems = (
//   <div>
//     <ListSubheader inset>Saved reports</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItem>
//   </div>
// );

function mapStateToProps(state, ownProps) {
  return {
  };
}

export default withRouter(connect(mapStateToProps, {})(MainListItems));


