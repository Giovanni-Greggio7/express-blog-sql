const connection = require("../data/posts_db")
// Importa la connessione al database (probabilmente MySQL o MariaDB)


function index(req, res) {
    const sql = "SELECT * FROM posts"
    // Query SQL per selezionare tutti i post dalla tabella "posts"

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        // Se c'è un errore nel DB, risponde con errore 500

        res.json(results);
        // Altrimenti restituisce i risultati come JSON
    })
};

//show
function show(req, res) {
    const id = req.params.id
    // Recupera l'ID passato nell'URL

    const sql = "SELECT * FROM posts WHERE id = ?"
    connection.query(sql, [id], (err, results) => {
        err && res.status(500).json({ error: "Database query failed" })
        // Se c'è un errore nel DB, risponde con errore 500

        results.length === 0 && res.status(404).json({ error: "Post not found" })
        // Se il post non esiste, restituisce errore 404

        res.json(results[0]);
        // Altrimenti restituisce il primo (e unico) post trovato
    })
}

//store
function store(req, res) {
    const newId = datas[datas.length - 1].id + 1;
    // Prende l'ultimo ID disponibile e lo incrementa di 1

    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }
    // Crea un nuovo oggetto post usando i dati ricevuti nel body della richiesta

    datas.push(newPost);
    // Aggiunge il nuovo post all'array "datas" (che NON è il database)

    console.log(datas);
    // Stampa il contenuto dell'array per controllo

    res.status(201);
    res.json(newPost);
    // Risponde con status 201 (Creato) e il nuovo post
}

//update
function update(req, res) {
    const id = parseInt(req.params.id)
    // Recupera l'ID dall'URL e lo converte in numero

    const oggettoTrovato = datas.find(post => post.id === id);
    // Cerca il post nell'array "datas"

    if (!oggettoTrovato) {
        res.status(404);
        return res.json({
            error: "Not Found",
            message: "Pizza non trovata"
        })
        // Se il post non esiste, restituisce 404
    }

    // Aggiorna i dati del post trovato
    oggettoTrovato.title = req.body.title;
    oggettoTrovato.image = req.body.image;
    oggettoTrovato.tags = req.body.tags;
    oggettoTrovato.content = req.body.content;

    console.log(datas)
    // Stampa l'array aggiornato per controllo

    res.json(oggettoTrovato);
    // Risponde con il post aggiornato
}

function modify(req, res) {
    res.send("Modifica parziale del post " + req.params.id)
    // Placeholder: risponde con un messaggio statico, non fa nulla per ora
}

// destroy
function destroy(req, res) {
    const {id} = req.params;
    // Recupera l'ID dall'URL

    connection.query("DELETE FROM posts WHERE id = ?", [id], (err) => {
        err && res.status(500).json({ error: "Failed to delete posts" })
        // Se c'è un errore nel DB, risponde con errore 500

        res.sendStatus(204)
        // Risponde con 204 No Content se cancellato correttamente
    })
}

module.exports = { index, show, store, update, modify, destroy }

