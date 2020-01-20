/* 
 * Designed and Built by DxrkenedSky, Copyright Funeral Moon Development
 */

const Discord = require("discord.js");
const client = new Discord.Client();

//Command Files, Import Here
const Roll = require('./Commands/RollCommand.js');
const Help = require('./Commands/HelpCommand.js');
const Meme = require('./Commands/MemeCommand.js');
const Pickup = require('./Commands/PickupCommand');
const WildMagic = require('./Commands/WildMagicCommand');

client.on('ready', () => {
    console.log('connected as ' + client.user.username);
    WildMagic.readText();

});


client.on('message', (msg) => {
    if (msg.author === client.user) { // Prevent bot from responding to its own messages
        return;
    }

    if (msg.content.startsWith(".")) {
        processCommand(msg);
    }

});

function processCommand(msg) {
    let fullCommand = msg.content.substr(1); // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0]; // The first word directly after the exclamation is the command
    let args = splitCommand.slice(1); // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand);
    console.log("Arguments: " + args); // There may not be any arguments

    //Command Handling
    switch (primaryCommand) {

        case 'help' :
            Help.helpMessage(args, msg);
            break;
        case 'roll' :
            Roll.roll(args, msg);
            break;
        case 'giftoggle' :
            Roll.sendGif(args, msg);
            msg.delete(100);
            break;
        case 'testnat20' :
            Roll.testNat20(args, msg);
            break;
        case 'testnat1' :
            Roll.testNat1(args, msg);
            break;
        //case 'gifchange' :
          //  Roll.gifChange(args, msg);
            //break;
        case 'meme' :
            msg.channel.send("```I SUMMON THE DANKEST OF MEMES```");
            Meme.meme(client, msg, args);
            break;
        case 'beans' :
            Meme.beans(client, msg, args);
            break;
        case 'about' :
            Help.about(msg, args);
            break;
        case 'hitonme' :
            Pickup.pickup(msg);
            break;
        case 'wildmagic' :
            WildMagic.sendRandomSpell(msg, args);
            break;
            

    }
}

exports.reset = function() {
    client.destroy();
    client.login('NjUxNDYxODI3MjUwNjE4Mzg3.XfFDaw.MKxhMH-j_rOAfeD65z_zFol0mUg');
};

client.login('NjUxNDYxODI3MjUwNjE4Mzg3.XiJQSw.QO8vKPlGZZK17NLUt0uj3D0Bjew');