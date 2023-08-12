const express = require('express');
const app = express();
require('dotenv').config()
require('./database/database')
const authRoutes = require('./routes/auth/users');
const categoryRoutes = require('./routes/category/category');
const productRoutes = require('./routes/product/product')

app.use(express.json());

/* Routes calling */
app.use('/auth',authRoutes);
app.use('/category',categoryRoutes);
app.use('/product',productRoutes);

const port = process.env.PORT || 4500;
app.listen(port, (req, res) => {
    console.log(`INFO  Server running on  [http://localhost:${port}]`);
    console.log("\x1b[33m%s\x1b[0m", "Press Ctrl+C to stop the server")
})
