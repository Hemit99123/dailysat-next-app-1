import redis from '@/lib/redis'

export async function POST(request: Request) {
    try {
      const body = await request.json();
      
      if (body == "") {
        return Response.json({
            code: 400,
            error: "no email parameter specified",
          });
      }
      
      const otp = (Math.random() + 1).toString(36).substring(2);

      // set the otp to redis upstash server
      await redis.set(body.email, otp)

      // the key with the valid code will expire after 5 mins (300 secs)
      await redis.expire(body.email, 300);


      // send email to user through sendgrid api (NEXT STEP)

      return Response.json({
        message: "Email sent successfully"
      })


    } catch (error) {
        // Handle any database errors
        return Response.json({
            code: 500,
            error: "Internal server error",
            errorMsg: error
        });
    }
}

export async function GET(request: Request) {
  try {
    const url: URL = new URL(request.url);
    const searchParams: URLSearchParams = new URLSearchParams(url.search);
    const passwordAttempt: string = searchParams.get("otp") || "";
    const email: string = searchParams.get("email") || ""
    let result;

    if (passwordAttempt == "") {
      return Response.json({
          code: 400,
          error: "no email parameter specified",
        });
    }
    
    const passwordFromEmail = await redis.get(email)

    if (passwordFromEmail == passwordAttempt) {
      result = true
    } else {
      result = false
    }

    return Response.json({
      result
    })


  } catch (error) {
      // Handle any database errors
      return Response.json({
          code: 500,
          error: "Internal server error",
          errorMsg: error
      });
  }
}