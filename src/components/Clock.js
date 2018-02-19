import React from 'react';
import {timeToString} from "../utils/utilities";

export default ({seconds}) => (
    <span>
        {timeToString(seconds * 1000)}
    </span>
);
