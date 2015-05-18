'use strict';
var crypto = require('crypto');
var moment = require('moment');

function sign(secret,text) {
    return '0x' + crypto.createHmac('sha256', secret).update(text).digest('hex');
}

function signatureText() {
    return moment.utc().format('DD MMM YYYY HH');
}

module.exports.sign = sign;
module.exports.signatureText = signatureText;
