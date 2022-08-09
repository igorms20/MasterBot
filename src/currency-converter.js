const {fetch} = require('cross-fetch');

class CurrencyConverter {

    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    // static apiKey = 'f29e5aa09b1ee04165aa846e';

    async convert(base, target, amount) {
        let response, result;
        try {
            // if (amount === undefined) {
            //     response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${base}/${target}`);
            //     result = await response.json();
            //     return result.conversion_rate;
            // }
            response = await fetch(`https://v6.exchangerate-api.com/v6/${this.apiKey}/pair/${base}/${target}/${amount}`);
            result = await response.json();
            
            return result.conversion_result;
    
        } catch (error) {
            console.log(error);
            return 'Ocorreu algum erro.'
        }
    }
    
    async convertNoAmount(base, target) {
        let response, result;
        try {
            response = await fetch(`https://v6.exchangerate-api.com/v6/${this.apiKey}/pair/${base}/${target}`);
            result = await response.json();
            
            return result.conversion_rate;
    
        } catch (error) {
            console.log(error);
            return 'Ocorreu algum erro.'
        }
    }
    
}

module.exports = CurrencyConverter;