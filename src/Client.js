import * as tmi from 'tmi.js';
import { renderMessage, renderNotice } from './render';

export class Client {

    constructor(list) {
        this.list = list;
        this.connected = false;
        this.initialChannel = null;
    }

    connect(options) {
        this.client = new tmi.client(options);

        this.client.on('connected', this.handleConnected.bind(this));
        this.client.on('disconnected', this.handleDisconnected.bind(this));
        this.client.on('join', this.handleJoin.bind(this));
        this.client.on('message', this.handleMessage.bind(this));

        this.client.connect();
    }

    disconnect() {
        this.client.disconnect();
    }

    moveTo(channel) {

        // Can only join channels after connecting, so store channel and join later
        if (!this.connected) {
            this.initialChannel = channel;
            return;
        }

        this.leaveAll();
        this.client.join(channel);
    }

    leaveAll() {
        this.client.channels.concat().forEach(channel => this.client.leave(channel));
    }

    handleConnected(address, port) {
        this.connected = true;
        this.list.append(
            renderNotice(`Connected to ${address}:${port}`)
        );
        if (this.initialChannel) {
            this.moveTo(this.initialChannel);
            this.initialChannel = null;
        }
    }

    handleDisconnected(reason) {
        this.list.append(
            renderNotice(`Disconnected ${reason}`)
        );
    }

    handleJoin(channel, username, self) {
        if (!self) return;
        this.list.append(
            renderNotice(`Joined channel ${channel}`)
        );
    }

    handleMessage(channel, user, message, self) {
        this.list.append(
            renderMessage(user, message)
        );
    }

}
