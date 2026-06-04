import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL

let redis;
let redisHost

if (REDIS_URL) {
    redis = new Redis(REDIS_URL, {
        tls: {
            rejectUnauthorized: false // Upstash usually requires TLS
        },
        retryStrategy: (times) => {
            // Reconnect strategy
            return Math.min(times * 50, 2000);
        }
    });

} else {
    // Host/Port Layout (Local/Docker)
    const redisConfig = {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        retryStrategy: (times) => Math.min(times * 100, 2000)
    };
    redis = new Redis(redisConfig);
}
let hasLoggedError = false;

redis.on('connect', () => {
    console.log(`Redis connected in ${REDIS_URL ? 'Production (Upstash)' : 'Development (Local)'} mode`);
});

redis.on('error', (err) => {
    if (err.code === 'ECONNREFUSED') {
        if (!hasLoggedError) {
            console.log(`⚠️  Redis connection failed (Connection Refused). Ensure Redis server is running on ${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`);
            hasLoggedError = true; // Prevent further logs for the same error
        }
    } else {
        console.error('Redis Client Error:', err);
    }
});

export default redis;

