const nodemailer = require('nodemailer');

exports.sendContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: 'Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to send message' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Message sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Server error' });
  }
};