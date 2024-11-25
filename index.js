const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const productRoutes = require('./routes/product-routes')
const categoryRoutes = require('./routes/category-routes')
const orderRoutes = require('./routes/order-routes')
const dashboardRoutes = require('./routes/dashboard-routes')
const reportRoutes = require('./routes/report-routes')

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api', productRoutes.routes);
app.use('/api', categoryRoutes.routes);
app.use('/api', orderRoutes.routes);
app.use('/api', dashboardRoutes.routes);
app.use('/api', reportRoutes.routes);

app.listen(config.port, () => console.log(`App is listening on url http://localhost:${config.port}`));