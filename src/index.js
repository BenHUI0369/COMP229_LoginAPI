const express = require('express');
const logger = require("./logger");
const routes = require('./routes');
const connectToDatabase = require("./database");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

app.use('/api', routes);

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.statusCode || 500)
        .send({ error: err.message });
});

async function startServer() {
    await connectToDatabase();

    app.listen(port, () => {
        logger.info(`Server listening at http://localhost:${port}`);
    });
}

module.exports = startServer;