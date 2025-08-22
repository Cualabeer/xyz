const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const tableRoutes = require('./routes/tableRoutes');
const usersRoutes = require('./routes/usersRoutes');
const customersRoutes = require('./routes/customersRoutes');
const garageRoutes = require('./routes/garageRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/tables', tableRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/garage', garageRoutes);

app.listen(process.env.PORT || 3000, () => console.log('Server running'));