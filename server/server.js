const express = require(`express`);
const sql = require(`mssql/msnodesqlv8`);
const app = express();
const cors = require(`cors`);
var bodyParser = require(`body-parser`);
const Port = 3001;

app.use(cors({
    origin: `*`,
    credentials: true
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({ limit: `50mb` }));
// app.use(bodyParser.json({ type: `application/json` }));
app.post(`/`, function (req, res) {
    //user: `abuser`,
    //password: `abuser10`,
    //server: `Analytic10`,
    const config = {
        database: `AnalyticBrains`,
        server: `localhost`,
        options: {
            trustedConnection: true
        }
    };
    console.log(req.body.query);
    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query(req.body.query)
    }).then(result => {
        res.send(result[`recordsets`]);
        sql.close();
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: `${err}` })
        sql.close();
    });
});

const server = app.listen(Port, function () {
    console.log(`MySelf Server Running on Port : ${Port}`);
});