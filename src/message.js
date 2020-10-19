/**
 *
 * @property {string|number} id
 * @property {string|number} parent
 * @property {string} user
 * @property {string} origin
 * @property {string} target
 * @property {*} payload
 * @class Message
 * @see https://github.com/waltz-controls/rfc/blob/master/1/message.md
 */
export class Message {
    constructor({id, parent, user, action, origin, target, payload}) {
        if (!id) throw new Error("id must be specified")
        if (!origin) throw new Error("origin must be specified")
        this.id = id;
        this.parent = parent;
        this.user = user;
        this.action = action;
        this.origin = origin;
        this.target = target;
        this.payload = payload;
    }
}