const deepCopy = x => {
    const out = Array.isArray(x) ? [] : {};

    for (let key in x) {
        if (x.hasOwnProperty(key)) {
            const temp = x[key];
            if (temp === null) {
                out[key] = null;
            } else {
                out[key] = (typeof temp === 'object') ? deepCopy(temp) : temp;
            }
        }
    }

    return out;
};

export default deepCopy;
