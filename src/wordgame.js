const questions = [
    {
        question: "Quem foi o maior físico da história?",
        answer: "albert einstein",
        hint: "Começa com A"
    },
    {
        question: "Onde se encontra a Ilha de Páscoa?",
        answer: "chile",
        hint: "Páis da América do Sul"
    },
    {
        question: "Um dos cursos superiores mais procurados atualmente",
        answer: "direito",
        hint: "Não tem contato com Exatas"
    },
];

const convert = require('./convert.cjs');
convert('BRL', 'USD', 20)   

function wordgameOn(userMsg) {
    let rdIndex = Math.floor(Math.random() * questions.length);
    let chosenQuestion = questions[rdIndex].question;
    userMsg.channel.send(chosenQuestion);
    if (userMsg.content.toLowerCase() === questions[rdIndex].answer) {
        userMsg.reply('Você acertou!')
    }
}


module.exports = questions;