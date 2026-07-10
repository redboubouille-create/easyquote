// Initialisation Telegram
const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

// Données du devis
const devis = {
    prestation: "",
    surface: "",
    frequence: "",
    occupants: "",
    animaux: "",
    pieces: "",
    sallesBain: "",
    options: [],
    commentaire: ""
};

let etape = 0;

// Questions
const questions = [
    {
        titre: "Quel type de prestation ?",
        champ: "prestation",
        choix: [
            "🧹 Ménage classique",
            "🏠 Airbnb",
            "🏢 Professionnel"
        ]
    },
    {
        titre: "Quelle surface ?",
        champ: "surface",
        choix: [
            "-50 m²",
            "50 - 100 m²",
            "+100 m²"
        ]
    },
    {
        titre: "Quelle fréquence ?",
        champ: "frequence",
        choix: [
            "Ponctuel",
            "Chaque semaine",
            "Tous les 15 jours",
            "Mensuel"
        ]
    },
    {
        titre: "Nombre d'occupants ?",
        champ: "occupants",
        choix: [
            "1 personne",
            "2 personnes",
            "3-4 personnes",
            "5+ personnes"
        ]
    },
    {
        titre: "Animaux présents ?",
        champ: "animaux",
        choix: [
            "Aucun",
            "Chat",
            "Chien",
            "Plusieurs"
        ]
    },
    {
        titre: "Combien de pièces possède le logement ?",
        champ: "pieces",
        choix: [
            "Studio / T1",
            "2-3 pièces",
            "4-5 pièces",
            "6 pièces ou plus"
        ]
    },
    {
        titre: "Combien de salles de bain ?",
        champ: "sallesBain",
        choix: [
            "1",
            "2",
            "3 ou plus"
        ]
    }
];

const container = document.querySelector(".container");
const startBtn = document.getElementById("startBtn");

// Lancement
startBtn.addEventListener("click", afficherQuestion);

// Affichage d'une question
function afficherQuestion(){

    const q = questions[etape];

    const pourcentage=((etape)/questions.length)*100;

    container.innerHTML=`

    <div class="progress-bar">
        <div class="progress-fill" style="width:${pourcentage}%"></div>
    </div>

    <div class="progress">
        Étape ${etape+1}/${questions.length}
    </div>

    <h2 class="question">
        ${q.titre}
    </h2>

    ${q.choix.map(c=>`

        <button class="choice"
        onclick="reponse('${c}')">

        ${c}

        </button>

    `).join("")}

    ${etape>0?`
        <button class="back-btn"
        onclick="retour()">
        ⬅ Retour
        </button>
    `:""}

    `;
}

// Réponse utilisateur
function reponse(valeur) {

    const champ = questions[etape].champ;

    devis[champ] = valeur;

    etape++;

    if (etape < questions.length) {
        afficherQuestion();
    } else {
        afficherOptions();
    }
}

// Options supplémentaires
function afficherOptions(){

container.innerHTML=`

<div class="progress-bar">

<div class="progress-fill"
style="width:100%">
</div>

</div>

<h2 class="question">

Options souhaitées

</h2>

<label class="option">
<input type="checkbox" value="Vitres">
🪟 Vitres
</label>

<label class="option">
<input type="checkbox" value="Four">
🔥 Four
</label>

<label class="option">
<input type="checkbox" value="Réfrigérateur">
❄️ Réfrigérateur
</label>

<label class="option">
<input type="checkbox" value="Repassage">
👔 Repassage
</label>

<label class="option">
<input type="checkbox" value="Lessive">
🧺 Lessive
</label>

<textarea
id="commentaire"
placeholder="Informations complémentaires..."></textarea>

<button onclick="finOptions()">

Continuer

</button>

`;
}

// Ajout d'une option
function ajouterOption(option) {

    if (!devis.options.includes(option)) {
        devis.options.push(option);
    }

}

// Fin des options
function finOptions(){

devis.options=[];

document
.querySelectorAll("input[type='checkbox']")
.forEach(box=>{

if(box.checked){

devis.options.push(box.value);

}

});

devis.commentaire=
document
.getElementById("commentaire")
.value;

afficherResume();

}

// Résumé
function afficherResume() {

    container.innerHTML = `

        <h2>Votre demande</h2>

        <div class="summary">

            <p><b>Prestation :</b> ${devis.prestation}</p>
            <p><b>Surface :</b> ${devis.surface}</p>
            <p><b>Fréquence :</b> ${devis.frequence}</p>
            <p><b>Occupants :</b> ${devis.occupants}</p>
            <p><b>Animaux :</b> ${devis.animaux}</p>
            <p><b>Pièces :</b> ${devis.pieces}</p>
            <p><b>Salles de bain :</b> ${devis.sallesBain}</p>
            <p><b>Options :</b> ${devis.options.join(", ") || "Aucune"}</p>
            <p><b>Commentaire :</b><br>
${devis.commentaire || "Aucun"}
</p>

        </div>

        <button onclick="envoyerTelegram()">
            Recevoir mon devis
        </button>

    `;

}

// Envoi à Telegram
function envoyerTelegram() {

    console.log(devis);

    tg.sendData(JSON.stringify(devis));

}
function retour(){

    if(etape>0){

        etape--;

        afficherQuestion();

    }

}