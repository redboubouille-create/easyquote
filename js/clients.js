// =======================
// STATE
// =======================

let filtreClients = "";


// =======================
// OUVRIR PAGE CLIENTS
// =======================

function ouvrirClients(){

    const container = document.querySelector(".container");

    container.innerHTML = `
        <h1>👥 Clients</h1>

        <button onclick="afficherFormulaireClient()">
            ➕ Nouveau client
        </button>

        <br><br>

        <input 
            id="rechercheClient" 
            placeholder="🔍 Rechercher un client..."
            oninput="mettreAJourRecherche(this.value)"
        >

        <div id="listeClients"></div>

        <br>

        <button onclick="afficherDashboard()">
            ⬅️ Retour
        </button>
    `;

    afficherListeClients();
}


// =======================
// RECHERCHE
// =======================

function mettreAJourRecherche(valeur){
    filtreClients = valeur.toLowerCase();
    afficherListeClients();
}


// =======================
// LISTE CLIENTS
// =======================

function afficherListeClients(){

    const liste = document.getElementById("listeClients");

    let clients = HestiaData.clients;

    // 🔍 Filtre
    if(filtreClients){
        clients = clients.filter(client =>
            (client.nom || "").toLowerCase().includes(filtreClients) ||
            (client.telephone || "").toLowerCase().includes(filtreClients)
        );
    }

    if(clients.length === 0){
        liste.innerHTML = `<p>Aucun client trouvé</p>`;
        return;
    }

    liste.innerHTML = clients.map(client => `
        <div class="card" onclick="ouvrirFicheClient(${client.id})">
            <h3>${client.nom}</h3>
            <p>${client.telephone}</p>
        </div>
    `).join("");
}


// =======================
// FICHE CLIENT
// =======================

function ouvrirFicheClient(id){

    const client = HestiaData.clients.find(c => c.id === id);

    if(!client){
        ouvrirClients();
        return;
    }

    const container = document.querySelector(".container");

    container.innerHTML = `
        <h1>${client.nom}</h1>

        <!-- ACTIONS -->
        <div>
            <button onclick="afficherFormulaireClient(${client.id})">
                ✏️ Modifier
            </button>

            <button onclick="confirmerSuppression(${client.id})">
                🗑 Supprimer
            </button>
        </div>

        <hr>

        <!-- INFOS -->
        <h2>📋 Informations</h2>

        <p><strong>Téléphone :</strong> ${client.telephone || "-"}</p>
        <p><strong>Adresse :</strong> ${client.adresse || "-"}</p>
        <p><strong>Logement :</strong> ${client.logement || "-"}</p>
        <p><strong>Fréquence :</strong> ${client.frequence || "-"}</p>

        <hr>

        <!-- NOTES -->
        <h2>📝 Notes</h2>

        <p>${client.notes || "Aucune note"}</p>

        <hr>

        <!-- LOGEMENTS (FUTUR MODULE) -->
        <h2>🏠 Logements</h2>

        ${
            client.logements && client.logements.length > 0
            ? client.logements.map(l => `<p>• ${l.nom}</p>`).join("")
            : `<p>Aucun logement lié</p>`
        }

        <button onclick="lierLogement(${client.id})">
            ➕ Ajouter un logement
        </button>

        <hr>

        <!-- HISTORIQUE -->
        <h2>📊 Historique</h2>

        ${
            client.historique && client.historique.length > 0
            ? client.historique.map(h => `<p>• ${h}</p>`).join("")
            : `<p>Aucune activité</p>`
        }

        <hr>

        <button onclick="ouvrirClients()">
            ⬅️ Retour
        </button>
    `;
}


// =======================
// FORMULAIRE (CREATE / EDIT)
// =======================

function afficherFormulaireClient(id = null){

    const client = id 
        ? HestiaData.clients.find(c => c.id === id)
        : null;

    const container = document.querySelector(".container");

    container.innerHTML = `
        <h1>${client ? "✏️ Modifier" : "➕ Nouveau"} client</h1>

        <input id="clientNom" placeholder="Nom du client" value="${client ? client.nom : ""}">
        <input id="clientTelephone" placeholder="Téléphone" value="${client ? client.telephone : ""}">
        <input id="clientAdresse" placeholder="Adresse" value="${client ? client.adresse : ""}">
        <input id="clientLogement" placeholder="Type de logement" value="${client ? client.logement : ""}">
        <input id="clientFrequence" placeholder="Fréquence de passage" value="${client ? client.frequence : ""}">

        <textarea id="clientNotes" placeholder="Notes importantes">${client ? client.notes : ""}</textarea>

        <br>

        <button onclick="enregistrerClient(${client ? client.id : 'null'})">
            Enregistrer
        </button>

        <button onclick="${client ? `ouvrirFicheClient(${client.id})` : 'ouvrirClients()'}">
            ⬅️ Retour
        </button>
    `;
}


// =======================
// CREATE / UPDATE
// =======================

function enregistrerClient(id){

    const data = {
        nom: document.getElementById("clientNom").value.trim(),
        telephone: document.getElementById("clientTelephone").value.trim(),
        adresse: document.getElementById("clientAdresse").value.trim(),
        logement: document.getElementById("clientLogement").value.trim(),
        frequence: document.getElementById("clientFrequence").value.trim(),
        notes: document.getElementById("clientNotes").value.trim()
    };

    if(id){
        // UPDATE
        const index = HestiaData.clients.findIndex(c => c.id === id);

        if(index !== -1){
            HestiaData.clients[index] = {
                ...HestiaData.clients[index],
                ...data
            };
        }

    } else {
        // CREATE
        const client = creerClient(data);
        HestiaData.clients.push(client);
    }

    HestiaData.sauvegarder();
    ouvrirClients();
}


// =======================
// SUPPRESSION
// =======================

function confirmerSuppression(id){

    const confirmation = confirm("Supprimer ce client ?");

    if(!confirmation) return;

    supprimerClient(id);
}

function supprimerClient(id){

    HestiaData.clients = HestiaData.clients.filter(c => c.id !== id);

    HestiaData.sauvegarder();
    ouvrirClients();
}


// =======================
// MODELE CLIENT
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
        historique: [],
        logements: [] // ✅ NOUVEAU
    };
}

function lierLogement(id){
    alert("Module logements bientôt disponible");
}