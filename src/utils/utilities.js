import { duration, format } from 'moment';
import { compose } from 'ramda';
import moment from "moment/moment";

const pad = (t) => t < 10 ? `0${t}` : `${t}`;

const formatMoment = (m) => `${pad(m.hours())}:${pad(m.minutes())}:${pad(m.seconds())}`;
const formatDate = 'DD/MM/YY';

export const timeToString = compose(formatMoment, duration);
export const dateToString = (momentDate) => momentDate.format(formatDate);

export const getDayByTimesptamp = (timeStamp) => {
    return moment(timeStamp).calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'DD/MM/YYYY'
    });
};

export const getHourByTimestamp = (timeStamp) => {
    return moment(timeStamp).format('HH:mm');
};
