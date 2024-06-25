export const debounce = function (fnc, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fnc(...args);
        }, timeout);
    };
};
