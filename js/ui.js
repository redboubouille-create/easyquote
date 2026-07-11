// =======================
// UI ROOT
// =======================

function getScreen() {
    return document.getElementById("screen");
}

function getModal() {
    return document.getElementById("modal");
}


// =======================
// NAVIGATION SIMPLE
// =======================

function render(content) {
    const screen = getScreen();

    if (!screen) {
        console.error("❌ #screen introuvable");
        return;
    }

    screen.innerHTML = content;
}


// =======================
// MODAL
// =======================

function openModal(content) {
    const modal = getModal();

    if (!modal) return;

    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeModal()"></div>
        <div class="modal-content">
            ${content}
        </div>
    `;
}

function closeModal() {
    const modal = getModal();
    if (modal) modal.innerHTML = "";
}


// =======================
// EXPORT GLOBALS (MINIMAL)
// =======================

window.render = render;
window.openModal = openModal;
window.closeModal = closeModal;

// Navigation existante
window.afficherDashboard = afficherDashboard;
window.ouvrirClients = ouvrirClients;
window.ouvrirPrestations = ouvrirPrestations;
window.ouvrirPlanning = ouvrirPlanning;

window.afficherPlanningJourUI = afficherPlanningJourUI;
window.ouvrirPlanningSemaine = ouvrirPlanningSemaine;

console.log("UI initialisée ✅");