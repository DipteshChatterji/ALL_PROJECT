import { Sequelize } from "sequelize";
 
const db = new Sequelize('user_flow_database', 'root', 'February@99', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;