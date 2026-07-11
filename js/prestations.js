// =======================
// PRESTATIONS - MODULE
// =======================

// =======================
// PAGE PLANNING (HUB)
// =======================

function ouvrirPlanning(){
  alert("✅ ouvrirPlanning appelée");

  const container = document.querySelector(".container");

  if (!container) {
    alert("❌ .container introuvable");
    return;
  }

  container.innerHTML = `
      <h1>📅 Planning</h1>

      <div style="margin-bottom:15px;">
          <button onclick="afficherPlanningJourUI()">Jour</button>
          <button onclick="ouvrirPlanningSemaine()">Semaine</button>
      </div>

      <div id="planningContent"></div>

      <br>

      <button onclick="afficherDashboard()">⬅️ Retour</button>
  `;

  afficherPlanningJourUI();
}


// =======================
// VUE JOUR (UI)
// =======================

function afficherPlanningJourUI() {
  const content = document.getElementById("planningContent");

  if (!content) {
    alert("❌ planningContent introuvable (id planningContent absent ou timing)");
    return;
  }

  content.innerHTML = `
    <input type="date" id="planningDate" onchange="changerJourPlanning()">
    <div id="planningListe"></div>
  `;

  const today = new Date().toISOString().split("T")[0];
  document.getElementById("planningDate").value = today;

  afficherPlanningJour(today);
}


// =======================
// LOGIQUE JOUR
// =======================

function changerJourPlanning(){

    const date = document.getElementById("planningDate").value;

    afficherPlanningJour(date);
}


function afficherPlanningJour(date){

    const container = document.getElementById("planningListe");

    const prestations = HestiaData.prestations.filter(p => p.date === date);

    if(prestations.length === 0){
        container.innerHTML = "<p>Aucune prestation</p>";
        return;
    }

    const couleurs = {
        a_faire: "#f39c12",
        en_cours: "#3498db",
        termine: "#2ecc71"
    };

    container.innerHTML = prestations.map(p => `
        <div class="card" style="border-left:5px solid ${couleurs[p.statut]}">
            <strong>${p.heure || "--:--"}</strong> - ${p.type}
        </div>
    `).join("");
}


// =======================
// VUE SEMAINE
// =======================

function ouvrirPlanningSemaine(){

    const container = document.getElementById("planningContent");

    const today = new Date();

    const startOfWeek = getStartOfWeek(today);

    container.innerHTML = `
        <div id="planningSemaine"></div>
    `;

    afficherPlanningSemaine(startOfWeek);
}


function afficherPlanningSemaine(startDate){

    const container = document.getElementById("planningSemaine");

    let html = "";

    for(let i = 0; i < 7; i++){

        const date = new Date(startDate);
        date.setDate(date.getDate() + i);

        const dateStr = formatDate(date);

        const prestations = HestiaData.prestations.filter(p => p.date === dateStr);

        html += `
            <div style="margin-bottom:20px; cursor:pointer;" onclick="ouvrirJourDepuisSemaine('${dateStr}')">
                <h3>${dateStr}</h3>

                ${
                    prestations.length === 0
                        ? "<p>Aucune prestation</p>"
                        : prestations.map(p => {

                            const couleurs = {
                                a_faire: "#f39c12",
                                en_cours: "#3498db",
                                termine: "#2ecc71"
                            };

                            return `
                                <div class="card" style="border-left:5px solid ${couleurs[p.statut]}">
                                    ${p.heure || "--:--"} - ${p.type}
                                </div>
                            `;
                        }).join("")
                }
            </div>
        `;
    }

    container.innerHTML = html;
}


// =======================
// NAVIGATION SEMAINE → JOUR
// =======================

function ouvrirJourDepuisSemaine(date){

    afficherPlanningJourUI();

    setTimeout(() => {
        document.getElementById("planningDate").value = date;
        afficherPlanningJour(date);
    }, 0);
}


// =======================
// HELPERS
// =======================

function getStartOfWeek(date){

    const d = new Date(date);
    const day = d.getDay();

    const diff = (day === 0 ? -6 : 1 - day);

    d.setDate(d.getDate() + diff);

    return d;
}


function formatDate(date){

    return date.toISOString().split("T")[0];
}
// =======================
// CREATION
// =======================

function creerPrestation(data){

    return {
        id: HestiaData.genererId(),

        type: data.type || "menage",

        clientId: data.clientId || null,
        logementId: data.logementId || null,

        date: data.date || "",
        heure: data.heure || "", // ✅ AJOUT

        statut: "a_faire",

        intervenant: data.intervenant || "",
        duree: data.duree || "",
        notes: data.notes || "",

        createdAt: new Date().toISOString()
    };
}


// =======================
// PAGE PRINCIPALE
// =======================

function ouvrirPrestations(){

    const container = document.querySelector(".container");

    container.innerHTML = `
        <h1>🧹 Prestations</h1>

        <button onclick="afficherFormulairePrestation()">
            ➕ Nouvelle prestation
        </button>

        <button onclick="ouvrirPlanning()">
            📅 Voir le planning
        </button>

        <div id="listePrestations"></div>

        <br>

        <button onclick="afficherDashboard()">⬅️ Retour</button>
    `;

    afficherListePrestations();
}


