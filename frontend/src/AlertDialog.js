import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
        onClick={handleClickOpen}>
        <InfoIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"The Finest Dishes at the Finest Restaurant"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Use the link below to look at google reviews.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={() => {window.location.href = "https://www.google.com/maps/search/"+props.name+"/"}} autoFocus>
            Go to Google Maps
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
