import axios from "axios";
import { useState } from "react";

export default async function IndexPage() {

    const [email, setEmail] = useState("")

    const handleAuthorization = async () => {
        const results = await axios.get(`/api/verification/find-employee?email=${email}`)
        
        if (results.data.result) {
            // first generate the one time password for user and return it 
            const otpCode = await axios.post(`/api/verification/generate-code`, {
                email
            })

            // send the otpCode to the email of the user (NEXT STEP)
        } else {
            // give a toast alert
            // currently just a simple alert but will change once toast is implemented
            alert("Unauthorized email, try it again or ask DailySAT staff to authorize you!")
        }
    }

  return (
    <section className="container">
        <h1>Enter email:</h1>
      <input onChange={(e) => setEmail(e.target.value)}/>
      <button onClick={handleAuthorization}>Submit</button>
    </section>
  );
}