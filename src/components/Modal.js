import React from 'react';
import Dialog, {DialogTitle, DialogContent, DialogActions} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import Typography from 'material-ui/Typography';
import { Error, Warning, AddAlert }  from 'material-ui-icons';

const renderDetails = details => details.map((detail, idx) => <li key={idx}>{detail}</li>);

const renderIcon = (type) => {
    const iconTypes = {
        error: <Error/>,
        warning: <Warning/>,
        info: <AddAlert/>
    };
    return iconTypes[type];
};

const Modal = ({
    children,
    type,
    title,
    actions,
    message,
    details,
    classes,
    hideModal,
    ...props
}) => {
    const titleText = title;
    const messageText = message;

    return (
        <Dialog
            {...props}
            transitionDuration={150}
            transition={Slide}
        >
            {titleText !== '' && (
                <DialogTitle id="modal-title">
                    <span>
                        {renderIcon(type)} {titleText}
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
            <DialogActions><Button onClick={() => hideModal()}>Close</Button></DialogActions>
        </Dialog>
    );
};

export default Modal;
