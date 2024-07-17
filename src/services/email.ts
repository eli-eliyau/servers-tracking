import nodemailer from 'nodemailer';
import { emailModel, TableEmail } from '../models/emailModel';


//The function receives all emails from DB and sends them a message about an unhealthy server when three consecutive requests have failed
export const sendEmail = async (serverId:string ,serverName: string ) => {
  try {
    const emails: TableEmail[] = await emailModel.getAllEmails();

    if (emails.length === 0) {
      throw new Error('No emails found');
    }

    const emailAddresses: string[] = emails.map(value => value.email);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'server1eli@gmail.com',
        pass: 'ajfn cula kepv sbqb',
      },
    });

    let emailOptions = {
      from: 'server1eli@gmail.com',
      to: emailAddresses,
      subject: 'Server Error',
      text: `A server named ${serverName} is now defined as unhealthy \n SERVER ID : ${serverId}`,
    };


    return new Promise((resolve, reject) => {
      transporter.sendMail(emailOptions, (err, info) => {
        if (err) {
          console.error('Error sending email', err);
          return reject({ message: 'Error sending email' });
        } else {
          console.log('Email sent: ' + info.response);
          return resolve({ message: 'Email sent successfully' });
        }
      });
    });

  } catch (error) {
  
    console.error('Error in sendEmail function:', error);
    throw error;
  }
};
