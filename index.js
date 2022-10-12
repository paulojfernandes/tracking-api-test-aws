const AWS = require('aws-sdk')
require('dotenv').config()
var port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure AWS SDK with the credentials created before
// You should probably use a .env file for this
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// The stream name for the data stream we created
const KINESIS_STREAM_NAME = 'tracking-data-daredata'

// The stream name for the data stream we created
const KINESIS_STREAM_NAME_TRACK = 'tracking-data-daredata-track'

// The stream name for the data stream we created
const KINESIS_STREAM_NAME_PROFILE = 'tracking-data-daredata-profile'


// Create a kinesis client
const kinesisClient = new AWS.Kinesis()

router.post("/track", (request, response) => {
    //code to perform particular action.
    //To access GET variable use req.query() and req.params() methods.

    // Call the putRecord to send the data to the stream

    body = request.body
    kinesisClient.putRecord(
        {
            Data: JSON.stringify(body),
            StreamName: KINESIS_STREAM_NAME_TRACK,
            PartitionKey: '1'
        },
        (err, data) => {
            if (err) {
                throw err
            }
            response.send(data)
        }
    )

});

router.post("/profile", (request, response) => {
    //code to perform particular action.
    //To access GET variable use req.query() and req.params() methods.

    body = request.body
    // Call the putRecord to send the data to the stream
    kinesisClient.putRecord(
        {
            Data: JSON.stringify(body),
            StreamName: KINESIS_STREAM_NAME_PROFILE,
            PartitionKey: '1'
        },
        (err, data) => {
            if (err) {
                throw err
            }
            response.send(data)
        }
    )
});

router.post("/alias", (request, response) => {
    //code to perform particular action.
    //To access GET variable use req.query() and req.params() methods.
    body = request.body
    // Call the putRecord to send the data to the stream
    kinesisClient.putRecord(
        {
            Data: JSON.stringify(body),
            StreamName: KINESIS_STREAM_NAME,
            PartitionKey: '1'
        },
        (err, data) => {
            if (err) {
                throw err
            }
            response.send(data)
        }
    )


});


// add router in the Express app.
app.use("/", router);


app.listen(port, () => {
    console.log(`Started on PORT ${port}`);
})
