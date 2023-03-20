import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Post from './Post';

import App from './App';




function storePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
}



ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('titre_form')
);



//on créé un tableau de post pour stocker les posts et en utilisant le local storage
var posts = [];


//on instancie l'objet post si on clique sur le bouton submit
document.getElementById('formulaire').addEventListener('submit', function (e) {
    e.preventDefault();


    //on appel les valeurs du formulaire

    var titre = document.getElementById('titre').value;
    var description = document.getElementById('description').value;

    //on récupère les posts du local storage
    var test = JSON.parse(localStorage.getItem('posts'));

    //on recupére le titre et la description des posts du local storage
    //var titre_test = test.titre;
    //var description_test = test.description;

    //On récupère le titre et la description du post du local storage
    var titre_test = test[0].titre;
    var description_test = test[0].description;
    

    //on instancie l'objet post avec titre et description ou titre_test et description_test
    var post = new Post(titre, description);
    
    //on instancie l'objet post avec titre et description ou titre_test et description_test
    
    var old_post = new Post(titre_test, description_test);

    console.log(old_post);



    // Ajouter la colonne appropriée au post en fonction de son état
    if (post.state === "a_faire") {
        post.column = "a_faire";
    }
    else if (post.state === "en_cours") {
        post.column = "en_cours";
    }
    else if (post.state === "fini") {
        post.column = "fini";
    }
    console.log(post.state);
    if(old_post.state === "a_faire"){
        old_post.column = "a_faire";
    }
    else if(old_post.state === "en_cours"){
        old_post.column = "en_cours";
    }
    else if(old_post.state === "fini"){
        old_post.column = "fini";
    }


    posts.push(post);
    posts.push(old_post);



    // Mettre à jour le tableau avec le nouveau post et le stocker dans le local storage
    ReactDOM.render(
        <Tableau posts={posts} />,
        document.getElementById('tab')
    );
    //on stocke les posts dans le local storage
    storePosts();


    // Réinitialiser les champs du formulaire
    document.getElementById('titre').value = "";
    document.getElementById('description').value = "";



    // on supprime le message d'erreur
    document.getElementById('error_tableau').innerHTML = "";

    //on met à jour le compteur de tache
    
    ReactDOM.render(
        <Compteur />,
        document.getElementById('compteur')
    );


});







/// on créé le tableau avec la pop up associée au tache ///////////////////////////////

function Tableau(props) {

    const [selectedPost, setSelectedPost] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    if (!props.posts) {
        return null;
    }


    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

    const Popup = (post) => {
        setSelectedPost(post);
        setShowPopup(true);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        //on appel les valeurs du formulaire
        var a_faire = document.getElementById('a_faire').checked;
        var en_cours = document.getElementById('en_cours').checked;
        var fini = document.getElementById('fini').checked;
        var supprimer = document.getElementById('supprimer').checked;

        // trouver l'index du post sélectionné dans props.posts
        const index = props.posts.findIndex(post => post.getTitre() === selectedPost.getTitre());

        // mettre à jour la colonne du post sélectionné uniquement
        if (a_faire) {
            selectedPost.setState("a_faire");
            console.log(selectedPost.state);

            props.posts[index].column = "a_faire";
        } else if (en_cours) {
            selectedPost.setState("en_cours");
            console.log(selectedPost.state);

            props.posts[index].column = "en_cours";
        } else if (fini) {
            selectedPost.setState("fini");
            console.log(selectedPost.state);

            props.posts[index].column = "fini";
        }
         else if (supprimer) {
            props.posts.splice(index, 1);
        }
        


        // mettre à jour le tableau
        ReactDOM.render(
            <Tableau posts={posts} />,
            document.getElementById('tab')
        );
        // mettre à jour le compteur de tache
        ReactDOM.render(
            <Compteur />,
            document.getElementById('compteur')
        );
    }


    return (
        <table id="tableau" >
            <thead>
                <tr>
                    <th>a_faire</th>
                    <th>En cours</th>
                    <th>Fini</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {props.posts.map((post) => {
                            if (post.column === "a_faire") {
                                return (
                                    <div>
                                        ⚪
                                        <span onClick={() => Popup(post)}>{post.getTitre()}</span>
                                    </div>
                                );
                            }
                        })}

                    </td>
                    <td>
                        {props.posts.map((post) => {
                            if (post.column === "en_cours") {
                                return (
                                    <div>
                                        ⚪
                                        <span onClick={() => Popup(post)}>{post.getTitre()}</span>
                                    </div>
                                );
                            }
                        })}
                    </td>
                    <td>
                        {props.posts.map((post) => {
                            if (post.column === "fini") {
                                return (
                                    <div>
                                        ⚪
                                        <span onClick={() => Popup(post)}>{post.getTitre()}</span>
                                    </div>
                                );
                            }
                        })}
                    </td>
                </tr>
            </tbody>

            {showPopup && selectedPost &&
                <div className="popup">
                    <div className="popup-inner">
                        <h2>{selectedPost.getTitre()}</h2>
                        <h3><mark>La Description :</mark> </h3>
                        <p>{selectedPost.getDescription()}</p>
                        <h3><mark>L'etat: </mark></h3>
                        <p>{selectedPost.getState()}</p>
                        <form id='formulaire_pop' class='formulaire_pop' onSubmit={handleSubmit}>

                            <label>A Faire :</label><br />
                            <input type="radio" id="a_faire" name="etat" value="a_faire" />
                            <label>En cours :</label><br />
                            <input type="radio" id="en_cours" name="etat" value="en_cours" />
                            <label>Fini :</label><br />
                            <input type="radio" id="fini" name="etat" value="fini" />
                            <br>
                            </br>
                            <label>Supprimer :</label><br />
                            <input type="radio" name="etat" id="supprimer" value="supprimer" />



                            <input type="submit" value="Submit" />
                        </form>

                        <br>
                        </br>
                        <br>
                        </br>
                        <button onClick={togglePopup} class="close_button">Fermer la Fenêtre </button>
                    </div>
                </div>
            }
        </table>




    );



}

