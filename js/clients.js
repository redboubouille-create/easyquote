function ouvrirClients(){

    const container = document.querySelector(".container");


    container.innerHTML = `

    <h1>👥 Clients</h1>


    <button onclick="afficherAjoutClient()">
    ➕ Nouveau client
    </button>


    <div id="listeClients"></div>


    <br>

    <button onclick="afficherDashboard()">
    ⬅️ Retour
    </button>

    `;


    afficherListeClients();

}



function afficherListeClients(){

    const liste = document.getElementById("listeClients");


    if(HestiaData.clients.length === 0){

        liste.innerHTML = `

        <p>
        Aucun client enregistré
        </p>

        `;

        return;

    }


    liste.innerHTML = HestiaData.clients.map((client,index)=>`

        <div class="card">

        <h3>
        ${client.nom}
        </h3>

        <p>
        ${client.telephone}
        </p>

        </div>

    `).join("");

}



function afficherAjoutClient(){

const container = document.querySelector(".container");


container.innerHTML = `

<h1>➕ Nouveau client</h1>


<input id="clientNom"
placeholder="Nom du client">


<input id="clientTelephone"
placeholder="Téléphone">


<input id="clientAdresse"
placeholder="Adresse">


<button onclick="ajouterClient()">

Enregistrer

</button>


<button onclick="ouvrirClients()">

Retour

</button>

`;

}



function ajouterClient(){

const client = {

nom:
document.getElementById("clientNom").value,


telephone:
document.getElementById("clientTelephone").value,


adresse:
document.getElementById("clientAdresse").value,


historique:[]

};


HestiaData.clients.push(client);


HestiaData.sauvegarder();


ouvrirClients();

}