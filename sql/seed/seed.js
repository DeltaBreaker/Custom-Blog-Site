const sequelize = require('../connect.js');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    process.exit(0);
};

seedAll();