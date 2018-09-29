import { MessageList } from './MessageList';
import { Client } from './Client';

class Zen {
    constructor(containerId, options) {
        this.container = setupContainer(containerId, options.theme);
        this.messageList = new MessageList(this.container, options.messageLimit, options.debounce);
        this.client = new Client(this.messageList);

        this.client.connect(options);
    }

    moveTo(channel) {
        this.client.moveTo(channel);
    }

    destroy() {
        this.client.disconnect();
        this.messageList.clear();
    }
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
