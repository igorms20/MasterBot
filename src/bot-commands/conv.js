require('dotenv').config();
const {API_KEY} = process.env;
const CurrencyConverter = require('../currency-converter');
const cc = new CurrencyConverter(API_KEY);

function conv(message) {
    const msgContent = message.content;        
        try {
            const base = msgContent.split(' ')[1].toUpperCase();
            const target = msgContent.split(' ')[2].toUpperCase();
            const amount = msgContent.split(' ')[3];

            if (!amount) {
                const resp = cc.convertNoAmount(base, target);                  
                return resp.then((value) => {message.reply(value.toFixed(2).toString())});
            } 
                
            const resp = cc.convert(base, target, amount);
            resp.then((value) => {message.reply(value.toFixed(2).toString())});      
    
        } catch (err) {            
            return message.channel.send('Houve algum erro.');
        }
}

module.exports = conv;