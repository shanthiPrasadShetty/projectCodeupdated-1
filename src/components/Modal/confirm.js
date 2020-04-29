import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { COLORS} from "../../utils";
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
        borderBottom:`2px solid ${COLORS.taskMonk_lightGrey}`,
    },
    headerText:{
      fontWeight:'bold',
      textAlign:'left',
      marginLeft:10
    }
}

class TMModal extends React.Component {
  render() {
    const { classes } = this.props;
    const msg = this.props.msg?(this.props.msg==''?"are you sure":this.props.msg):"are_you_sure";
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
                <span style={modalStyle.headerText}>{"Confirm"}</span>                
                {this.props.showCloseButton?  <button type="button" className="close" onClick={this.props.modalOnClosed} data-dismiss="modal" aria-label="Close">
                  {ICONS.small_close}
                </button>:null}
            </div>
            <div style={{padding:20, textAlign:'center'}}>
              {msg}
            </div>
            <div style={{margin:10, display:'flex', justifyContent:'flex-end'}}>              
                <CButton label={"yes"} onClick={this.props.onOk} />
                <CButton label={"no"} type={'dull'} style={{marginLeft:10}} onClick={this.props.onCancel} />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

TMModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const TMModalWrapped = withStyles(styles)(TMModal);

export default TMModalWrapped;