export function renderNotice(message, type) {
    const el = document.createElement('p');
    el.classList.add('zen-notice', type);
    el.innerText = message;
    return el;
}

export function renderMessage(user, message) {

    const userName = user['display-name'];
    const userColor = user['color'] || 'inherit';

    const el = document.createElement('p'),
        userEl = document.createElement('span'),
        messageEl = document.createElement('span');

    userEl.innerText = userName;
    userEl.classList.add('zen-user');
    userEl.style['color'] = userColor;

    messageEl.innerText = `: ${message}`;
    messageEl.classList.add('zen-text');

    el.classList.add('zen-message');
    el.appendChild(userEl);
    el.appendChild(messageEl);

    return el;
}
