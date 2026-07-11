// =======================
// PLANNING
// =======================

function ouvrirPlanning() {

  render(`
    <h1>📅 Planning</h1>

    <div id="planningListe"></div>

    <br>

    <button onclick="ouvrirPrestations()">⬅️ Retour</button>
  `);

  afficherPlanning();
}


function afficherPlanning() {

  const el = document.getElementById("planningListe");
  if (!el) return;

  const prestations = [...(HestiaData.prestations || [])];

  if (prestations.length === 0) {
    el.innerHTML = "<p>Aucune prestation</p>";
    return;
  }

  prestations.sort((a, b) => {
    const d1 = new Date(`${a.date}T${a.heure || "00:00"}`);
    const d2 = new Date(`${b.date}T${b.heure || "00:00"}`);
    return d1 - d2;
  });

  el.innerHTML = prestations.map(p => `
    <div onclick="ouvrirFichePrestation(${p.id})" style="padding:10px;border-bottom:1px solid #ccc;">
      <strong>${p.type}</strong><br>
      ${p.date} ${p.heure || ""}
    </div>
  `).join("");
}


window.ouvrirPlanning = ouvrirPlanning;