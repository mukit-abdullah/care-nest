module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/carenest',
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key'
};
