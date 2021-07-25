import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    image: {
        objectFit: 'contain',
        width: '70%',
        height: '70%',
        marginBottom: '30px',
    },
}));
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    divider: {
        margin: '10px',
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant='h6'>{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label='close'
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))(MuiDialogContent);

export default function Details({ isOpen, launchData, toggleModal }) {
    const classes = useStyles();
    return (
        <div>
            <Dialog
                onClose={toggleModal}
                aria-labelledby='customized-dialog-title'
                open={isOpen}
            >
                <DialogTitle
                    dividers
                    id='customized-dialog-title'
                    onClose={toggleModal}
                >
                    Mission: {launchData && launchData.mission_name}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <img
                        className={classes.image}
                        alt=''
                        src={launchData && launchData.links.mission_patch}
                    />
                    <Typography gutterBottom>
                        {launchData && launchData.details}
                    </Typography>
                </DialogContent>
            </Dialog>
        </div>
    );
}
