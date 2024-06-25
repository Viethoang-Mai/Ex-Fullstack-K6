export const debounce = function (fnc, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fnc(...args);
        }, timeout);
    };
};
