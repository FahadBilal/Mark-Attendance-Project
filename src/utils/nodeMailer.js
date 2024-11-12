import nodeMailer from 'nodemailer'

const sendOptMail= async (email,opt)=>{
    const transportor = nodeMailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.MAIL_PASSWAORD,
        },
    });

    const mailOptions={
        from:process.env.EMAIL,
        to:email,
        subject:"Verify your Email",
        text:`your Opt for email verification:${opt}`
    }

    await transportor.sendMail(mailOptions);

}
export default sendOptMail;