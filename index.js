const express = require('express');
require('dotenv').config();
const cors = require('cors');

const storeRoutes = require('./server/routes/storeRoutes');
const userRoutes = require('./server/routes/userRoutes');
const itemRoutes = require('./server/routes/itemRoutes');

const app = express();
app.use(express.json());

app.use(cors());  

app.use('/store', storeRoutes);
app.use('/user', userRoutes);
app.use('/item', itemRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

