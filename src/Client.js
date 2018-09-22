import * as tmi from 'tmi.js';
import { renderMessage, renderNotice } from './render';

export class Client {

    constructor(list) {
        this.list = list;
    }

    connect(options) {
        const client = new tmi.client(options);

        client.on('connected', this.handleConnected.bind(this));
        client.on('disconnected', this.handleDisconnected.bind(this));
        client.on('message', this.handleMessage.bind(this));

        client.connect();
    }

    handleConnected(address, port) {
        this.list.append(
            renderNotice(`Connected to ${address}:${port}`)
        );
    }

    handleDisconnected(reason) {
        this.list.append(
            renderNotice(`Disconnected ${reason}`)
        );
    }

    handleMessage(channel, user, message, self) {
        this.list.append(
            renderMessage(user, message)
        );
    }

}
