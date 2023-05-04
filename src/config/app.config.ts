export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  scope: process.env.SCOPE || 'local',

  host: process.env.HOST,
  port: +process.env.PORT,

  jwtSecret: process.env.JWT_SECRET,
  jwtLoginExpiredIn: process.env.JWT_LOGIN_EXPIRED_IN,

  dbConfig: {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV !== 'production',
  },
});
