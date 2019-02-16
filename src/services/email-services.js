'use strict'
var config = require('../config');
 var sendgrid = require('sendgrid')(config.sendgridKey);


exports.send = async (to, subject, body) => {

    // var email = new sendgrid.Email();
    // email.addTo(to);
    // email.setFrom('email@email.com');
    // email.setSubject(subject);
    // email.setHtml(body);

    // sendgrid.send(email);

    sendgrid.send({
        to: to,
        from: 'email@email.com',
        subject: subject,
        html: body
    });
}