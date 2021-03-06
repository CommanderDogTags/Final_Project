export default {
    mysql: {
        connectionLimit: 20,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        database: process.env.DB_SCHEMA
    },
    auth: {
        secret: process.env.SECRET
    },
    aws: {
        secretAccessKey: process.env.AWS_KEY,
        accessKeyId: process.env.AWS_ID
    },
    trefle: {
        apiKey: process.env.TREFLE_KEY
    }
}