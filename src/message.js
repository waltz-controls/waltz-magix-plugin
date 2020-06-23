/**
 *
 * @property {string|number} id
 * @property {string|number} parent
 * @property {string} user
 * @property {string} source
 * @property {string} target
 * @property {*} payload
 * @class Message
 * @see https://github.com/waltz-controls/rfc/blob/master/1/message.md
 */
export class Message {
    constructor({id, parent, user, source, target, payload}) {
        this.id = id;
        this.parent = parent;
        this.user = user;
        this.source = source;
        this.target = target;
        this.payload = payload;
    }
}