const tableau = document.getElementById('tableau');

if (tableau == null) {
    document.getElementById('error_tableau').innerHTML = "Aucun tache n'a été crée";
}


ReactDOM.render(
    <Tableau />,
    document.getElementById('tab')
);

/////////////////////////////////////////////////////////////

//on crée une barrre de recherche
function Search() {

    //on retourne une barre de recherche
    return (
        <div>
            <h2>🔎 Veuillez Entrée Votre recherche:</h2>
            <form id='form_recherche'>
                <input type="text" id="search" placeholder="Rechercher" class='barre_de_recherche' />
                <input type="submit" value="Rechercher" class='bouton_recherche' id='bouton_recherche' />
            </form>
        </div>
    );
}

function Result() {

    return (
        <div class='resultat_recherche'>
            <h3>Titre: </h3>
            <p id='title'></p>
            <br></br>
            <h3>L'etat: </h3>
            <p id='etat'></p>
            <br></br>
            <h3>La Description : </h3>
            <p id='descrip'></p>
        </div>

    );

}


ReactDOM.render(
    <Search />,
    document.getElementById('barre_de_recherche')
);


document.getElementById('form_recherche').addEventListener('submit', function (e) {
    e.preventDefault();
    

    document.getElementById('error_resultat').innerHTML = " Pas de tache";
    
    
    if(document.getElementById('title') != null){
    document.getElementById('title').innerHTML = " ";
    }
    if(document.getElementById('etat') != null){
    document.getElementById('etat').innerHTML = " ";
    }
    if(document.getElementById('descrip') != null){
    document.getElementById('descrip').innerHTML = " ";
    }


    //on récupère la valeur de la barre de recherche
    var search = document.getElementById('search').value;

    //je recherche dans le tableau si la valeur de la barre de recherche est dans le titre d'un post
    for (var i = 0; i < posts.length; i++) {

        if (posts[i].getTitre() === search) {
            ReactDOM.render(
                <Result />,
                document.getElementById('resultat')
            );
            document.getElementById('title').innerHTML = posts[i].getTitre();
            document.getElementById('etat').innerHTML = posts[i].getState();
            document.getElementById('descrip').innerHTML = posts[i].getDescription();
        }
        else {
            document.getElementById('error_resultat').innerHTML = "Aucun résultat trouvé pour votre recherche";     
        }

    }

});

function Compteur() {
    return (

        <div id="compteur">
            <h2>📈 Statistique:</h2>
            <h3>Nombre de tache : {posts.filter(post => post.column === "a_faire").length + posts.filter(post => post.column === "en_cours").length} /{posts.filter(post => post.column === "a_faire").length + posts.filter(post => post.column === "en_cours").length + posts.filter(post => post.column === "fini").length} total</h3>
            <h3>Nombre de tache à faire : {posts.filter(post => post.column === "a_faire").length}</h3>
            <h3>Nombre de tache en cours : {posts.filter(post => post.column === "en_cours").length}</h3>
            <h3>Nombre de tache fini : {posts.filter(post => post.column === "fini").length}</h3>
        </div>
    );
}

ReactDOM.render(
    <Compteur />,
    document.getElementById('compteur')
);

/*var tasks = [{"title":"1.Idée","isChecked":true},{"title":"2.Marché","isChecked":true}];
localStorage.setItem('tasks',JSON.stringify(tasks));*/