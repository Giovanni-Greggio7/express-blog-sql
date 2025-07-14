const express = require('express')  
// Importa Express per usare il Router.

const router = express.Router()  
// Crea un'istanza del Router di Express per gestire le rotte.

const { index, show, store, update, modify, destroy } = require("../controllers/controllore")  
// Importa le funzioni controller che gestiscono la logica delle varie rotte.

// Rotte CRUD (Create, Read, Update, Delete)

// index — Recupera tutti gli elementi
router.get("/", index)  
// Quando arriva una GET su "/api/posts/", chiama la funzione index.

// show — Recupera un singolo elemento tramite ID
router.get("/:id", show)  
// Quando arriva una GET su "/api/posts/:id", chiama la funzione show.

// store — Crea un nuovo elemento
router.post("/", store)  
// Quando arriva una POST su "/api/posts/", chiama la funzione store.

// update — Aggiorna un intero elemento (dati completi)
router.put("/:id", update)  
// Quando arriva una PUT su "/api/posts/:id", chiama la funzione update.

// modify — Modifica parziale di un elemento
router.patch("/:id", modify)  
// Quando arriva una PATCH su "/api/posts/:id", chiama la funzione modify.

// destroy — Cancella un elemento
router.delete("/:id", destroy)  
// Quando arriva una DELETE su "/api/posts/:id", chiama la funzione destroy.

module.exports = router  
// Esporta il router per poterlo usare nel file principale dell'app (server).