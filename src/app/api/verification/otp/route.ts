import { redis } from '@/lib/redis'
import { transporter } from '@/lib/nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.email) {
      return Response.json({
        code: 400,
        error: "Email parameter is required",
      });
    }

    const otp = (Math.random() + 1).toString(36).substring(2);
    
    // Store OTP with email as key
    await redis.set(body.email, otp);
    await redis.expire(body.email, 300); // 5 minutes expiry
    
    try {
      const mailOptions = {
        from: 'hemitvpatel@gmail.com',
        to: body.email,
        subject: 'Your OTP',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
              }
              .email-container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #ffffff;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #ddd;
              }
              .header h1 {
                margin: 0;
                color: #333;
              }
              .otp {
                font-size: 24px;
                font-weight: bold;
                color: #2c7dfa;
                text-align: center;
                margin: 20px 0;
              }
              .footer {
                font-size: 14px;
                color: #666;
                text-align: center;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <h1>DailySAT Employment System </h1>
              </div>
              <p>Hello,</p>
              <p>Use the following One-Time Password (OTP) to complete your verification process:</p>
              <div class="otp">${otp}</div>
              <p>Please note that this OTP is valid for only 5 minutes. Do not share this code with anyone.</p>
              <p>Thank you,<br>The Team</p>
              <div class="footer">
                <p>If you did not request this, please ignore this email.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };
      
    
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Error sending email:', error);
        }
        console.log('Email sent:', info.response);
    });
    
    } catch (emailError) {
      return Response.json({
        code: 500,
        error: "Failed to send email",
        details: emailError
      });
    }

    return Response.json({
      code: 200,
      message: "Email sent successfully"
    });

  } catch (error) {
    return Response.json({
      code: 500,
      error: "Internal server error",
      details: error
    });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const passwordAttempt = url.searchParams.get("passwordAttempt");
    const email = url.searchParams.get("email");

    if (!email || !passwordAttempt) {
      return Response.json({
        code: 400,
        error: "Both email and OTP parameters are required",
      });
    }

    const storedOtp = await redis.get(email);
    
    if (!storedOtp) {
      return Response.json({
        code: 404,
        error: "No OTP found or OTP expired"
      });
    }

    const isValid = storedOtp === passwordAttempt;

    if (isValid) {
      await redis.del(email); // Clear OTP after successful verification
    }

    return Response.json({
      code: 200,
      result: isValid
    });

  } catch (error) {
    return Response.json({
      code: 500,
      error: "Internal server error",
      details: error
    });
  }
}