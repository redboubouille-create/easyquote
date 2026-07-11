// =======================
// PLANNING
// =======================

function ouvrirPlanning() {
  const container = document.querySelector(".container");
  if (!container) return;

  container.innerHTML = `
    <h1>📅 Planning</h1>

    <div id="planningListe"></div>

    <br>

    <button onclick="ouvrirPrestations()">⬅️ Retour</button>
  `;

  afficherPlanning();
}

function afficherPlanning() {
  const el = document.getElementById("planningListe");
  if (!el) return;

  const prestations = HestiaData.prestations || [];

  if (prestations.length === 0) {
    el.innerHTML = "<p>Aucune prestation</p>";
    return;
  }

  // tri simple par date + heure
  prestations.sort((a, b) => {
    const d1 = (a.date || "") + (a.heure || "");
    const d2 = (b.date || "") + (b.heure || "");
    return d1.localeCompare(d2);
  });

  el.innerHTML = prestations.map(p => `
    <div onclick="ouvrirFichePrestation(${p.id})" style="padding:10px;border-bottom:1px solid #ccc;">
      <strong>${p.type}</strong><br>
      ${p.date} ${p.heure || ""}
    </div>
  `).join("");
}

// export global
window.ouvrirPlanning = ouvrirPlanning;