const nodeMailer = require('nodemailer');

module.exports = {
    transporter : nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: "programerkd@gmail.com",
            pass: "@alireza894000"
        }
    }),
    mailOption :(email , subject ,  html)=>{
        return  {
            from: 'Online Shop',
            to: email,
            subject: subject,
            html : html
        };
    }
}

