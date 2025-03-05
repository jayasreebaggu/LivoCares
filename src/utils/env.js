
const env = {
    development: {
        API_URL: 'https://5e54-110-235-225-101.ngrok-free.app',
        NODE_ENV: 'development',
    },
    test: {
        API_URL: 'https://api.yourdomain.com',
        NODE_ENV: 'test',
    },
    production: {
        API_URL: 'https://api.yourdomain.com',
        NODE_ENV: 'production',
    },
};

const currentEnv = env[process.env.NODE_ENV || 'development'];

export default currentEnv;