import {duration} from 'moment';
import {compose} from 'ramda';
import moment from 'moment/moment';

const pad = (t) => t < 10 ? `0${t}` : `${t}`;

const formatMoment = (m) => `${pad(m.hours())}:${pad(m.minutes())}:${pad(m.seconds())}`;
const formatDate = 'DD/MM/YY';

export const timeToString = compose(formatMoment, duration);
export const dateToString = (momentDate) => momentDate.format(formatDate);

export const getCalendarDay = (momentObject) => {
    return momentObject.calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'DD/MM/YYYY'
    });
};

export const getHour = (momentObject) => {
    return momentObject.format('HH:mm');
};

export const getMomentByIsoString = (isoString) => {
    return moment(isoString);
};

export const addDays = (moment, days) => {
    return moment.add(days, 'days');
};

export const storeInLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = key => {
    return JSON.parse(localStorage.getItem(key));
};

export const removeFromLocalStorage = key => {
    localStorage.removeItem(key);
};

export const findStorageItems = (text) => {
    let item;
    let results = [];
    for (item in localStorage) {
        if (item.match(text) && localStorage.getItem(item)) {
            const value = JSON.parse(localStorage.getItem(item));
            results.push({key: item, val: value});
        }
    }
    return results;
};
