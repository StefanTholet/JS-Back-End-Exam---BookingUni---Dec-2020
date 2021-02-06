const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const mongooseConfig = require('./config/mongoose')(app);
const expressConfig = require('./config/express')(app);

const routes = require('./config/routes');

app.use(routes);



app.listen(3000, () => console.log('Server is listening on port 3000'));
