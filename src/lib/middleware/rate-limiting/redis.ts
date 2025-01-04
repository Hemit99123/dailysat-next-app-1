import { createClient } from 'redis';

export const client = createClient({
    username: 'default',
    password: 'JisRQerJnPSPolifLzskaXqy3tVvvgyO',
    socket: {
        host: 'redis-19475.c273.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 19475
    }
});
