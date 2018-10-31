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
    to: process.env.EMAIL_ADDRESS,
    templateId: 8788646,
    templateModel: {
      name: 'Ethan',
      website_url: 'Lodge3161.com',
      website_name: 'Lodge3161.com'
    }
  };

  function sendToUs () {
    const ourMail = {
      from: process.env.EMAIL_ADDRESS,
      to: process.env.EMAIL_ADDRESS,
      subject: 'Contact form from Lodge3161.com',
      html: '<h1>Hello, This email contains attachments</h1>',
    };

    transport.sendMail(ourMail, function (err, info) {
      if (err) {
        console.log("ERROR", err);
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
