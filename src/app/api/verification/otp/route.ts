import redis from '@/lib/redis'
import email from '@/lib/mailgun'

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
      await email.messages.create('sandbox3a343c87b85d4de483f9e63e9140c228.mailgun.org', {
        from: "Hemit Patel- Chief Operating Officer <hemitvpatel@gmail.com>",
        to: [body.email],
        subject: "Your OTP Code",
        text: `Hi! Hope you are doing well :) Here is your code: ${otp}`,
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
    const otp = url.searchParams.get("otp");
    const email = url.searchParams.get("email");

    if (!email || !otp) {
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

    const isValid = storedOtp === otp;

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