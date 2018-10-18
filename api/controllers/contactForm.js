const nodemailer = require('nodemailer');

console.log(process.env.EMAIL_USERNAME);
console.log(process.env.EMAIL_PASSWORD);
console.log(process.env.EMAIL_PORT);

exports.send_form = (req, res, next) => {
  nodemailer.createTestAccount((error, account) => {

    let transporter = nodemailer.createTransport({
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
    let mailOptions = {
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: 'bar@example.com, baz@example.com', // list of receivers
          subject: 'Hello ✔', // Subject line
          text: 'Hello world?', // plain text body
          html: '<b>Hello world?</b>' // html body
      };

    transporter.sendMail(mailOptions, function (err, info) {
      console.log('here people');
      if (err) {
        console.log(err);
        // res.render('contact-failure');
        res.status(500).send({ error: 'contact failure' });
      }
      else {
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.status(200).json({
          message: 'contact success'
        })
        // res.render('contact-success');
      }
    });
  });
};
