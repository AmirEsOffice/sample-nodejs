const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize(process.env.database, process.env.user,process.env.password, {
    host: process.env.host,
    dialect: 'mysql',
  });
 


const getCurrentUsers = (email,callback) => {
    sequelize
    .authenticate()
    .then(async () => {
        console.log('Connection has been established successfully.');
        const results = await sequelize.query(`SELECT * FROM tbl_users where Email = '${email}'`, {
            type: Sequelize.QueryTypes.SELECT,
        });
        const obj = results.map(obj => ({ id:obj.id, firstName: obj.FirstName, email: obj.Email ,avatar:obj.Avatar  }));
        console.log('UserObg',obj[0]);
        callback(null, obj);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })
    .finally(() => {
        
    });
}


const login = (email,callback) => {
    sequelize
    .authenticate()
    .then(async () => {
        console.log('Connection has been established successfully.');
        // const results = await sequelize.query(`SELECT * FROM tbl_users WHERE Email = '${email}'`, {
        //     type: Sequelize.QueryTypes.SELECT,
        // });
         const results = await sequelize.query(`CALL sp_signin (:emailParam)`,  
         {replacements: { emailParam: `${email}`} })

        const obj = results.map(obj => ({ id:obj.id, firstName: obj.FirstName, email: obj.Email ,password : obj.Password ,avatar:obj.Avatar }));
        console.log('results',obj[0] );
        callback(null, obj[0]);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })
    .finally(() => {
        
    });
}

const createUser = (user) => {
    const { firstName, lastName, email, password ,avatar } = user;
    sequelize
        .authenticate()
        .then(async () => {
            console.log('Connection has been established successfully.');
            const results = await sequelize.query(`INSERT INTO tbl_users (FirstName, LastName, Email, Password,Avatar) VALUES ('${firstName}', '${lastName}', '${email}', '${password}' , '${avatar}')`, {
                type: Sequelize.QueryTypes.INSERT,
            });
            console.log('User created successfully');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        })
        .finally(() => {
            
        });
}
const saveRefereshToken = (email,refreshToken) => {
    sequelize
        .authenticate()
        .then(async () => {
            console.log('Connection has been established successfully.');
            const results = await sequelize.query(`UPDATE tbl_users SET RefreshToken = '${refreshToken}' WHERE  Email = '${email}'`, {
                type: Sequelize.QueryTypes.UPDATE,
            });
            console.log('User created successfully');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        })
        .finally(() => {
            
        });
}


module.exports = {
    getCurrentUsers,
    login,
    createUser,
    saveRefereshToken
}