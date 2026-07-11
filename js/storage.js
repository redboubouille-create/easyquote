document.addEventListener("DOMContentLoaded", () => {

    demarrerHestia();

});


function demarrerHestia(){

    if(HestiaData.entreprise.nom === ""){

        afficherCreationEntreprise();

    } else {

        afficherDashboard();

    }

}



function afficherCreationEntreprise(){

const container = document.querySelector(".container");


container.innerHTML = `

<h1>🏛️ Hestia</h1>

<p>
Créons votre espace professionnel
</p>


<input id="nomEntreprise"
placeholder="Nom de l'entreprise">


<input id="prenom"
placeholder="Votre prénom">


<input id="telephone"
placeholder="Téléphone">


<button onclick="creerEntreprise()">

Créer mon espace

</button>

`;

}



function creerEntreprise(){

HestiaData.entreprise.nom =
document.getElementById("nomEntreprise").value;


HestiaData.entreprise.prenom =
document.getElementById("prenom").value;


HestiaData.entreprise.telephone =
document.getElementById("telephone").value;


HestiaData.sauvegarder();


afficherDashboard();

}



function afficherDashboard(){

const container = document.querySelector(".container");


container.innerHTML = `

<h1>
🏛️ Hestia
</h1>


<p>
Bonjour ${HestiaData.entreprise.prenom} 👋
</p>


<div>

👥 Clients :
${HestiaData.clients.length}

</div>


<br>


<div>

🧾 Devis :
${HestiaData.devis.length}

</div>


<br>


<div>

📅 Interventions :
${HestiaData.planning.length}

</div>


<br>


<div>

💰 Factures :
${HestiaData.factures.length}

</div>


<br><br>


<button>
➕ Nouveau devis
</button>


<button>
🤖 Hermès
</button>


`;

}