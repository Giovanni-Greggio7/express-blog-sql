function errorsHandler(err, req, res, next) {
    // Questa è una funzione middleware per la gestione centralizzata degli errori.
    // Deve avere 4 parametri: (err, req, res, next) per essere riconosciuta da Express.

    res.status(500)
    // Imposta il codice di stato HTTP a 500 (Errore interno del server).

    res.json({
        error: err.message,
    });
    // Invia al client una risposta JSON con il messaggio di errore.
    // 'err.message' contiene la descrizione dell'errore passato.
};

module.exports = errorsHandler;
// Esporta la funzione per poterla usare in altri file (come middleware globale nell'app).