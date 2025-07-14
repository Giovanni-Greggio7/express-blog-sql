const express = require("express")  
// Importa il modulo Express, un framework per creare server HTTP.

const app = express()  
// Crea un'applicazione Express.

const port = 3000  
// Imposta la porta su cui il server ascolterà.

const postRouter = require("./routers/post")  
// Importa il router per gestire le rotte relative ai "post".

// middlewares
const cors = require('cors')  
// Importa il middleware CORS, che permette le richieste da domini diversi.

const errorsHandler = require("./middlewares/errorsHandler")  
// Importa il middleware personalizzato per la gestione degli errori.

const notFound = require("./middlewares/notFound")  
// Importa il middleware personalizzato per gestire le rotte non trovate (404).

app.use(express.json())  
// Middleware di Express che permette di leggere JSON nel body delle richieste.

app.use(express.static('public'))  
// Middleware per servire file statici dalla cartella 'public' (es. immagini, CSS, JS).

app.use("/api/posts", postRouter)  
// Usa il router importato per tutte le richieste che iniziano con "/api/posts".

app.use(notFound)  
// Middleware che cattura le richieste su rotte non definite (dopo tutti i router).

app.use(errorsHandler)  
// Middleware finale che gestisce eventuali errori emersi nelle rotte o nei middleware precedenti.

app.listen(port, () => {
    console.log(`La mia porta è http://localhost:${port}/api/posts`)
})
// Avvia il server in ascolto sulla porta specificata e stampa un messaggio di conferma.
