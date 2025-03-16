const connection = require("../data/posts_db")


function index(req, res) {
    /*
    //faccio coincidere filteredPosts con l'array iniziale
    let objfilter = datas;
    // Pi()
    // Se la richiesta contiene un filtro(req.query.tag = true/false => booleano), allora filtriamo i post
    if (req.query.tags) {
        objfilter = datas.filter(post => post.tags.includes(req.query.tags));
    }

    // restituisco l'array filteredPosts, filtrato o meno!
    res.json(objfilter);*/

    const sql = "SELECT * FROM posts"

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        res.json(results);
    })
};

//show
function show(req, res) {

    // let id = parseInt(req.params.id)

    // const oggettoSingolo = datas.find((element) => element.id === id)

    // // Facciamo il controllo
    // if (!oggettoSingolo) {

    //     res.status(404);

    //     return res.json({
    //         status: 404,
    //         error: "Not Found",
    //         message: "Pizza non trovata"
    //     })
    // }

    // res.json(oggettoSingolo)

    const id = req.params.id

    const sql = "SELECT * FROM posts WHERE id = ?"
    connection.query(sql, [id], (err, results) => {
        err && res.status(500).json({ error: "Database query failed" })
        results.length === 0 && res.status(404).json({ error: "Post not found" })
        res.json(results[0]);
    })
}

//store
function store(req, res) {
    // Creiamo un nuovo id incrementando l'ultimo id presente
    //ultimo oggetto di un array: arrayPizzas[arrayPizzas.length - 1]
    //estraggo all'oggetto il valore della chiave "id"
    //ottenuto il valore dell'ultimo ID aggiungo + 1
    const newId = datas[datas.length - 1].id + 1;

    // Creiamo un nuovo oggetto pizza
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    // Aggiungiamo la nuova pizza al arrayPizzas
    datas.push(newPost);

    // controlliamo
    console.log(datas);


    // Restituiamo lo status corretto e il post appena creata
    res.status(201);
    res.json(newPost);
}

//update
function update(req, res) {
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // cerchiamo il post tramite id
    const oggettoTrovato = datas.find(post => post.id === id);

    // Piccolo controllo
    if (!oggettoTrovato) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Pizza non trovata"
        })
    }

    // Aggiorniamo il post
    oggettoTrovato.title = req.body.title;
    oggettoTrovato.image = req.body.image;
    oggettoTrovato.tags = req.body.tags;
    oggettoTrovato.content = req.body.content;

    // Controlliamo il arrayDatas
    console.log(datas)

    // Restituiamo il post appena aggiornata
    res.json(oggettoTrovato);
}

// modify
function modify(req, res) {
    res.send("Modifica parziale del post " + req.params.id)
}

// destroy
function destroy(req, res) {

    // const oggettoSingolo = datas.find((element) => element.id === parseInt(req.params.id))

    // //controllo
    // if (!oggettoSingolo) {

    //     res.status(404);

    //     return res.json({
    //         status: 404,
    //         error: "Not Found",
    //         message: "Post non trovato"
    //     })
    // }



    // //Rimuoviamo il post
    // datas.splice(datas.indexOf(oggettoSingolo), 1)

    // console.log(datas)
    // //Restituiamo lo stato corretto
    // res.sendStatus(204)

    const {id} = req.params;

    connection.query("DELETE FROM posts WHERE id = ?", [id], (err) => {
        err && res.status(500).json({ error: "Failed to delete posts" })
        res.sendStatus(204)
    })
}

module.exports = { index, show, store, update, modify, destroy }

