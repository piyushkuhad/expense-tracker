import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  button: {
    fontWeight: '600',
  },
}));

const ContentDialog = (props) => {
  const classes = useStyles();
  const {
    dialogOpenHandler,
    dialogCloseHandler,
    buttonTitle,
    buttonColor,
    cancelButtonColor,
    dialogTitle,
    handleButtonClick,
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

  const handleClose = () => {
    setOpen(false);
    dialogCloseHandler();
  };

  return (
    <div>
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
        <DialogContent>
          <DialogContentText color="primary">
            {props.children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color={cancelButtonColor}
            className={classes.button}
          >
            Cancel
          </Button>
          {buttonTitle ? (
            <Button
              onClick={() => handleButtonClick()}
              color={buttonColor}
              className={classes.button}
            >
              {buttonTitle}
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  );
};

ContentDialog.defaultProps = {
  dialogOpenHandler: false,
  dialogTitle: null,
  buttonTitle: null,
  buttonColor: 'primary',
  cancelButtonColor: 'secondary',
  dialogSize: 'sm',
};

export default ContentDialog;
