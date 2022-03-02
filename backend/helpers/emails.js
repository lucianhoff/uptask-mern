import nodemailer from "nodemailer"

export const emailRegister = async (data) => {
    const { email, name, lastname, token } = data

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    // setup email data with unicode symbols

    const info = await transport.sendMail({
        from: '"UpTask" <account.la@uptask.com>',
        to: email,
        subject: "UpTask - Confirm your account",
        text: `Hi ${name} ${lastname},\n\n
        Thank you for registering at UpTask.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        <a href="${process.env.FRONTEND_URL}/confirm-account/${token}"}>Authenticate account!</a>\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n\n
        Have a great day!\n\n
        The UpTask Team`,
        html: `<p>Hi ${name} ${lastname},</p>
        <p>Thank you for registering at UpTask.</p>
        <p>Please click on the following link, or paste this into your browser to complete the process:</p>
        <p><a href="${process.env.FRONTEND_URL}/confirm-account/${token}"}>Authenticate account!</a></p>`
        

    })
}

export const emailForgorPassword = async (data) => {
    const { email, name, lastname, token } = data

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    // setup email data with unicode symbols

    const info = await transport.sendMail({
        from: '"UpTask" <account.la@uptask.com>',
        to: email,
        subject: "UpTask - Reset your password",
        text: `Hi ${name} ${lastname},\n\n
        You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        <a href="${process.env.FRONTEND_URL}/forgot-password/${token}"}>Reset your password!</a>\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n\n
        Have a great day!\n\n
        The UpTask Team`,
        html: `<p>Hi ${name} ${lastname},</p>
        <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please click on the following link, or paste this into your browser to complete the process:</p>
        <p><a href="${process.env.FRONTEND_URL}/forgot-password/${token}"}>Reset your password!</a></p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <p>Have a great day!</p>
        <p>The UpTask Team</p>`
    })
}