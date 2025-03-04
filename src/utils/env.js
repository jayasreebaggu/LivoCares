
const env = {
    development: {
        API_URL: 'http://192.168.1.185:8089',
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