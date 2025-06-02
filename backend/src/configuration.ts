export default () => ({
  application: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    name: 'test',
    'application-root': '/api/v1',
  },
  bcrypt: {
    saltRounds: 10,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
