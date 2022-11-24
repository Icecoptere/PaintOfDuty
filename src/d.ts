/**
 * To create a fresh new Node.js project with Typescript
 *
 * At root folder :
 * > npm init -y
 * > npm install typescript --save-dev
 * > npm install @types/node --save-dev
 *
 * To create the tsconfig-old.json file:
 * > npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true
 *
 * To install nodemon:
 * > npm install --save-dev ts-node nodemon
 *
 * Create /nodemon.json with :
 * {
 *   "watch": ["src"],
 *   "ext": ".ts,.js",
 *   "ignore": [],
 *   "exec": "ts-node ./src/index.ts"
 * }
 *
 * To install rimraf (to allow to wipe directory)
 * > npm install --save-dev rimraf
 *
 * Add script to package.json :
 *  "start": "npm run build && node build/index.js",
 *  "start:dev": "nodemon",
 *  "build": "rimraf ./build && tsc"
 *
 * Add sources files to /src/
 *
 * Done !
 *
 * Execute:
 * > npm run start      (to compile & execute the built code)
 * > npm run start:dev  (to monitor and restart on each file changes)
 * > npm run build      (to compile)
 *
 * Optional : TSLint(for code style)
 * > npm install tslint --save-dev
 * > tslint --init
 * tsconfig-old.json:
 * {
 *     "defaultSeverity": "warn",
 *     "extends": [
 *         "tslint:recommended"
 *     ],
 *     "jsRules": {
 *         "no-console": false,
 *         "semicolon": [true, "always"]
 *     },
 *     "rules": {
 *         "no-console": false,
 *         "semicolon": [true, "always"]
 *     },
 *     "rulesDirectory": []
 * }
 * Add script to package.json (or let the IDE do it) :
 */
// "lint": "tslint -c tslint.json 'src/**/*.ts' "


import {randomInt} from "crypto";

let message: string = 'Hello, World!';
console.log(message);

class App_Cake{
    constructor()
    {
        console.log("constructed!");
    }
}

let c:boolean = randomInt(0, 1) == 1;
let pop = new App_Cake();
if (c)
{
    console.log('acacia');
}