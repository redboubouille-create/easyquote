document.addEventListener("DOMContentLoaded", () => {

    if(!HestiaData.entreprise.nom){

        afficherBienvenue();

    } else {

        afficherDashboard();

    }

});


function afficherBienvenue(){

const container = document.querySelector(".container");


container.innerHTML = `

<h1>🏠 Hestia</h1>

<p>
Créons votre espace professionnel
</p>


<input id="entreprise"
placeholder="Nom de votre entreprise">


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
document.getElementById("entreprise").value;


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
Bonjour ${HestiaData.entreprise.prenom} 👋
</h1>


<p>
Bienvenue dans votre espace Hestia
</p>


<div>

👥 Clients :
${HestiaData.clients.length}

</div>


<div>

🧾 Devis :
${HestiaData.devis.length}

</div>


<div>

📅 Planning :
${HestiaData.planning.length}

</div>


<br>


<button>
➕ Nouveau devis
</button>


<button>
🤖 Hermès
</button>


`;

}