import { sendTextMessage } from './TwilioController';

module.exports = (app) => {
    app.post('/api/twilio', sendTextMessage);
};