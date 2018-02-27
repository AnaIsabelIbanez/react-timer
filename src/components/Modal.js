import React from 'react';
import PropTypes from 'prop-types';
import Dialog, {DialogTitle, DialogContent, DialogActions} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import Typography from 'material-ui/Typography';
import grey from 'material-ui/colors/grey';

// import IconError from 'components/icons/Error';
// import IconWarning from 'components/icons/Warning';
// import IconInfo from 'components/icons/Info';

// const iconStyle = {
//     position: 'relative',
//     top: '0.2em'
// };
//
// const styles = {
//     dialog: {
//         zIndex: 1000,
//         top: '-20%'
//     },
//     dialogPaper: {
//         maxWidth: '90%',
//         width: '600px'
//     },
//     dialogContent: {
//         color: grey[800]
//     },
//     iconError: {
//         color: cssVariables.colorError,
//         ...iconStyle
//     },
//     iconWarning: {
//         color: cssVariables.colorWarning,
//         ...iconStyle
//     },
//     iconInfo: {
//         color: cssVariables.colorInfo,
//         ...iconStyle
//     }
// };

// const mapAction = (actions, closeModal, key) => (
//     <Button
//         key={key}
//         color={key.includes('confirm') ? 'primary' : 'default'}
//         raised={key.includes('confirm') ? true : false}
//         onClick={() => {
//             closeModal();
//             actions[key] && actions[key]();
//         }}
//     >
//         texto
//     </Button>
// );

const renderDetails = details => details.map((detail, idx) => <li key={idx}>{detail}</li>);

//const renderButtons = (actions, closeModal) => Object.keys(actions).map(mapAction.bind(null, actions, closeModal));

const renderIcon = (type, classes) => {
    if (type === 'error') {
        return 'error';
    }

    if (type === 'warning') {
        return 'warning';
    }

    if (type === 'info') {
        return 'info';
    }
};

const Modal = ({
    children,
    type,
    title,
    actions,
    message,
    details,
    classes,
    ...props
}) => {
    const titleText = title;
    const messageText = message;

    return (
        <Dialog
            {...props}
            transitionDuration={150}
            transition={Slide}
            onRequestClose={() => console.log('close')}
        >
            {titleText !== '' && (
                <DialogTitle id="modal-title">
                    <span>
                        {renderIcon(type, classes)} {titleText}
                    </span>
                </DialogTitle>
            )}
            <DialogContent>
                {children ? (
                    children
                ) : (
                    <div>
                        {messageText && <Typography type="body2">{messageText}</Typography>}
                        {Array.isArray(details) &&
                        details.length > 0 && (
                                <Typography component="ul">{renderDetails(details)}</Typography>
                            )}
                    </div>
                )}
            </DialogContent>
            <DialogActions><Button>Close</Button></DialogActions>
        </Dialog>
    );
};

export default Modal;
