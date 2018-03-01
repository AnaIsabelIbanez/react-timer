import React from 'react';
import { getHour } from '../utils/utilities';

export default ({momentObject}) => (
    <span>
        {getHour(momentObject)}
    </span>
);
