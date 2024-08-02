// server.js or app.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Ensure CORS is set up correctly

const app = express();
app.use(cors()); // Use CORS middleware
app.use(bodyParser.json()); // To parse JSON bodies

const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other service you're using
  auth: {
    user: 'admin@gmail.com',
    pass: 'Iul24Iul24!'
  }
});

app.post('/send-email', async (req, res) => {
  const { to, subject } = req.body;

  const mailOptions = {
    from: 'admin@gmail.com', // Your email
    to,
    subject,
    text: 'Account succesfully approved'
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
