import { MessageList } from './MessageList';
import { Client } from './Client';

function Zen(containerId, options) {

    const container = setupContainer(containerId, options.theme);
    const messageList = new MessageList(container, options.messageLimit);
    const client = new Client(messageList);

    client.connect(options);
}

function setupContainer(containerId, theme) {
    const container = document.getElementById(containerId);
    container.classList.add('zen-container');

    if (theme) {
        container.classList.add(theme);
    }

    return container;
}

export default Zen;
