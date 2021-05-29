#!/usr/bin/env node
let inputArr = process.argv.slice(2);
const treeFn = require("./commands/tree");
const organizeFn = require("./commands/organize");
const helpFn = require("./commands/help");

let command = inputArr[0];

switch(command){
    case "tree": 
        treeFn(inputArr[1]); // dir path
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("Command Not Found");
        break;
}




