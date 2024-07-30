const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// Route to handle form submission
exports.submitContactForm = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Failed");
    error.statusCode = 422;
    throw error;
  }

  const { name, email, phone, comment } = req.body;

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "khaqt268@gmail.com", // Your Gmail email address
        pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail password
      },
    });

    // Email content
    const mailOptions = {
      from: { name: "TechGadgetKV", address: "khaqt268@gmail.com" },
      to: "khakha260820022002@gmail.com", // Recipient's email address
      subject: "New Form Submission",
      html: `
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    ${phone ? `<p>Phone: ${phone}</p>` : ""}
    <p>Comment: ${comment}</p>
  `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error sending email");
      }
    });

    // Email content for user
    const userMailOptions = {
      from: { name: "TechGadgetKV", address: "khaqt268@gmail.com" },
      to: email, // User's email address
      subject: "Form Submission Confirmation",
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,</p>
        <p>TechGadgetKV Team</p>
      `,
    };

    // Send email to user
    await transporter.sendMail(userMailOptions);

    res.status(200).json({
      message: "Form submitted successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
