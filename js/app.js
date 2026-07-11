document.addEventListener("DOMContentLoaded", () => {

    demarrerHestia();

});


function demarrerHestia(){

    const container = document.querySelector(".container");

    container.innerHTML = `

    <h1>🏛️ Hestia</h1>

    <p>
    Bienvenue dans votre assistant professionnel.
    </p>


    <button onclick="ouvrirDevis()">
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



function ouvrirDevis(){

    alert("Module Athéna : devis bientôt connecté");

}