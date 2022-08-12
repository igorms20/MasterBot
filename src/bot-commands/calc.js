
function calc(message) {
    const fullMsg = message.content;
    const expression = fullMsg.split(' ')[1];        

    try {
        const result = eval(expression);
        if (!expression || !result) {
            return message.channel.send('Expressão inválida.');
        }
        message.reply(`Resultado: ${result}`);    
    } catch (err) {            
        return message.channel.send('Houve algum erro.');;
    }
}

module.exports = calc;