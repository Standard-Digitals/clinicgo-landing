const nodemailer = require('nodemailer');
const { response } = require('./shared');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return response(200, {});
  }

  if (event.httpMethod !== 'POST') {
    return response(405, { message: 'Method not allowed' });
  }

  try {
    const { name, email, clinic, pluginInterest, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return response(400, { message: 'Name, email, and message are required' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"ClinicGo Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.SUPPORT_EMAIL || 'support@clinicgo.com',
      replyTo: email,
      subject: `New Contact Form: ${pluginInterest || 'General Inquiry'} — ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Clinic</td><td style="padding:8px;border-bottom:1px solid #eee;">${clinic || 'N/A'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Interest</td><td style="padding:8px;border-bottom:1px solid #eee;">${pluginInterest || 'General'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Message</td><td style="padding:8px;border-bottom:1px solid #eee;">${message}</td></tr>
        </table>
      `,
    };

    await transporter.sendMail(mailOptions);

    return response(200, { message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return response(500, { message: 'Failed to send message. Please try again.' });
  }
};
