import React from 'react';
import { Grid } from 'material-ui';

export default ({className, children, ...props}) => (
    <Grid className={className} {...props}>
        {children}
    </Grid>
);
