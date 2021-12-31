const { log } = require('./lib/helpers')
const express = require('express')
const app = express()
require('dotenv').config();

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

const mqtt = require('mqtt')
const client  = mqtt.connect(process.env.MQTT_URL || 'mqtt://smartnest.cz', {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  clientId: process.env.MQTT_CLIENT_ID,
})

let isConnected = false;
client.on('connect', function () {
  isConnected = true;
  log('connected');
})

app.get('/', (req, res) => {
  const { topic, message } = { ...{ topic: '', message: '' }, ...req.query, ...req.body }
  log(`topic: ${topic}, message: ${message}`)
  if (isConnected) {
    client.publish(topic, message)
  }
  if (!isConnected) {
    res.status(500).send('Internal server error: not yet connected')
    return
  }
  res.send(`👍`);
})

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
});