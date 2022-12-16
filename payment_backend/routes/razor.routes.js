const express = require("express");
const app = express.Router();
const Razorpay = require("razorpay");
const nodemailer = require("nodemailer");
const fs = require("fs");
const hbs = require("handlebars");

const template = hbs.compile(fs.readFileSync(__dirname + "/mail.hbs", "utf-8"));

var transporter = nodemailer.createTransport({
  port: process.env.SMTP_PORT,
  service: "gmail",
  host: process.env.SMTP_MAIL,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: false,
});

const instance = new Razorpay({
  key_id: process.env.RAZOR_KEY,
  key_secret: process.env.RAZOR_SECRET_KEY,
});

app.post("/payment", async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount) * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).send(order);
  } catch (error) {
    res.status(404).send(error);
  }
});

app.get("/key", (req, res) => {
  res.status(200).json({
    key: process.env.RAZOR_KEY,
  });
});

app.post("/verification", async (req, res) => {
  const mailData = {
    from: "umangarora0134@gmail.com",
    to: req.query.email,
    subject: "Amount Deducted",
    text: "Amount Deducted",
    html: template({ amount: req.query.amount }),
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      res.status(404).send(error);
    } else {
      res.status(200).json({
        status: true,
        message_id: info,
      });
    }
  });

  //   res.status(200).json({
  //     status: true,
  //   });
});

module.exports = app;
