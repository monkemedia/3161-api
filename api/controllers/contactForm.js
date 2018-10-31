const nodemailer = require('nodemailer');
const postmarkTransport = require('nodemailer-postmark-transport');
const transport = nodemailer.createTransport(postmarkTransport({
  auth: {
    apiKey: process.env.POSTMARK_TOKEN
  }
}));

exports.send_form = (req, res, next) => {
  const mail = {
    from: process.env.EMAIL_ADDRESS,
    to: req.body.email,
    templateId: 8788646,
    templateModel: {
      name: req.body.firstName,
      website_url: 'http://www.lodge3161.com',
      website_name: 'Lodge3161.com'
    }
  };

  function sendToUs () {
    const ourMail = {
      from: process.env.EMAIL_ADDRESS,
      to: process.env.EMAIL_ADDRESS,
      templateId: 8799019,
      templateModel: {
        name: req.body.firstName + ' ' + req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        subject: req.body.reason,
        message: req.body.message,
        website_url: 'http://www.lodge3161.com',
        website_name: 'Lodge3161.com'
      }
    };

    transport.sendMail(ourMail, function (err, info) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json({
          message: 'contact success'
        });
      }
    });
  }
   
  transport.sendMail(mail, function (err, info) {
    if (err) {
      res.status(500).send(err);
    } else {
      sendToUs();
    }
  });
};
