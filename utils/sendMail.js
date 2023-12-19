const nodemailer = require('nodemailer');

const email = process.env.EMAIL;
const pass = process.env.PASS;
async function sendMail(receiverMail,link){
    try {
        const transport = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user: email,
                pass: pass
            }
        })
        // Mail to be sent 
        const mailOptions = {
            from: `Narehul`,
            to: `<${receiverMail}>`,
            subject: "Password Reset Link",
            text: link
        }

        const result  = await transport.sendMail(mailOptions);
        return result;
    }
    catch(error)
    {
        return error;
    }
}


module.exports = {sendMail};