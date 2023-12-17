const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize(process.env.database, process.env.user,process.env.password, {
    host: process.env.host,
    dialect: 'mysql',
  });
 

  const getAllPostCards = (callback) => {
    sequelize
        .authenticate()
        .then(async () => {
            console.log('Connection has been established successfully.');
            const results = await sequelize.query('SELECT tbl_postCards.*,Title FROM tbl_postCards INNER JOIN tbl_categories ON tbl_postCards.categoryId = tbl_categories.Id order by tbl_categories.Id', {
                type: Sequelize.QueryTypes.SELECT,
            });
            const obj = results.map(post => ({ id: post.id, name: post.Name, description: post.Description, title: post.Title,image:post.Image }));
            callback(null, obj);
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        })
        .finally(() => {
            
        });
}

const createPostCard = (postCard) => {
    const { name, description, category, image } = postCard;
 
    sequelize
        .authenticate()
        .then(async () => {
            console.log('imageData',image);
            console.log('Connection has been established successfully.');
    
                const results = await sequelize.query(`INSERT INTO tbl_postCards (Name, Description, CategoryId,image) VALUES ('${name}', '${description}', '${category}', '${image}');`, {
                type: Sequelize.QueryTypes.INSERT,
            });
            console.log('PostCard created successfully');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        })
        .finally(() => {
            
        });
}

const getPostCardById = (id,  callback) => {
    sequelize
        .authenticate()
        .then(async () => {
            console.log('Connection has been established successfully.');
            const results = await sequelize.query( `SELECT tbl_postCards.*,Title FROM tbl_postCards INNER JOIN tbl_categories ON tbl_postCards.categoryId = tbl_categories.Id WHERE tbl_postCards.Id = ${id}`, {
                type: Sequelize.QueryTypes.SELECT,
            });
            const obj = results.map(post => ({ id: post.id, name: post.Name, description: post.Description, title: post.Title 
            ,category : post.CategoryId , image:post.Image}));
            callback(null, obj[0]);
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        })
        .finally(() => {
            
        });
}


const updatePostCardById = (id, updatedPostCard) => {
    const { name, description, category, image } = updatedPostCard;
    sequelize
        .authenticate()
        .then(async () => {
            console.log('Connection has been established successfully.');
            const results = await sequelize.query( `UPDATE tbl_postCards SET Name = '${name}', Description = '${description}' , CategoryId='${category}' , Image='${image}' WHERE Id = ${id}`, {
                type: Sequelize.QueryTypes.UPDATE,
            });
            console.log('UpdateCard created successfully');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        })
        .finally(() => {
            
        });
};

const deletePostCardById = (id ) => {
    sequelize
        .authenticate()
        .then(async () => {
            console.log('Connection has been established successfully.');
            const results = await sequelize.query( `DELETE FROM tbl_postCards SET WHERE Id = ${id}`, {
                type: Sequelize.QueryTypes.DELETE,
            });
            console.log('UpdateCard created successfully');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        })
        .finally(() => {
            
        });
};


module.exports = {
    getAllPostCards,
    createPostCard,
    getPostCardById,
    updatePostCardById,
    deletePostCardById
}