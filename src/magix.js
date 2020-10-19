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
     * @param {string} channel
     * @return {Promise<Response>}
     */
    broadcast(message, channel = 'message') {
        return fetch(this.broadcastUrl + `?channel=${channel}`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-store',
            body: JSON.stringify(message)
        });
    }

    /**
     *
     * @param {string} channel
     * @return {Observable<Message>}
     */
    observe(channel = 'message') {
        return this.source.observe(channel).pipe(
            map(msg => new Message(JSON.parse(msg.data)))
        )
    }
}