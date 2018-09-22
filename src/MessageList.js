const DEFAULT_LIMIT = 50;

export class MessageList {

    constructor(container, limit) {
        this.container = container;
        this.limit = limit || DEFAULT_LIMIT;
        this.pending = [];

        this.update = this.update.bind(this);
    }

    append(el) {
        this.pending.push(el);
        requestAnimationFrame(this.update);
    }

    update() {
        this.pending.forEach(el => this.container.prepend(el));
        this.pending = [];
        removeChildren(this.container, this.limit);
    }

    clear() {
        this.pending = [];
        removeChildren(this.container, 0)
    }
}

function removeChildren(el, limit) {
    while (el.childElementCount > limit) {
        el.removeChild(el.lastChild);
    }
}
