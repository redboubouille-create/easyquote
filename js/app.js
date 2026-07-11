// =======================
// RENDER (UI CORE)
// =======================

function render(html) {
    const screen = document.getElementById("screen");
    if (!screen) {
        console.error("Screen introuvable");
        return;
    }

    screen.innerHTML = html;
}


// =======================
// INIT
// =======================

document.addEventListener("DOMContentLoaded", () => {

    console.log("✅ Hestia démarre");

    if (typeof HestiaData === "undefined") {
        console.error("❌ HestiaData non chargé");
        return;
    }

    if (typeof HestiaData.charger === "function") {
        HestiaData.charger();
    }

    demarrerHestia();
});


// =======================
// CORE
// =======================

function demarrerHestia() {

    if (!HestiaData?.entreprise?.nom) {
        afficherCreationProfil();
    } else {
        afficherDashboard();
    }

}


// =======================
// UI - PROFIL
// =======================

function afficherCreationProfil() {

    render(`
        <h1>🏛️ Hestia</h1>

        <p>Créons votre espace professionnel</p>

        <input id="nomEntreprise" placeholder="Nom de l'entreprise">
        <br><br>

        <input id="prenom" placeholder="Votre prénom">
        <br><br>

        <input id="telephone" placeholder="Téléphone">
        <br><br>

        <button onclick="creerProfil()">
            Créer mon espace
        </button>
    `);
}


function creerProfil() {

    const nom = document.getElementById("nomEntreprise")?.value || "";
    const prenom = document.getElementById("prenom")?.value || "";
    const telephone = document.getElementById("telephone")?.value || "";

    if (!nom) {
        alert("Le nom de l'entreprise est requis");
        return;
    }

    HestiaData.entreprise.nom = nom;
    HestiaData.entreprise.prenom = prenom;
    HestiaData.entreprise.telephone = telephone;

    if (typeof HestiaData.sauvegarder === "function") {
        HestiaData.sauvegarder();
    }

    afficherDashboard();
}


// =======================
// UI - DASHBOARD
// =======================

function afficherDashboard() {

    render(`
        <h1>🏠 Hestia</h1>

        <button onclick="ouvrirClients()">👤 Clients</button>
        <br><br>

        <button onclick="ouvrirPrestations()">🧹 Prestations</button>
        <br><br>

        <button onclick="ouvrirPlanning()">📅 Planning</button>
    `);
}


// =======================
// GLOBAL (IMPORTANT TELEGRAM)
// =======================

window.demarrerHestia = demarrerHestia;
window.creerProfil = creerProfil;
window.afficherDashboard = afficherDashboard;