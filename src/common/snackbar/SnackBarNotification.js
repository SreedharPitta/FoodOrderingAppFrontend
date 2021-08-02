import { IconButton, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';

export default function SnackBarNotification(props){
    return(
        <Snackbar open={props.open} message ={props.message} onClose={props.notificationCloseHandler} autoHideDuration={1000} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }} 
        action={
            <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={props.notificationCloseHandler}>
                    <Close fontSize="small" />
                </IconButton>
            </React.Fragment>
        }
        />
    )
}