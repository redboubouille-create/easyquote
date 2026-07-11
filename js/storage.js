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

            Object.assign(
                this,
                JSON.parse(data)
            );

        }

    }

};


HestiaData.charger();