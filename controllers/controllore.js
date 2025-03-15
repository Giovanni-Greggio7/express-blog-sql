const posts = require('../data/array')

function index (req, res) {

    //Inizialmente, il menu filtrato corrisponde a quello originale
    let filteredPosts = posts;

    //Se la richiesta contiene un filtro, allora filtriamo l'array
    //Filtriamo per "id"
    // if (req.query.id) {
    //     const postId = parseInt(req.query.id); 
    //     filteredPosts = posts.find(
    //         post => post.id === postId
    //     );
    // }

     //Filtriamo per "tags"
    if (req.query.tags) {
        filteredPosts = posts.filter(
            post => post.tags.includes(req.query.tags)
        );
    } 
    res.json(filteredPosts)
};
// show
function show (req, res) {

    //Rendiamo "id" inserito dall'utente un numero intero invece che una stringa per poterlo trovare
    const postId = parseInt(req.params.id); 

    //Usiamo il ".find" per trovare il singolo id nell'array "posts" con un arrow function
    const post = posts.find(element => element.id === postId);

    //Facciamo il controllo se l'id é presente
    if (!post){

        //Impostaimo lo status 404
        res.status(404)

        //Restituiamo il json con altre informazioni
        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    //Restituisce il singolo post con l'id inserito in formato json
    res.json(post); 
  };

// store
function store (req, res) {

    const newId = posts[posts.length - 1].id + 1;

    // Creiamo un nuovo oggetto pizza
    const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    ingredients: req.body.tags
    }

    // Aggiungiamo la nuova pizza al menu
    posts.push(newPost);

    // controlliamo
    console.log(posts);

    // Restituiamo lo status corretto e la pizza appena creata
    res.status(201);
    res.json(newPost);;
    };

// update
function update (req, res) {

    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // cerchiamo il pizza tramite id
    const post = posts.find(post => post.id === id);

    // Piccolo controllo
    if (!post) {
      res.status(404);
      return res.json({
      error: "Not Found",
      message: "Post non trovato"
      });
    }

    // Aggiorniamo la pizza
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

   // Controlliamo il menu
   console.log(posts)

   // Restituiamo la pizza appena aggiornata
   res.json(post);
    
};

// modify
function modify (req, res) {
    res.send('Modifica parziale del post ' + req.params.id);
};
// destroy
function destroy (req, res) {
        //Rendiamo "id" inserito dall'utente un numero intero invece che una stringa per poterlo trovare
        const postId = parseInt(req.params.id); 

        //Usiamo il ".find" per trovare il singolo id nell'array "posts" con un arrow function
        const post = posts.find(element => element.id === postId);
    
        //Facciamo il controllo se l'id é presente
        if (!post){
    
            //Impostaimo lo status 404
            res.status(404)
    
            //Restituiamo il json con altre informazioni
            return res.json({
                error: "Not Found",
                message: "Post non trovata"
            })
        }
    
        //Rimuove il singolo post con l'id inserito
        posts.splice(posts.indexOf(post), 1); 

        //Verifichiamo la presenza dell'elemento cancellato
        console.log(posts)

        //Restituiamo lo status corretto
        res.sendStatus(204)
      };


module.exports = { index, show, store, update, modify, destroy }