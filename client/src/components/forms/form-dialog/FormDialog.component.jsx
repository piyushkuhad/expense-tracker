import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const FormDialog = (props) => {
  const {
    dialogOpenHandler,
    dialogCloseHandler,
    dialogTitle,
    showButton,
    showButtonTitle,
    dialogSize,
  } = props;

  //console.log('From Compo', dialogOpenHandler);

  const [open, setOpen] = React.useState(dialogOpenHandler);

  useEffect(() => {
    if (dialogOpenHandler) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [dialogOpenHandler]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dialogCloseHandler();
  };

  return (
    <div>
      {showButton ? (
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          {showButtonTitle}
        </Button>
      ) : null}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={dialogSize}
        aria-labelledby="form-dialog-title"
        className="cm-pop-up-container"
      >
        {dialogTitle === null ? null : (
          <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        )}
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

FormDialog.defaultProps = {
  dialogOpenHandler: false,
  showButton: false,
  dialogTitle: null,
  showButtonTitle: null,
  dialogSize: 'sm',
};

export default FormDialog;
