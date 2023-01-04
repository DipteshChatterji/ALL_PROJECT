module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "February@99",
    DB: "user_flow_database",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };