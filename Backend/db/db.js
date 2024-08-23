const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        console.log('MONGO_URL:', process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // tlsAllowInvalidCertificates: true,  
            // tlsAllowInvalidHostnames: true,
            // ssl: true,
            // sslValidate: false,  
            // tlsInsecure: true
        });
        console.log('DB Connected');
    } catch (error) {
        console.error('DB Connection Error:', error);
        throw error;
    }
}

module.exports = { db };
