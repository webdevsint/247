const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const express = require("express");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./views/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.resolve("./views/about.html"));
});

app.get("/book", (req, res) => {
  res.sendFile(path.resolve("./views/book.html"));
});

app.get("/team", (req, res) => {
  res.sendFile(path.resolve("./views/team.html"));
});

app.get("/service/manned-guarding", (req, res) => {
  res.sendFile(path.resolve("./views/service/manned_guarding.html"));
});

app.get("/service/security-survey", (req, res) => {
  res.sendFile(path.resolve("./views/service/security_survey.html"));
});

app.get("/service/executive-protection", (req, res) => {
  res.sendFile(path.resolve("./views/service/exec_protection.html"));
});

app.get("/service/event-security-management", (req, res) => {
  res.sendFile(path.resolve("./views/service/event_security.html"));
});
app.get("/service/electronic-security-solutions", (req, res) => {
  res.sendFile(path.resolve("./views/service/electronic_security.html"));
});

app.get("/service/facility-management", (req, res) => {
  res.sendFile(path.resolve("./views/service/facility_management.html"));
});

app.get("/clientele", (req, res) => {
  res.sendFile(path.resolve("./views/clientele.html"));
});

app.get("/gallery", (req, res) => {
  res.sendFile(path.resolve("./views/gallery.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.resolve("./views/contact.html"));
});

app.get("/credit", (req, res) => {
  res.redirect("https://www.instagram.com/nehan_yaser/");
});

app.post("/contact", async (req, res) => {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    company: req.body.company,
    services: req.body.services,
  };

  async function submit() {
    const currentdate = new Date();
    const datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      `@ ${new Date().toLocaleTimeString()}`;

    const info = await transporter.sendMail({
      from: '"Squad 24 Seven Limited Contact Page" <noreply@squad24seven.com>',
      to: "info@squad24seven.com",
      subject: `Web contact`,
      html: `<p>Please respond to Mr. / Ms. <b>${
        payload.name
      }</b> ASAP as per their request made on (${datetime}).</p><p>Services they are interested in: <b>${
        Array.isArray(payload.services)
          ? `${payload.services.join(", ")}`
          : `${payload.services}`
      }</b></p><p>Contact Details are listed below:</p><ul><li>Email: ${
        payload.email
      }</li><li>Phone: ${payload.phone}</li>${
        payload.company.length > 0 ? `<li>Company: ${payload.company}</li>` : ""
      }</ul>`,
    });
  }

  submit().catch((e) => console.log(e));

  res.sendFile(path.resolve("./views/contact_success.html"));
});

app.get("*", function (req, res) {
  res.status(404).sendFile(path.resolve("./views/404.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
