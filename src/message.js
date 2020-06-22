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