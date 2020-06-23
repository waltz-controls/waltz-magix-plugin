import {ReliableEventSource} from "@ingvord/reliable-event-source";
import {map} from "rxjs/operators";
import {Message} from "./message";


/**
 * Default reconnection delay - 3000 ms
 *
 * @constant
 * @type {number}
 */
const kReconnectionDelay = 3000;

/**
 * @property {string} host
 * @property {string} broadcastUrl
 * @property {string} subscribeUrl
 * @property {ReliableEventSource} source
 * @class Magix
 */
export class Magix {
    constructor(host = '') {
        this.host = host;
        this.broadcastUrl = `${this.host}/magix/api/broadcast`;
        this.subscribeUrl = `${this.host}/magix/api/subscribe`;

        this.source = new ReliableEventSource(this.subscribeUrl, {withCredentials: true}, kReconnectionDelay);
    }

    /**
     * Performs no-store cors post request to the magix server broadcasting the message
     *
     *
     * @param {Message} message
     * @return {Promise<Response>}
     */
    broadcast(message) {
        return fetch(this.broadcastUrl, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-store',
            body: JSON.stringify(message)
        });
    }

    /**
     *
     * @return {Observable<Message>}
     */
    observe() {
        return this.source.observe().pipe(
            map(msg => new Message(JSON.parse(msg.data)))
        )
    }
}