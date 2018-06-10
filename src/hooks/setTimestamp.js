module.exports = ({ name }) => async context => {
    context.data[name] = new Date();

    return context;
}