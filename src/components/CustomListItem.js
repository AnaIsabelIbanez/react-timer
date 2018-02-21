import React from 'react';
import { ListItem } from 'material-ui';

export default ({className, children, ...props}) => (
    <ListItem className={className} {...props}>
        {children}
    </ListItem>
);
