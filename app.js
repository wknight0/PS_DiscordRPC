const fs = require('fs');
const ID = [CLIENT ID GOES HERE];
const DiscordRPC = require('discord-rpc');
const promptSync = require('prompt-sync')();
const client = new DiscordRPC.Client({ transport: 'ipc' });
var exec = require('child_process').exec;
var gameName = promptSync("Enter Game Name: ");

async function updateApplicationFile() {
  fs.writeFile( 
    "application.txt", 
    (gameName+",,"+ID), 
    function (err) { 
      if (err) { 
        return console.error(err); 
      } 
    } 
  );
}

async function obtainImageAddress() {
  exec("startObtainImage.bat");
  await delay(5000);
  await preparation();
}

async function changeApplicationName() {
  exec("startDiscordPortal.bat");
}

async function preparation() {
  await delay(10000);
  exec("startRPCActive.bat");
}

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

updateApplicationFile();
obtainImageAddress();
changeApplicationName();