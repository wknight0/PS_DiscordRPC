const fs = require('fs');
const ID = [CLIENT ID GOES HERE];
const DiscordRPC = require('discord-rpc');
const client = new DiscordRPC.Client({ transport: 'ipc' });
var gameName;
var image;
var text;
var time;

fs.readFile("application.txt", function (err, data) { 
    if (err) { 
      return console.error(err); 
    } 
    let tempArray = (data.toString().split(","));
    gameName = tempArray[0];
});

fs.readFile("imageAddress.txt", async function (err, data) {
    if (err) {
      return console.error(err); 
    } 
    image = data.toString();
  });

text = "Running on PlayStation Emulator";
time = Date.now();

DiscordRPC.register(ID);

async function activity() {
    if (!client) return;

    client.setActivity({
        details: text,
        largeImageKey: image,
        instance: false,
        startTimestamp: time
    })
}

client.on('ready', async () => {
    activity();

    setInterval(() => {
        activity();
    }, 1000);
});

client.login({ clientId: ID }).catch(err => console.error(err));