const { createServer } = require('http')
const app = require('./app')
const server = createServer(app);
server.listen(5000, () => {
    console.log("Nodejs Scrapper Server is listening...")
})