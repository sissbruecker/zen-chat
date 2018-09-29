const DEFAULT_LIMIT = 50;
const DEFAULT_DEBOUNCE = 500;

export class MessageList {

    constructor(container, limit, debounce) {
        this.container = container;
        this.limit = limit || DEFAULT_LIMIT;
        this.debounce = debounce || DEFAULT_DEBOUNCE;
        this.pending = [];

        this.scheduleUpdate = this.scheduleUpdate.bind(this);
        this.update = this.update.bind(this);

        this.clear();
    }

    append(el) {
        if (this.pending.length === 0) setTimeout(this.scheduleUpdate, this.debounce);

        this.pending.push(el);
    }

    scheduleUpdate() {
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
