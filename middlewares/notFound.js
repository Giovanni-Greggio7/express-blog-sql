function notFound(req, res, next) {
    // Questo middleware viene chiamato quando nessuna rotta precedente ha risposto alla richiesta.

    res.status(404)
    // Imposta il codice di stato HTTP a 404 (Risorsa non trovata).

    res.json({
        error: "Not Found",
        message: "Pagina non trovata"
    });
    // Invia al client una risposta JSON con un messaggio di errore 404.
};

module.exports = notFound;
// Esporta la funzione per poterla usare come middleware nella tua app.