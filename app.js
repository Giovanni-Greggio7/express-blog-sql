const express = require("express")
const app = express()
const port = 3000
const postRouter = require("./routers/post")
//middLewares
const errorsHandler = require("./middlewares/errorsHandler")
const notFound = require("./middlewares/notFound")


app.use(express.json()) // body parse

app.use(express.static('public')); // per file statici

app.use("/api/posts", postRouter) //richiamare le API 

app.use(notFound) // erorri nelle rotte 
app.use(errorsHandler) // i possibili errori dell'applicazione.

app.listen(port, () => {
    console.log(`La mia porta è http://localhost:${port}/api/posts`)
})
