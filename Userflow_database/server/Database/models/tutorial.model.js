module.exports = (sequelize, Sequelize) => {
    const ShopingStore = sequelize.define("items", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
      },
      Firstname: {
        type: Sequelize.STRING
      },
      Lastname: {
        type: Sequelize.STRING
      },
      dob:{
        type:Sequelize.STRING
      },
      email:{
        type:Sequelize.STRING
      },
      password:{
        type:Sequelize.STRING
      },
      address:{
        type:Sequelize.STRING
      },
      
    });
  
    return ShopingStore;
  };