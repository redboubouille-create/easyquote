document.addEventListener("DOMContentLoaded", () => {

    demarrerHestia();

});


function demarrerHestia(){

    if(HestiaData.entreprise.nom === ""){

        afficherCreationProfil();

    } else {

        afficherDashboard();

    }

}



function afficherCreationProfil(){

    const container = document.querySelector(".container");


    container.innerHTML = `

    <h1>🏛️ Hestia</h1>

    <p>
    Créons votre espace professionnel
    </p>


    <input id="nomEntreprise" placeholder="Nom de l'entreprise">


    <input id="prenom" placeholder="Votre prénom">


    <input id="telephone" placeholder="Téléphone">


    <button onclick="creerProfil()">

    Créer mon espace

    </button>

    `;

}



function creerProfil(){


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

<h1>🏛️ Hestia</h1>


<p>
Bonjour ${HestiaData.entreprise.prenom} 👋
</p>


<p>
${HestiaData.entreprise.nom}
</p>


<hr>


<p>
👥 Clients : ${HestiaData.clients.length}
</p>


<p>
🧾 Devis : ${HestiaData.devis.length}
</p>


<p>
📅 Interventions : ${HestiaData.planning.length}
</p>


<br>


<button>
🧾 Nouveau devis
</button>


<button>
👥 Mes clients
</button>


<button>
🤖 Hermès
</button>


`;

}