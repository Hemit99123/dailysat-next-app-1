import Redis from "ioredis"

export const client = new Redis("rediss://default:AVIrAAIjcDEzYjhmZDUzNWYwZTI0YzY4OWU5MGJkZjMzM2MzY2Q3NnAxMA@evolved-spider-21035.upstash.io:6379", {
    lazyConnect: true
});