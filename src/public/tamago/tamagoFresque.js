
console.log("Salut c'est la fresque");

function loadFresque(leTxt){
    let drawsText = leTxt.split("\n");
    let draws = [];
    for(let i=0; i<drawsText.length; i++){
        if(drawsText[i].length == 399){
            let rows = drawsText[i].split("],[");
            let tableau = [];
            for(let l = 0; l<rows.length; l++){
                tableau.push(rows[l].replaceAll("[","").replaceAll("]","").split(",").map(function(item) {
                    return parseInt(item, 10);
                }));
            }
            draw(tableau);
        }
    }
}

function draw(tableau){
    let x = 8;
    let y = 24;

    //let table = document.getElementsByTagName("table")[0];
    let table = document.createElement("table");
    //table.innerText = "";
    //tableau = [];

    for(let i=0; i<x; i++){
        let tr = document.createElement("tr");
        for(let j=0; j<y; j++){
            let td = document.createElement("td");
            if(tableau[i][j] == 1) {
                td.classList.add("red");
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

function getFresqueFile(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://amaurygolo.com/tamagofresquefile", requestOptions)
        .then(response => response.text().then(text => loadFresque(text)))
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

getFresqueFile();