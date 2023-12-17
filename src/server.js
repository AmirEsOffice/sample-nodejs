const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const postCardsRoutes = require('./routes/postCards');
const categoryRoutes = require('./routes/category');

const app = express();

 
app.use(cors('*'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


app.use('/api/user', userRoutes);
app.use('/api/post/crud', postCardsRoutes);
app.use('/api/category', categoryRoutes);



const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 