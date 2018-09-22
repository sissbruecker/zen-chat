import { MessageList } from './MessageList';
import { Client } from './Client';

function Zen(containerId, options) {

    const container = setupContainer(containerId);
    const messageList = new MessageList(container, options.messageLimit);
    const client = new Client(messageList);

    client.connect(options);
}

function setupContainer(containerId) {
    const container = document.getElementById(containerId);
    container.classList.add('zen-container');

    return container;
}

export default Zen;