// =======================
// LISTE
// =======================

function afficherListePrestations(){

    const liste = document.getElementById("listePrestations");

    if(HestiaData.prestations.length === 0){
        liste.innerHTML = `<p>Aucune prestation</p>`;
        return;
    }

    liste.innerHTML = HestiaData.prestations.map(p => {

        const client = HestiaData.clients.find(c => c.id === p.clientId);
        const logement = HestiaData.logements.find(l => l.id === p.logementId);

        return `
            <div class="card" onclick="ouvrirFichePrestation(${p.id})">
                <h3>${p.heure || "--:--"} - ${p.type}</h3>
                <p>${logement ? logement.nom : "Aucun logement"}</p>
                <small>${client ? client.nom : "Aucun client"}</small>
                <br>
                <small>📅 ${p.date}</small>
                <br>
                <small>Statut : ${p.statut}</small>
            </div>
        `;
    }).join("");
}


// =======================
// FORMULAIRE
// =======================

function afficherFormulairePrestation(id = null){

    const prestation = HestiaData.prestations.find(p => p.id === id);

    const container = document.querySelector(".container");

    container.innerHTML = `
        <h1>${id ? "Modifier" : "Nouvelle"} prestation</h1>

        <select id="prestationType">
            <option value="menage">Ménage</option>
            <option value="etat_des_lieux">État des lieux</option>
            <option value="controle">Contrôle</option>
        </select>

        <select id="prestationClient">
            <option value="">Client</option>
            ${HestiaData.clients.map(c =>
                `<option value="${c.id}">${c.nom}</option>`
            ).join("")}
        </select>

        <select id="prestationLogement">
            <option value="">Logement</option>
            ${HestiaData.logements.map(l =>
                `<option value="${l.id}">${l.nom}</option>`
            ).join("")}
        </select>

        <input type="date" id="prestationDate">
        <input type="time" id="prestationHeure"> <!-- ✅ AJOUT -->

        <input type="text" id="prestationDuree" placeholder="Durée (minutes)">

        <textarea id="prestationNotes" placeholder="Notes"></textarea>

        <br>

        <button onclick="enregistrerPrestation(${id || null})">
            💾 Enregistrer
        </button>

        <button onclick="ouvrirPrestations()">⬅️ Retour</button>
    `;

    if(prestation){
        document.getElementById("prestationType").value = prestation.type;
        document.getElementById("prestationClient").value = prestation.clientId;
        document.getElementById("prestationLogement").value = prestation.logementId;
        document.getElementById("prestationDate").value = prestation.date;
        document.getElementById("prestationHeure").value = prestation.heure || ""; // ✅
        document.getElementById("prestationDuree").value = prestation.duree;
        document.getElementById("prestationNotes").value = prestation.notes;
    }
}


// =======================
// ENREGISTREMENT
// =======================

function enregistrerPrestation(id = null){

    const data = {
        type: document.getElementById("prestationType").value,
        clientId: Number(document.getElementById("prestationClient").value) || null,
        logementId: Number(document.getElementById("prestationLogement").value) || null,
        date: document.getElementById("prestationDate").value,
        heure: document.getElementById("prestationHeure").value, // ✅
        duree: document.getElementById("prestationDuree").value,
        notes: document.getElementById("prestationNotes").value
    };

    if(id){

        const index = HestiaData.prestations.findIndex(p => p.id === id);

        if(index !== -1){
            HestiaData.prestations[index] = {
                ...HestiaData.prestations[index],
                ...data
            };
        }

    } else {

        const prestation = creerPrestation(data);
        HestiaData.prestations.push(prestation);

        const client = HestiaData.clients.find(c => c.id === prestation.clientId);
        if(client){
            client.historique = client.historique || [];
            client.historique.push(`Prestation (${prestation.type}) le ${prestation.date}`);
        }

        const logement = HestiaData.logements.find(l => l.id === prestation.logementId);
        if(logement){
            logement.historique = logement.historique || [];
            logement.historique.push(`Prestation (${prestation.type}) le ${prestation.date}`);
        }
    }

    HestiaData.sauvegarder();
    ouvrirPrestations();
}


// =======================
// FICHE
// =======================

function ouvrirFichePrestation(id){

    const p = HestiaData.prestations.find(p => p.id === id);

    if(!p){
        ouvrirPrestations();
        return;
    }

    const client = HestiaData.clients.find(c => c.id === p.clientId);
    const logement = HestiaData.logements.find(l => l.id === p.logementId);

    const container = document.querySelector(".container");

    container.innerHTML = `
        <h1>${p.type}</h1>

        <p><strong>Client :</strong> ${client ? client.nom : "-"}</p>
        <p><strong>Logement :</strong> ${logement ? logement.nom : "-"}</p>
        <p><strong>Date :</strong> ${p.date}</p>
        <p><strong>Heure :</strong> ${p.heure || "-"}</p>
        <p><strong>Durée :</strong> ${p.duree || "-"} min</p>
        <p><strong>Statut :</strong> ${p.statut}</p>

        <h2>Notes</h2>
        <p>${p.notes || "Aucune"}</p>

        <br>

        <button onclick="afficherFormulairePrestation(${p.id})">✏️ Modifier</button>
        <button onclick="ouvrirPrestations()">⬅️ Retour</button>
    `;
}


