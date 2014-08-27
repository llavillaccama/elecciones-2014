var SmsPlugin = function () {};

SmsPlugin.prototype.send = function (phone, message, method, successCallback, failureCallback) {    
    return cordova.exec(successCallback, failureCallback, 'SmsPlugin', "SendSMS", [phone, message]);
};

window.sms = new SmsPlugin();