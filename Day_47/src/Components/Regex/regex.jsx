export const regexEmail = (email) => {
    return /([a-zA-Z][\w\.\-\_]+[a-zA-Z0-9]@(([a-zA-Z]|[a-zA-Z][\w\.\-\-]*[\w])\.[\w]{2,})+)/g.test(
        email
    );
};
