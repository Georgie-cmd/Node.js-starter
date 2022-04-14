const readline = require('readline')


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

module.exports = (questions, done = an => an) => {
    let answers
    const [question1] = questions

    const questionAnswered = answer => {
        if(isNaN(answer)) {
            throw new Error('\x1b[41mPort must include only numbers...\x1b[0m')
        } else if(answer.length !== 4) {
            throw new Error('\x1b[41mPort must contain at least 4 numbers...\x1b[0m')
        } else {
            answers = answer
        }

        if(answers.length < questions.length) {
            rl.question(questions[answers.length], questionAnswered)
        } else {
            done(answers)
        }
    }

    rl.question(question1, questionAnswered)
}
