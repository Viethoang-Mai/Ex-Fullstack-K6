export const regexInput = (value, range) => {
    const regex = new RegExp(`^[0-9]{0,${range - 1}$}`);

    return regex.test(value);
};
