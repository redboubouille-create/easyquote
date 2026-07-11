// =======================
// PLANNING MODULE
// =======================

function ouvrirPlanning(date = null) {
  const container = document.querySelector(".container");
  if (!container) return;

  const today = date || new Date().toISOString().split("T")[0];

  container.innerHTML = `
    <h1>📅 Planning</h1>

    <input type="date" id="planningDate" value="${today}">

    <div id="planningListe" style="margin-top:15px;"></div>

    <br>

    <button onclick="ouvrirPrestations()">⬅️ Retour</button>
  `;

  const input = document.getElementById("planningDate");
  if (input) {
    input.addEventListener("change", () => {
      afficherPlanningJour(input.value);
    });
  }

  afficherPlanningJour(today);
}

function afficherPlanningJour(date) {
  const liste = document.getElementById("planningListe");
  if (!liste) return;

  const prestations = HestiaData.prestations
    .filter((p) => p.date === date)
    .sort((a, b) => (a.heure || "").localeCompare(b.heure || ""));

  if (prestations.length === 0) {
    liste.innerHTML = `<p>Aucune prestation ce jour</p>`;
    return;
  }

  const couleurs = {
    a_faire: "#f39c12",
    en_cours: "#3498db",
    termine: "#2ecc71"
  };

  liste.innerHTML = prestations.map((p) => {
    const client = HestiaData.clients.find((c) => c.id === p.clientId);

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
          <button onclick="ouvrirFichePrestation(${p.id})">Voir</button>
        </div>
      </div>
    `;
  }).join("");
}

function changerStatutPrestation(id, statut) {
  const prestation = HestiaData.prestations.find((p) => p.id === id);
  if (!prestation) return;

  prestation.statut = statut;

  HestiaData.sauvegarder();

  const planningDate = document.getElementById("planningDate");
  if (planningDate && planningDate.value) {
    afficherPlanningJour(planningDate.value);
  }
}

// EXPORT GLOBAL
window.ouvrirPlanning = ouvrirPlanning;
window.afficherPlanningJour = afficherPlanningJour;
window.changerStatutPrestation = changerStatutPrestation;