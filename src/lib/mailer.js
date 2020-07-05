const nodemailer = require('nodemailer')

module.exports = transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "48a9200d255f66",
      pass: "b68e3c40210b89"
    }
  });

  