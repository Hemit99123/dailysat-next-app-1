import axios from "axios";
import { useState } from "react";

export default async function IndexPage() {

    const [email, setEmail] = useState("")
    const [otp, setOTP] = useState("")

    const handleAuthorization = async () => {
        const results = await axios.get(`/api/verification/find-employee?email=${email}`)
        
        if (results.data.result) {
            // this will generate the code and send it to the email given through mailgrid
            await axios.post(`/api/verification/otp`, {
                email
            })            
        } else {
            // give a toast alert
            // currently just a simple alert but will change once toast is implemented
            alert("Unauthorized email, try it again or ask DailySAT staff to authorize you!")
        }
    }

    const handleVerification = async () => {
      // since we have email in this scp[e. the email variable within the next loc will take the value of 
      // the variable within this function

      const email = prompt("What is your email?")

      const results = await axios.get(`/api/verification/otp?passwordAttempt=${otp}&&email=${email}`)
    
      if (results.data.result) {
        // assign a session because user has been authorized

      } else {
        alert("Wrong OTP")
      }
    }

  return (
    <section className="container">
        <h1>Enter email: (to generate an OTP)</h1>
      <input onChange={(e) => setEmail(e.target.value)}/>
      <button onClick={handleAuthorization}>Submit</button>

      <h1>Enter one time password:</h1>
      <input onChange={(e) => setOTP(e.target.value)}/>
      <button onChange={handleVerification}>Verify code</button>
    </section>
  );
}