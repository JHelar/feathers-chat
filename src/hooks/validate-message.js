const { BadRequest } = require('@feathersjs/errors');

module.exports = (options = {}) => async context => {
    const { data } = context;

    if (!data.text) throw new BadRequest('Message text must exist');
    if (typeof data.text !== 'string' || data.text.trim() === '') throw new BadRequest('Message text is invalid')

    const user = context.params.user;

    context.data = {
        text: data.text.toString().substring(0, 400),
        userId: user._id
    }

    return context;
}
