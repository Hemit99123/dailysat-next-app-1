import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export const handleRateUserLimiter = async (request: NextRequest) => {
    // this is specific logic to rate limit user data
    if (request.nextUrl.pathname == "/api/auth/get-user") {
        // Construct the absolute URL
        const apiUrl = `${request.nextUrl.origin}/api/rate-limit/hits`

        // Use the absolute URL in the axios request
        const hitsResponse = await axios.get(apiUrl)

        const numberHits: number = hitsResponse.data.numberHits
    
        if (numberHits <= 2) {
            return NextResponse.next()
        } else {
            // cache logic here so that user data is still populated (in different lib function)
    
            // in user tab of this response, it will be using data from the cache
            return NextResponse.json({
                result: "Success - using cache",
                user: "to be added"
            })
        }
    }
}
