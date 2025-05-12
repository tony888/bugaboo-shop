import { NextRequest, NextResponse } from 'next/server'
import Redis from 'ioredis';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import configuration from '@/config/configuration';

const config = configuration();
const mailgun = new Mailgun(FormData);
const redis = new Redis({
    port: config.redis.port, // Redis port
    host: config.redis.url, // Redis host
    tls: {}
});
const mg = mailgun.client({ username: 'api', key: config.mailgun.apiKey });

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email } = body;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await redis.set(email, otp, 'EX', 300); // 5 minutes expiration
        const data = await mg.messages.create("bugaboo.tv", {
            from: "no-reply@bugaboo.tv",
            to: [email],
            subject: "Confirmation Code",
            html: `<html xmlns="http://www.w3.org/1999/xhtml">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Confirmation Code</title>
            </head>
            <body>
            <div style="background-color:#FFFFFF; padding-top:50px; padding-bottom:50px; text-align: center;">
                <div style="width:588px;font-family:'Segoe UI', helvetica, arial, sans-serif;display: inline-block; text-align: left;">
                    <div style="border-bottom: 1px solid #A3A393;padding-bottom: 45px;">
                        <div style="color: #585858; font-size: 22px; font-weight: bold;">Confirmation Code</div>
                        <div style="color: #585858; font-size: 18px; padding-bottom: 19px;padding-top: 22px;"> Dear Customer, </div>
                      
                        <div style="background-color: #F0EFEF;  padding-top: 13px;padding-bottom: 13px; border-radius:3px;-moz-border-radius:3px; -webkit-border-radius:3px;">
                            <div style="color: #585858; font-size: 14px; padding-left: 30px;"> Your confirmation code  is : <span style="font-size: 22px"> <b>${otp}</b></span></div>    
                        </div>
            <div style="color: #585858; font-size: 14px; padding-top: 39px;"> Do not reply to this email. If you have any questions about Ch7HD, BUGABOO.TV 
              <br/>please contact
              <a href="mailto:feedback@bugaboo.tv">feedback@bugaboo.tv</a>  
              
                        </div>
            <div style="color: #585858; font-size: 14px;padding-top: 39px;"> Thank you,
              <br/>
                        </b>
                      </div>
                    </div>          
                </div>
            </div>
            </body>
            </html>`
        }).then(msg => console.log(msg)) // logs response data
            .catch(err => console.error(err)); // logs any error

        return NextResponse.json({
            message: `OTP sent successfully to ${email}`,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: 'Failed to send OTP',
            details: error instanceof Error ? error.message : 'Error sending OTP'
        }, { status: 500 });
    }
}
