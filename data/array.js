// Esercizio
// Milestone 1
// Per iniziare, andiamo su Postman e prepariamo una nuova chiamata verso la nostra rotta store.
// Impostiamo il verbo e l’endpoint corretti
// Selezioniamo il tab body e scegliamo il formato raw e JSON
// Inseriamo come corpo della nostra request un oggetto che rappresenti un nuovo post
// Nota: se vogliamo avere delle immagini, inventiamole pure.
// Nota: ricordiamo che non bisogna passare l’id quando si crea una nuova risorsa: sarà il server (con l’aiuto del database) a fornirlo.
// Milestone 2
// Impostiamo il body-parser per far sì che la nostra app riesca a decifrare il request body.
// Poi, all’interno della rotta Store, stampiamo nel terminale i dati in arrivo, grazie a un console.log
// Milestone 3
// Implementiamo quindi la logica per aggiungere un nuovo post al nostro blog, e prepariamo la risposta adeguata.
// Testiamolo con postman.
// Milestone 4
// Ripetiamo il procedimento per la rotta di Update, in modo da avere la possibilità di modificare le nostre risorse.
// Bonus
// Quelli del giorno prima, se non già fatti
// In Update, controllare se il parametro si riferisce ad un post esistente, in caso contrario, rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON.
// Buon Lavoro e buon divertimento

const posts = [
    {
      id: 1,
      title: "Ciambellone",
      content:
        "Sarà che una volta le cose erano più semplici, ma erano anche molto buone. Come le crostate, i biscotti o il ciambellone che la nonna preparava anche all'ultimo sapendo che sareste passati per la merenda: uova, zucchero e farina. Niente di più basic ma che tra le sue mani, mescolando e infornando, diventava una delle prelibatezze per accompagnare il succo di frutta al pomeriggio o il latte e caffè al mattino. Ecco la nostra ricetta del ciambellone a quale atmosfera si ispira, quella di casa e genuinità: con una manciata di scorze di limone o di arancia e una spolverata di zucchero a velo renderete questa soffice delizia profumata e invitante. E per una volta sarà la nonna a farvi i complimenti per aver preparato un morbido ciambellone, così buono che non passa mai di moda!",
      image: "http://localhost:3000/images/ciambellone.jpeg",
      tags: ["Dolci", "Torte", "Ricette vegetariane", "Ricette al forno"],
    },
    {
      id: 2,
      title: "Cracker alla barbabietola",
      content: `I cracker alla barbabietola sono uno snack stuzzicante e originale da preparare in casa utilizzando ingredienti semplici e genuini. Queste sfogliette dal colore brillante non passeranno inosservate nel vostro cestino del pane e arricchiranno la tavola con il loro gusto unico e accattivante. I cracker fatti a mano sono anche un gustoso snack spezza fame, da portare in ufficio o a scuola. Venite a scoprire il nostro mix di semi e cereali per realizzare l'impasto e divertitevi a sperimentare nuove ricette di cracker variando i semi, le farine e le spezie per gusti sempre nuovi, ecco qualche idea:
                Cracker di farro
                Cracker di lupini
                Cracker allo zafferano
                Cracker ai semi`,
      image: "http://localhost:3000/images/cracker_barbabietola.jpeg", 
      tags: ["Antipasti", "Ricette vegetariane", "Ricette al forno"],
    },
    {
      id: 3,
      title: "Pasta barbabietola e gorgonzola",
      content: `La nostra ricetta della pasta barbabietola e gorgonzola vuole ricreare in questo primo piatto un abbinamento appetitoso, già proposto con la torta salata alla barbabietola! Per un pranzo veloce ma gustoso, per chi ama giocare con consistenze e colori naturali in cucina, questa pasta è perfetta! La dolcezza della barbabietola smorza il gusto deciso che caratterizza questo formaggio erborinato molto amato, un'abbinata vincente e molto gustosa. Provate un nuovo condimento per la vostra pasta e sperimentate altre sfiziose varianti:
              Pasta con barbabietola e pecorino
              Gnocchi di barbabietola
              Tagliatelle alla barbabietola con asparagi`,
      image: "http://localhost:3000/images/pasta_barbabietola.jpeg",
      tags: ["Primi piatti", "Ricette vegetariane"],
    },
    {
      id: 4,
      title: "Pane fritto dolce",
      content: `Il pane fritto dolce è la versione più antica dell'odierno french toast! Una deliziosa ricetta antispreco che le nonne preparavano ai bambini per merenda, utilizzando gli ingredienti che si avevano sempre a disposizione in casa: pane raffermo, uova, latte e zucchero, che noi abbiamo deciso di aromatizzare con un pizzico di cannella. Facile e veloce da realizzare, il pane fritto dolce vi riporterà con la mente ai sapori dell'infanzia… gustatelo da solo o accompagnatelo con frutta fresca e yogurt per uno spuntino tanto goloso quanto genuino!`,
      image: "http://localhost:3000/images/pane_fritto_dolce.jpeg",
      tags: ["Dolci", "Dolci veloci", "Ricette veloci", "Ricette vegetariane"],
    },
    {
      id: 5,
      title: "Torta paesana",
      content: `La torta paesana è un dolce di origine lombarda e precisamente della Brianza, la zona compresa tra la provincia a nord di Milano e il lago di Lecco-Como. E' un dolce di origine contadina, dalle infinite varianti, ma realizzata principalmente con pane raffermo bagnato nel latte. E' infatti conosciuta anche come torta di pane o, in dialetto locale, “michelacc” ovvero mica e lac (pane e latte). A seconda dei gusti e delle disponibilità del momento, al pane ammollato ogni famiglia univa ingredienti diversi, chi l'uvetta o chi i pinoli ad esempio. Noi vi presentiamo la nostra versione con l'aggiunta di cacao e amaretti: perfetta da gustare per una merenda dal sapore rustico, la torta paesana è un perfetto dolce di recupero quando si ha del pane avanzato… ed è ancora più buona il giorno dopo!`,
      image: "http://localhost:3000/images/torta_paesana.jpeg",
      tags: ["Dolci", "Dolci al cioccolato", "Torte", "Ricette vegetariane", "Ricette al forno"],
    },
    // {
    //   id: 6,
    //   title: "Muffin al cioccolato fondente",
    //   content: `I muffin al cioccolato fondente sono piccoli dolcetti soffici e golosi, perfetti per una colazione energica o una merenda dolce. Preparati con cioccolato di qualità, hanno un cuore morbido e un profumo irresistibile. Facili da personalizzare con frutta secca o un pizzico di cannella, sono l’ideale per chi ama i dolci semplici ma intensi.`,
    //   image: "muffin-cioccolato-soffici-.webp",
    //   tags: ["Dolci", "Colazione", "Merenda"]
    // }
  ];

  console.log(posts)
  
module.exports = posts