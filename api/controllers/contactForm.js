const nodemailer = require('nodemailer');

exports.send_form = (req, res, next) => {
  nodemailer.createTestAccount((error, account) => {

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // mailOpts = {
      // from: req.body.name + ' &lt;' + req.body.email + '&gt;',
      // to: process.env.EMAIL_USERNAME,
      // subject: 'New message from contact form at tylerkrys.ca',
      // text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    // };
    const mailOptions = {
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: 'bar@example.com, baz@example.com', // list of receivers
          subject: 'Hello ✔', // Subject line
          text: 'Hello world?', // plain text body
          html: '<b>Hello world?</b>' // html body
      };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        res.status(500).send({ error: 'contact failure' });
      }
      else {
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.status(200).json({
          message: 'contact success'
        })
      }
    });
  });
};
