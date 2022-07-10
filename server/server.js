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
const config = {
    database: `AnalyticBrains`,
    server: `localhost`,
    options: {
        trustedConnection: true
    }
};
// app.use(bodyParser.json({ type: `application/json` }));
app.post(`/`, function (req, res) {
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

app.post('/Update', function (req, res) {
    new sql.ConnectionPool(config).connect().then(pool => {
        var request = pool.request();
        request.input('UpdateJson', sql.VarChar(8000), req.body.UpdateJson);
        return request.execute(req.body.SP);
    }).then(result => {
        res.status(200).send(result);
        sql.close();
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: "${err}" })
        sql.close();
    });

});

const server = app.listen(Port, function () {
    console.log(`MySelf Server Running on Port : ${Port}`);
});