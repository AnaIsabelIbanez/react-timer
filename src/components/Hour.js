import React from 'react';
import {getHourByTimestamp} from '../utils/utilities';

export default ({timestamp}) => (
    <span>
        {getHourByTimestamp(timestamp)}
    </span>
);
