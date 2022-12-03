import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function EditCustomer({ editCustomer, params}) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    })

    const handleOpen = () => {
        setCustomer({
            firstname: params.data.firstname,
            lastname: params.data.lastname,
            streetaddress: params.data.streetaddress,
            postcode: params.data.postcode,
            city: params.data.city,
            email: params.data.email,
            phone: params.data.phone
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        editCustomer(customer, params.value);
    }

    const handleChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <EditIcon />
            </IconButton>
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                    name="firstname"
                    value={customer.firstname}
                    onChange={handleChange}
                    margin="dense"
                    label="First name"
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    name="lastname"
                    value={customer.lastname}
                    onChange={handleChange}
                    margin="dense"
                    label="Last name"
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={handleChange}
                    margin="dense"
                    label="Street address"
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    name="postcode"
                    value={customer.postcode}
                    onChange={handleChange}
                    margin="dense"
                    label="Postcode"
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    name="city"
                    value={customer.city}
                    onChange={handleChange}
                    margin="dense"
                    label="City"
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    name="email"
                    value={customer.email}
                    onChange={handleChange}
                    margin="dense"
                    label="E-mail"
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    name="phone"
                    value={customer.phone}
                    onChange={handleChange}
                    margin="dense"
                    label="Phone"
                    fullWidth
                    variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditCustomer;
