
console.log("Salut c'est moi le script lol");

let tableau = [];

class PaintClient{

  constructor() {
    this.previousX = 8394893;
    this.isConnected = false;
    this.connectionTries = 0;

    this.connectToServer();
    this.doLogin();

    this.socket.on('close', function(){
      this.isConnected = false;
      this.connectionTries = 0;
      this.doLogin();
    });

    this.socket.on('connect', _=> {
      this.isConnected = true;
      console.log("Oui on est connecté c'est la fête au village");
      this.doT();
    });

    this.socket.on('sendBoard', (data) => {
      let plateau = JSON.parse(data)['board'];
      this.refresh(plateau);
    });

  }

  askForRefresh(){
    this.socket.emit('plzRefreshMeImThirstyFromPlateauKnowledge', {data: 'true'});
  }

  doT(){
    this.socket.emit('my event', {data: 'I\'m connected!'});
  }

  connectToServer() {
    this.socket = io("ws://localhost:4000");
    this.connectionTries++;
  }


  doLogin() {
    let connectionInterval = setInterval(function () {
      if (!this.isConnected && this.connectionTries <= 3) {
        this.connectToServer();
      }
      else {
        clearInterval(connectionInterval);
      }
      if (this.connectionTries > 3) {
        console.log("Connection to server timeout");
      }
    }, 6000);
  }

  refresh(plateau){
    console.table(plateau);
    let table = document.getElementsByTagName("table")[0];
    table.innerText = "";
    tableau = [];

    let x = plateau.length;
    let y = plateau[0].length;

    for(let i=0; i<x; i++){
      let tr = document.createElement("tr");
      let row = [];
      for(let j=0; j<y; j++){
        let td = document.createElement("td");
        td.onclick = function(){
          tableau[i][j] = !tableau[i][j];
          td.classList.toggle("red");
        }
        if(plateau[i][j] === 1){
          td.classList.toggle("red");
        }
        row.push(plateau[i][j] === 1 ? true : false);
        tr.appendChild(td);
      }
      tableau.push(row);
      table.appendChild(tr);

    }
  }
}

let pc = new PaintClient();

