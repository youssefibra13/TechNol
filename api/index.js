const express = require('express');
const cors = require('cors');
const { connect } = require('mongoose');  
require('dotenv').config();
const upload = require('express-fileupload');


const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:5001', 'http://localhost:5174', 'https://socio-tech-journal.onrender.com' ],
  credentials: true
}));
app.use(upload());
app.use('/uploads', express.static(__dirname + '/uploads'));


app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connect(process.env.MONGO_URI).then(app.listen(process.env.PORT || 5000, () => console.log(`Server started on port ${PORT}`))).catch(error => console.log(error));
