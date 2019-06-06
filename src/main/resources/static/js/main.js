'use strict';

window.onload = function () {
    connect();
};


var stompClient = null;
var alertsArea = null;
var alertTemplate = null;

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);

    alertsArea = document.querySelector('#alerts-area');
    alertTemplate = document.querySelector('#alert-template')
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
    var alertFragment = document.importNode(alertTemplate.content, true);
    var alert = alertFragment.firstElementChild;
    alert.classList.add('alert-' + alert_class);
    alert.appendChild(createAlertTextNode(alert_message));
    return alert;
}

function createAlertTextNode(text) {
    return document.createTextNode(text);
}
