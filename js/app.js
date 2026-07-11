document.addEventListener("DOMContentLoaded", () => {

    // ✅ Charger les données AVANT tout
    HestiaData.charger();

    demarrerHestia();

});


// =======================
// CORE
// =======================

function demarrerHestia(){

    if(!HestiaData.entreprise.nom){
        afficherCreationProfil();
    } else {
        afficherDashboard();
    }

}


// =======================
// UI
// =======================

function afficherCreationProfil(){

    render(`
        <h1>🏛️ Hestia</h1>

        <p>Créons votre espace professionnel</p>

        <input id="nomEntreprise" placeholder="Nom de l'entreprise">

        <input id="prenom" placeholder="Votre prénom">

        <input id="telephone" placeholder="Téléphone">

        <button onclick="creerProfil()">
            Créer mon espace
        </button>
    `);
}


function creerProfil(){

    const nom = document.getElementById("nomEntreprise")?.value || "";
    const prenom = document.getElementById("prenom")?.value || "";
    const telephone = document.getElementById("telephone")?.value || "";

    HestiaData.entreprise.nom = nom;
    HestiaData.entreprise.prenom = prenom;
    HestiaData.entreprise.telephone = telephone;

    HestiaData.sauvegarder();

    afficherDashboard();
}


function afficherDashboard(){

    render(`
        <h1>🏠 Hestia</h1>

        <button onclick="ouvrirClients()">👤 Clients</button>

        <button onclick="ouvrirPrestations()">🧹 Prestations</button>

        <button onclick="ouvrirPlanning()">📅 Planning</button>
    `);
}


// =======================
// GLOBAL
// =======================

window.creerProfil = creerProfil;
window.afficherDashboard = afficherDashboard;