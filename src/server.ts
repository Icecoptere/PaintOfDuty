
import express, {Express, Request, Response} from 'express';
const path = require('path');
const request = require('request');
const fs = require('fs');
let https = require('follow-redirects').https;
let qs = require('querystring');
let bodyParser = require('body-parser');
import {Server, Socket} from 'socket.io';
const h = require('http');
//import Mainloop from './public/lib/mainloop/mainloop';

//const {json} = require("express");

// Synnv©
function rand(a:number, b:number) {
    a = Math.ceil(a);
    b = Math.floor(b+1);
    return Math.floor(Math.random() * (b - a) + a);
}

class Board {
    w :number;
    h :number;
    plateau :number[][];
    constructor(w:number, h:number){
        this.w = w;
        this.h = h;
        let r = [];
        for(let i=0; i<w; i++){
            let c = [];
            for(let j=0; j<h; j++){
                c.push(rand(0,1));
            }
            r.push(c);
        }
        this.plateau = r;
    }
}

class ThePaintServer {
    io :Server;
    socketId :String;
    listUsers : {[id: number] : any};
    board : Board;
    constructor() {
        this.socketId = "";
        this.board = new Board(20,20);
        const app:Express = express();
        const router = express.Router();
        const portNb = 4000;
        this.listUsers = {};
        let nbUsers = 0;
        // ajout de socket.io
        const server = h.Server(app);
        this.io = new Server(server);

        this.io.on('connection', (socket) =>{
            this.listUsers[nbUsers] = socket;
            console.log(`Connecté au client ${socket.id}`);
            this.socketId = socket.id;
            //module.exports.onEvent("newSocketConnection",socket);
            socket.on('my event', (data) =>{
                console.log("C'est my event");
                console.log(data['data']);
            });

            nbUsers += 1;

            socket.emit('sendBoard', JSON.stringify({ board: this.board.plateau }));

            socket.on('disconnect', () => {
                console.log("Le client "+socket.id+" vient de se déco");
            });

            socket.on('plzRefreshMeImThirstyFromPlateauKnowledge', () => {
                socket.emit('sendBoard', JSON.stringify({ board: this.board.plateau }));
            });
        });

        app.use(express.static(__dirname + '/public'));
        app.use(bodyParser.json({type: ["application/json"]}));

        router.get('/paint', async(req:Request, res:Response) => {
            console.log(typeof req);
            console.log(typeof res);
            res.sendFile(path.join(__dirname+'/public/paint/paint.html'));
        });

        app.use('/', router);

        server.listen(portNb);
        console.log(`Running TheImportantServer at Port ${portNb}`);
    }
}

let server:ThePaintServer = new ThePaintServer();