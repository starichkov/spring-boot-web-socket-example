'use strict';

window.onload = function () {
    connect();
};


var stompClient = null;
var alertsArea = null;

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);

    alertsArea = document.querySelector('#alerts-area');
}

function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topics/new', onMessageReceived);
    stompClient.subscribe('/topics/error', onErrorReceived);
}

function onError(error) {
    onErrorReceived('Could not connect to WebSocket server. Please refresh this page to try again!' + error);
}

function onMessageReceived(message) {
    var alert = createInfoAlert(message.body);
    alertsArea.appendChild(alert);
}

function onErrorReceived(message) {
    var alert = createErrorAlert(message.body);
    alertsArea.appendChild(alert);
}

function createInfoAlert(alert_message) {
    return createAlert('info', alert_message);
}

function createErrorAlert(alert_message) {
    return createAlert('danger', alert_message);
}

function createAlert(alert_class, alert_message) {
    var alert = document.createElement('div');
    alert.classList.add('alert', 'alert-' + alert_class, 'alert-dismissible', 'fade', 'show');
    alert.setAttribute('role', 'alert');
    alert.appendChild(createAlertTextNode(alert_message));
    alert.appendChild(createAlertCloseButton());
    return alert;
}

function createAlertTextNode(text) {
    return document.createTextNode(text);
}

function createAlertCloseButton() {
    var alertClose = document.createElement('button');
    alertClose.classList.add('close');
    alertClose.setAttribute('type', 'button');
    alertClose.setAttribute('data-dismiss', 'alert');
    alertClose.setAttribute('aria-label', 'Close');

    var span = document.createElement('span');
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = '&times;';

    alertClose.appendChild(span);
    return alertClose;
}