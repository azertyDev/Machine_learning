const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const hbs = require('express-handlebars');
const Handlebars = require('handlebars');
const paginate = require('handlebars-paginate');


Handlebars.registerHelper('paginate', paginate);

// Wine router
const wineRouter = require('./routes/wine');
// Iris router
const irisRouter = require('./routes/iris');

app.use('/wine', wineRouter);
app.use('/iris', irisRouter);


app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');

app.listen(port, () => {
    console.log(`Datasets app listening on port ${port}!`);
});
