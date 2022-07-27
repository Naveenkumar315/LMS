import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        // if (reason === 'clickaway') {
        //     return;
        // }
        alert('fdsf')
        setOpen(false);
    };

    return (
        <Stack className={open ? 'd-none' : ''} spacing={2} sx={{ width: '30%', float: 'right', top: '92%', position: 'fixed', right: '20px' }}>
            <Alert onClose={handleClose} severity="success">This is a success message!</Alert>
        </Stack>
    );
}
