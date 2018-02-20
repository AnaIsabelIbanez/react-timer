import React from 'react';
import {timeToString} from '../utils/utilities';

export default ({className, seconds}) => (
    <span className={className}>
        {timeToString(seconds * 1000)}
    </span>
);
