const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get('/', (req, res) => {
  res.send('Hello from server!');
});

app.post('/contact', (req, res) => {
  const { type, services, company, details, inquiry, feedback, firstName, lastName, email, phone } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let text = `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n`;

  if (type === 'services') {
    text += `Inquiry Type: Services\n`;
    if(services) {
      text += `Interested Services: ${services.join(", ")}\n`;
    }
    text += `Company: ${company}\nDetails: ${details}`;
  } else if (type === 'general') {
    text += `Inquiry Type: General Inquiry\nCompany: ${company}\nInquiry: ${inquiry}`;
  } else if (type === 'feedback') {
    text += `Inquiry Type: Feedback\nFeedback: ${feedback}`;
  }
  
  const mailOptions = {
    from: email,
    to: 'rustyvolts@gmail.com',
    subject: 'New contact form submission',
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Error sending email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

// Data endpoints
const dataEndpoints = ['teams', 'faq', 'services', 'reviews'];

dataEndpoints.forEach(endpoint => {
  app.get(`/${endpoint}`, (req, res) => {
    fs.readFile(`${endpoint}.json`, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(`Error reading ${endpoint} data`);
      } else {
        res.send(JSON.parse(data));
      }
    });
  });
});
