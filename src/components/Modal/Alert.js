import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { COLORS, localeString} from '../../utils';
import { CButton } from '../Buttons/CButton';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
                                                                      
const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '40%',
    borderRadius:10,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
  }
});

const modalStyle = {
    headerContainer:{
        padding:10,
        borderBottom:`2px solid ${COLORS.taskMonk_lightGrey}`
    },
    headerText:{
      fontWeight:'bold',
      textAlign:'left',
      marginLeft:10
    }
}

class Alert extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.openModal}
          disableEscapeKeyDown={true}
          disableBackdropClick={true}
          onClose={this.props.modalOnClosed}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <div style={modalStyle.headerContainer}>
                <span style={modalStyle.headerText}>{"Alert"}</span>                
                {this.props.showCloseButton?<button type="button" className="close" onClick={this.props.modalOnClosed} data-dismiss="modal" aria-label="Close">
                  <i className="material-icons" style={{color:COLORS.taskMonk_Yellow}}>cancel</i>
                </button>:null}
            </div>
            <div style={{padding:20, textAlign:'center'}}>
              {this.props.msg && this.props.msg!= ''?this.props.msg:"something_went_wrong"}
            </div>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <CButton label="ok" standOut={"type1"} style={{margin:10}} onClick={this.props.modalOnClosed} />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

Alert.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const AlertModal = withStyles(styles)(Alert);

export default AlertModal;