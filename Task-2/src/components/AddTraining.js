import React, { useState } from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


function AddTraining(props){
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: props.customer,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value})
  }

  const handleTime = (date) => {
    setTraining({...training, date: date})
  }

  const handleSave = () => {
    props.addTraining(training);
    handleClose();
  }

    return(
        <>
        <IconButton variant="contained" onClick={handleOpen}>
          <AddIcon/>
        </IconButton>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Training</DialogTitle>
          <DialogContent>
            <TextField 
              name='activity'
              value={training.activity}
              onChange={handleChange}
              label="Activity"
              fullWidth
              variant="standard"
            />
            <TextField
              name='duration'
              value={training.duration}
              onChange={handleChange}
              label="Duration"
              fullWidth
              variant="standard"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date"
                value={training.date}
                onChange={handleTime}
                renderInput={(params) => <TextField variant='standard' fullWidth {...params} />}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
        </>
    )
}

export default AddTraining;