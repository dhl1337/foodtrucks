import Foodtruck from './../models/foodtruck.js';
import config from '../configs/config';

const client = require('twilio')(config.twilio.ACCOUNT_SID, config.twilio.AUTH_TOKEN);

module.exports = {
    sendTextMessage(req, res) {
        client.sendMessage({
            to: '+12282829088',
            from: '+12282224994',
            body: req.body.message
        }, (err, data) => err ? res.status(500).send('failed to send') :  res.json(data))
    }
};