const HestiaData = {

    entreprise: {
        nom: "",
        prenom: "",
        telephone: "",
        email: ""
    },

    clients: [],

    devis: [],

    planning: [],

    factures: [],


    sauvegarder(){

        localStorage.setItem(
            "hestiaData",
            JSON.stringify(this)
        );

    },


    charger(){

        const data = localStorage.getItem("hestiaData");

        if(data){

            const sauvegarde = JSON.parse(data);

            this.entreprise = sauvegarde.entreprise || this.entreprise;
            this.clients = sauvegarde.clients || [];
            this.devis = sauvegarde.devis || [];
            this.planning = sauvegarde.planning || [];
            this.factures = sauvegarde.factures || [];

        }

    }

};


HestiaData.charger();