// =======================
// PLANNING
// =======================

function ouvrirPlanning(date = null){

    const container = document.querySelector(".container");

    const today = date || new Date().toISOString().split("T")[0];

    container.innerHTML = `
        <h1>📅 Planning</h1>

        <input type="date" id="planningDate" value="${today}" onchange="changerDatePlanning()">

        <div id="planningListe"></div>

        <br>

        <button onclick="ouvrirPrestations()">⬅️ Retour</button>
    `;

    afficherPlanningJour(today);
}


// =======================
// AFFICHAGE JOUR
// =======================

function afficherPlanningJour(date){

    const liste = document.getElementById("planningListe");

    const prestations = HestiaData.prestations
        .filter(p => p.date === date)
        .sort((a, b) => (a.heure || "").localeCompare(b.heure || ""));

    if(prestations.length === 0){
        liste.innerHTML = `<p>Aucune prestation ce jour</p>`;
        return;
    }

    liste.innerHTML = prestations.map(p => {

        const client = HestiaData.clients.find(c => c.id === p.clientId);

        const couleurs = {
            a_faire: "#f39c12",
            en_cours: "#3498db",
            termine: "#2ecc71"
        };

        return `
            <div class="card" style="border-left: 5px solid ${couleurs[p.statut]}">
                
                <h3>${p.heure || "--:--"} - ${p.type}</h3>
                
                <p>${client ? client.nom : "Client inconnu"}</p>

                <p>
                    <strong style="color:${couleurs[p.statut]}">
                        ${p.statut}
                    </strong>
                </p>

                <div style="margin-top:10px;">
                    <button onclick="changerStatutPrestation(${p.id}, 'a_faire')">🕒</button>
                    <button onclick="changerStatutPrestation(${p.id}, 'en_cours')">🚧</button>
                    <button onclick="changerStatutPrestation(${p.id}, 'termine')">✅</button>
                </div>

                <button onclick="ouvrirFichePrestation(${p.id})">
                    Voir
                </button>

            </div>
        `;
    }).join("");
}


// =======================
// CHANGEMENT DATE
// =======================

function changerDatePlanning(){

    const date = document.getElementById("planningDate").value;

    afficherPlanningJour(date);
}
function changerStatutPrestation(id, statut){

    const prestation = HestiaData.prestations.find(p => p.id === id);

    if(!prestation) return;

    prestation.statut = statut;

    HestiaData.sauvegarder();

    const date = document.getElementById("planningDate").value;

    afficherPlanningJour(date);
}
function ouvrirPlanningSemaine(){

    const container = document.querySelector(".container");

    const today = new Date();

    const startOfWeek = getStartOfWeek(today);

    container.innerHTML = `
        <h1>📅 Planning semaine</h1>

        <div id="planningSemaine"></div>

        <br>

        <button onclick="ouvrirPrestations()">⬅️ Retour</button>
    `;

    afficherPlanningSemaine(startOfWeek);
}
function afficherPlanningSemaine(startDate){

    const container = document.getElementById("planningSemaine");

    let html = "";

    for(let i = 0; i < 7; i++){

        const date = new Date(startDate);
        date.setDate(date.getDate() + i);

        const dateStr = formatDate(date);

        const prestations = HestiaData.prestations.filter(p => p.date === dateStr);

        html += `
            <div style="margin-bottom:20px;">
                <h3>${dateStr}</h3>

                ${
                    prestations.length === 0
                        ? "<p>Aucune prestation</p>"
                        : prestations.map(p => {

                            const couleurs = {
                                a_faire: "#f39c12",
                                en_cours: "#3498db",
                                termine: "#2ecc71"
                            };

                            return `
                                <div class="card" style="border-left:5px solid ${couleurs[p.statut]}">
                                    ${p.heure || "--:--"} - ${p.type}
                                </div>
                            `;
                        }).join("")
                }
            </div>
        `;
    }

    container.innerHTML = html;
}
function getStartOfWeek(date){

    const d = new Date(date);
    const day = d.getDay();

    const diff = (day === 0 ? -6 : 1 - day); // lundi = début

    d.setDate(d.getDate() + diff);

    return d;
}

function formatDate(date){

    return date.toISOString().split("T")[0];
}

window.ouvrirPlanning = ouvrirPlanning;
window.ouvrirPrestations = ouvrirPrestations;
window.afficherDashboard = afficherDashboard;
window.ouvrirClients = ouvrirClients;

window.afficherPlanningJourUI = afficherPlanningJourUI;
window.ouvrirPlanningSemaine = ouvrirPlanningSemaine;