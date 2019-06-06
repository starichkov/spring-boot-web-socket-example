'use strict';

window.onload = function () {
    connect();
};


var stompClient = null;
var alertsArea = null;
var alertTemplate = null;

var messageArea = null;
var messageTemplate = null;

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);

    alertsArea = document.querySelector('#alerts-area');
    alertTemplate = document.querySelector('#alert-template');

    messageArea = document.querySelector('#messages-area');
    messageTemplate = document.querySelector('#message-template');
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
    var toast = createToast(message.body);
    messageArea.appendChild(toast);
    $('#' + toast.getAttribute('id')).toast('show');
}

function onErrorReceived(incoming_message) {
    var message = null;
    if (incoming_message.body === undefined) {
        message = incoming_message;
    } else {
        message = incoming_message.body;
    }
    var alert = createErrorAlert(message);
    alertsArea.appendChild(alert);
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

function createToast(message_body) {
    var message = JSON.parse(message_body);

    var toastFragment = document.importNode(messageTemplate.content, true);
    var toast = toastFragment.firstElementChild;
    toast.setAttribute('id', message.id);

    var toastTime = toast.getElementsByTagName('small')[0];
    toastTime.appendChild(document.createTextNode(message.date));

    var toastBody = toast.getElementsByClassName('toast-body')[0];
    toastBody.appendChild(document.createTextNode(message.text));

    return toast;
}