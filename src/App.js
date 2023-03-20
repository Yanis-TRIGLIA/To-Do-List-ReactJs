import React from 'react';
import './style.css';

// le titre de la page
function Title() {
    return <center><h1 id='test'>To Do List 📋</h1></center>;
}

// Définir la fonction Formulaire() comme un composant de niveau supérieur
function Formulaire() {
  function afficherFormulaire() {
    const formulaire = document.getElementById('form_add');
    formulaire.style.display = 'block';
  }
  function cacherFormulaire() {
    const formulaire = document.getElementById('form_add');
    formulaire.style.display = 'none';
  }

  return (
    <div>
      <button onClick={afficherFormulaire} >Ajouter une tâche</button>
      <div id="form_add" style={{display: 'none'}}>
        <form id='formulaire'>
          <h3>Crée une Tache :</h3>
          <label>
            Titre:
            <input type="text" id="titre" />
          </label>
          <label>
            Description:
            <input type="text" id="description" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button onClick={cacherFormulaire} >Fermer le formulaire</button>
      </div>
    </div>
  );
}




function App() {
    return (
      <div>
        <Title />
        <Formulaire />
      </div>
    );
  }
  
  export default App;

  
  
  
  
  

