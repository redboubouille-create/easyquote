// =======================
// OUVRIR PAGE CLIENTS
// =======================

function ouvrirClients(){

    const container = document.querySelector(".container");

    container.innerHTML = `
        <h1>👥 Clients</h1>

        <button onclick="afficherAjoutClient()">
            ➕ Nouveau client
        </button>

        <div id="listeClients"></div>

        <br>

        <button onclick="afficherDashboard()">
            ⬅️ Retour
        </button>
    `;

    afficherListeClients();
}


// =======================
// AFFICHER LISTE
// =======================

function afficherListeClients(){

    const liste = document.getElementById("listeClients");

    if(HestiaData.clients.length === 0){
        liste.innerHTML = `<p>Aucun client enregistré</p>`;
        return;
    }

    liste.innerHTML = HestiaData.clients.map(client => `
        <div class="card" onclick="ouvrirFicheClient(${client.id})">
            <h3>${client.nom}</h3>
            <p>${client.telephone}</p>
        </div>
    `).join("");
}

function ouvrirFicheClient(id){

    const client = HestiaData.clients.find(c => c.id === id);

    const container = document.querySelector(".container");

    container.innerHTML = `
        <h1>${client.nom}</h1>

        <p><strong>Téléphone :</strong> ${client.telephone}</p>
        <p><strong>Adresse :</strong> ${client.adresse}</p>
        <p><strong>Logement :</strong> ${client.logement}</p>
        <p><strong>Fréquence :</strong> ${client.frequence}</p>

        <br>

        <p><strong>Notes :</strong></p>
        <p>${client.notes}</p>

        <br>

        <button onclick="ouvrirClients()">
            ⬅️ Retour
        </button>
    `;
}


// =======================
// FORMULAIRE AJOUT
// =======================

function afficherAjoutClient(){

    const container = document.querySelector(".container");

    container.innerHTML = `
        <h1>➕ Nouveau client</h1>

        <input id="clientNom" placeholder="Nom du client">
        <input id="clientTelephone" placeholder="Téléphone">
        <input id="clientAdresse" placeholder="Adresse">
        <input id="clientLogement" placeholder="Type de logement">
        <input id="clientFrequence" placeholder="Fréquence de passage">

        <textarea id="clientNotes" placeholder="Notes importantes"></textarea>

        <button onclick="ajouterClient()">
            Enregistrer
        </button>

        <button onclick="ouvrirClients()">
            Retour
        </button>
    `;
}


// =======================
// CREER CLIENT (MODELE)
// =======================

function creerClient(data){

    return {
        id: Date.now(),

        nom: data.nom || "",
        telephone: data.telephone || "",
        adresse: data.adresse || "",
        email: "",

        logement: data.logement || "",
        frequence: data.frequence || "",

        notes: data.notes || "",

        photos: [],
        historique: []
    };
}


// =======================
// AJOUT CLIENT
// =======================

function ajouterClient(){

    const client = creerClient({
        nom: document.getElementById("clientNom").value,
        telephone: document.getElementById("clientTelephone").value,
        adresse: document.getElementById("clientAdresse").value,
        logement: document.getElementById("clientLogement").value,
        frequence: document.getElementById("clientFrequence").value,
        notes: document.getElementById("clientNotes").value
    });

    HestiaData.clients.push(client);

    HestiaData.sauvegarder();

    ouvrirClients();
}