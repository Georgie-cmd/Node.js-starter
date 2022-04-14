const collectAnswers = require('./terminal')  
const http = require('http')


const requestListener = function(req, res) {
    res.writeHead(200)
    res.end('{statusCode: 200, message: "Everything works!!"}')
}

const server = http.createServer(requestListener)



const questions = [                              
    `Which port do you wanna use?\nYour answer: `
]        

collectAnswers(questions, answers => {
    const punctuality = ms => new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    })

    punctuality(500).then(() => console.log(`Server will be started on port: ${answers}`))
    punctuality(1000).then(() => {
        const waitTime = 1500
        const waitInterval = 150
        let currentTime = 0

        const incTime = () => {
            currentTime += waitInterval
            const p = Math.floor((currentTime / waitTime) * 100)
            process.stdout.clearLine()
            process.stdout.cursorTo(0)
            process.stdout.write(`preparing... ${p}%`)
        }

        const timerDone = () => {
            clearInterval(interval)
            process.stdout.clearLine()
            process.stdout.cursorTo(0)
            console.log('\x1b[32m%s\x1b[0m', 'done ✔')
        }

        const interval = setInterval(incTime, waitInterval)
        setTimeout(timerDone, waitTime)
    })

    Promise.all([punctuality(1000), punctuality(3000)])
    .then(() => {
        try{
            console.log('Starting the server...')
            
            //async function for port and connection to database
            const getStarted = async () => {
                try {
                    setTimeout(() => {
                        server.listen(answers || 2020, () => {
                            console.log('\x1b[36m%s\x1b[0m', 'Server has been started on port:', `\x1b[34mhttp://localhost:${answers}\x1b[0m`)
                        })
                    }, 1000)
                } catch(err) {
                    console.log('\x1b[31m%s\x1b[0m', 'Error with connection to database or with server...', err)
                }
            }

            getStarted()
        } catch(err) {
            console.log('\x1b[41m\nUnnkown error, try again...\x1b[0m', err)
            process.exit()
        }
    })
})
