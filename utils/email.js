const nodemailer = require('nodemailer');
var fs = require('fs');

let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

const sendWelcomeMail = (mailTo, mailSubject, firstName) => {
  fs.readFile(
    `${__dirname}/../assets/templates/welcome.html`,
    { encoding: 'utf-8' },
    (err, html) => {
      if (err) {
        console.log('File Error', err);
      } else {
        finalHtml = html.replace('{{firstName}}', firstName);

        let mailDetails = {
          from: `Expensum ${process.env.MAIL_ID}`,
          to: mailTo,
          subject: mailSubject,
          html: finalHtml,
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log('Mail Error: ', err);
          } else {
            console.log('Email sent successfully');
          }
        });
      }
    }
  );
};

module.exports = sendWelcomeMail;
