console.log("LEZTSGO");


let tableau = [];

function init(){
    let x = 8;
    let y = 24;

    let table = document.getElementsByTagName("table")[0];
    table.innerText = "";
    tableau = [];

    for(let i=0; i<x; i++){
        let tr = document.createElement("tr");
        let row = [];
        for(let j=0; j<y; j++){
            let td = document.createElement("td");
            td.onclick = function(){
                tableau[i][j] = !tableau[i][j];
                console.table(tableau);
                td.classList.toggle("red");
            }
            row.push(false);
            tr.appendChild(td);
        }
        tableau.push(row);
        table.appendChild(tr);
    }
}

function convertTableau(){
    for(let i=0; i<tableau.length; i++){
        for(let j=0; j<tableau[0].length; j++){
            tableau[i][j] = tableau[i][j] ? 1:0;
        }
    }
    return tableau;
}

function displayWasOk(wasOk){
    if(wasOk){
        document.querySelector("#statusDisplayer").textContent = "Le fichier a bien été envoyé";
    }else{
        document.querySelector("#statusDisplayer").textContent = "Y'a eu un blem, refresh ptet et admire ton dessin s’effacer lol ";
    }
}

function envoyerLinfo(){

    let xhr = new XMLHttpRequest();

    let url = "https://amaurygolo.com/tamago/sendThing";
    //let url = "http://localhost/tamago/sendThing";

    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => displayWasOk(JSON.parse(xhr.response)['Status'] == "worked");

    xhr.onerror = () => displayWasOk(false);

    xhr.send(JSON.stringify({
        'tableau' : convertTableau()
    }));

}

init();