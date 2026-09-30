// config/db.js
const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // ignore if dns server setting fails
}

const connectDB = async () => {
  try {
    console.log('🔄 Attempting MongoDB connection...');
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('💡 Please check:');
    console.log('   1. MongoDB is running (mongod)');
    console.log('   2. MONGO_URI in .env file is correct');
    console.log('   3. Network connectivity');
    process.exit(1);
  }
};

module.exports = connectDB;