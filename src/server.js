"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require('path');
const request = require('request');
const fs = require('fs');
let https = require('follow-redirects').https;
let qs = require('querystring');
let bodyParser = require('body-parser');
const socket_io_1 = require("socket.io");
const h = require('http');
//import Mainloop from './public/lib/mainloop/mainloop';
//const {json} = require("express");
// Synnv©
function rand(a, b) {
    a = Math.ceil(a);
    b = Math.floor(b + 1);
    return Math.floor(Math.random() * (b - a) + a);
}
class Board {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        let r = [];
        for (let i = 0; i < w; i++) {
            let c = [];
            for (let j = 0; j < h; j++) {
                c.push(rand(0, 1));
            }
            r.push(c);
        }
        this.plateau = r;
    }
}
class ThePaintServer {
    constructor() {
        this.socketId = "";
        this.board = new Board(20, 20);
        const app = (0, express_1.default)();
        const router = express_1.default.Router();
        const portNb = 4000;
        this.listUsers = {};
        let nbUsers = 0;
        // ajout de socket.io
        const server = h.Server(app);
        this.io = new socket_io_1.Server(server);
        this.io.on('connection', (socket) => {
            this.listUsers[nbUsers] = socket;
            console.log(`Connecté au client ${socket.id}`);
            this.socketId = socket.id;
            //module.exports.onEvent("newSocketConnection",socket);
            socket.on('my event', (data) => {
                console.log("C'est my event");
                console.log(data['data']);
            });
            nbUsers += 1;
            socket.emit('sendBoard', JSON.stringify({ board: this.board.plateau }));
            socket.on('disconnect', () => {
                console.log("Le client " + socket.id + " vient de se déco");
            });
            socket.on('plzRefreshMeImThirstyFromPlateauKnowledge', () => {
                socket.emit('sendBoard', JSON.stringify({ board: this.board.plateau }));
            });
        });
        app.use(express_1.default.static(__dirname + '/public'));
        app.use(bodyParser.json({ type: ["application/json"] }));
        router.get('/paint', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(typeof req);
            console.log(typeof res);
            res.sendFile(path.join(__dirname + '/public/paint/paint.html'));
        }));
        app.use('/', router);
        server.listen(portNb);
        console.log(`Running TheImportantServer at Port ${portNb}`);
    }
}
let server = new ThePaintServer();
