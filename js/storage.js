const HestiaData = {

    // =======================
    // META
    // =======================

    version: "1.0.0",
    lastUpdate: null,


    // =======================
    // ENTREPRISE
    // =======================

    entreprise: {
        nom: "",
        prenom: "",
        telephone: "",
        email: ""
    },


    // =======================
    // DATA PRINCIPALE
    // =======================

    clients: [],
    logements: [], // ✅ AJOUT IMPORTANT
    prestations: [], // ✅ FUTUR MODULE

    devis: [],
    factures: [],
    planning: [],


    // =======================
    // UTILS
    // =======================

    genererId(){
        return Date.now() + Math.floor(Math.random() * 1000);
    },


    // =======================
    // SAUVEGARDE
    // =======================

    sauvegarder(){

        try {

            this.lastUpdate = new Date().toISOString();

            const data = JSON.stringify({
                version: this.version,
                lastUpdate: this.lastUpdate,

                entreprise: this.entreprise,

                clients: this.clients,
                logements: this.logements,
                prestations: this.prestations,

                devis: this.devis,
                factures: this.factures,
                planning: this.planning
            });

            localStorage.setItem("hestiaData", data);

        } catch (e) {
            console.error("Erreur sauvegarde :", e);
        }
    },


    // =======================
    // CHARGEMENT
    // =======================

    charger(){

        try {

            const data = localStorage.getItem("hestiaData");

            if(!data) return;

            const sauvegarde = JSON.parse(data);

            // ✅ Versionning (prépare futur migrations)
            this.version = sauvegarde.version || "1.0.0";
            this.lastUpdate = sauvegarde.lastUpdate || null;

            this.entreprise = sauvegarde.entreprise || this.entreprise;

            this.clients = sauvegarde.clients || [];
            this.logements = sauvegarde.logements || [];
            this.prestations = sauvegarde.prestations || [];

            this.devis = sauvegarde.devis || [];
            this.factures = sauvegarde.factures || [];
            this.planning = sauvegarde.planning || [];

        } catch (e) {
            console.error("Erreur chargement :", e);
        }
    },


    // =======================
    // RESET (utile dev)
    // =======================

    reset(){

        localStorage.removeItem("hestiaData");

        this.clients = [];
        this.logements = [];
        this.prestations = [];

        this.devis = [];
        this.factures = [];
        this.planning = [];

        console.log("Hestia reset ✅");
    }
};


// =======================
// INIT
// =======================

HestiaData.charger();