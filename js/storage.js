const HestiaData = {

    // =======================
    // META
    // =======================

    version: "1.0.0",
    lastUpdate: null,
    STORAGE_KEY: "hestiaData",


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
    logements: [],
    prestations: [],

    devis: [],
    factures: [],
    planning: [],


    // =======================
    // UTILS
    // =======================

    genererId(){
        return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
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

            localStorage.setItem(this.STORAGE_KEY, data);

        } catch (e) {
            console.error("Erreur sauvegarde :", e);
        }
    },


    // =======================
    // CHARGEMENT
    // =======================

    charger(){

        try {

            const data = localStorage.getItem(this.STORAGE_KEY);

            if(!data) return;

            const sauvegarde = JSON.parse(data);

            if(!sauvegarde || typeof sauvegarde !== "object") return;

            // ✅ VERSION
            this.version = sauvegarde.version || this.version;
            this.lastUpdate = sauvegarde.lastUpdate || null;

            // ✅ MERGE SAFE
            this.entreprise = {
                ...this.entreprise,
                ...(sauvegarde.entreprise || {})
            };

            // ✅ ARRAYS SAFE
            this.clients = Array.isArray(sauvegarde.clients) ? sauvegarde.clients : [];
            this.logements = Array.isArray(sauvegarde.logements) ? sauvegarde.logements : [];
            this.prestations = Array.isArray(sauvegarde.prestations) ? sauvegarde.prestations : [];

            this.devis = Array.isArray(sauvegarde.devis) ? sauvegarde.devis : [];
            this.factures = Array.isArray(sauvegarde.factures) ? sauvegarde.factures : [];
            this.planning = Array.isArray(sauvegarde.planning) ? sauvegarde.planning : [];

        } catch (e) {
            console.error("Erreur chargement :", e);
        }
    },


    // =======================
    // INIT AUTO (IMPORTANT)
    // =======================

    init(){
        this.charger();
    },


    // =======================
    // RESET
    // =======================

    reset(){

        localStorage.removeItem(this.STORAGE_KEY);

        this.entreprise = {
            nom: "",
            prenom: "",
            telephone: "",
            email: ""
        };

        this.clients = [];
        this.logements = [];
        this.prestations = [];

        this.devis = [];
        this.factures = [];
        this.planning = [];

        console.log("Hestia reset ✅");
    }
};


// ✅ AUTO START
HestiaData.init();