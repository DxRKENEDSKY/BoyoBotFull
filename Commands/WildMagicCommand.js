//Copyright DxRKENEDSKY, Funeral Moon Development

const fs = require('fs');
const Discord = require("discord.js");
var magicFile = './wildmagic.txt';

var lines;
var arr;

exports.readText = function () {

    lines = fs.readFileSync(magicFile, 'utf8', (err, data) => {
    if (err)
        throw err;
    console.log(data.toString());
});

arr = lines.split('\n');
console.log(arr[0]);

};


exports.sendRandomSpell = function(msg, args) {
    
    var embed = new Discord.RichEmbed();
    embed.setTitle("Boyo's Wild Magic");
    
    var random = parseInt(Math.random() * arr.length - 100);
    embed.addField("Spell:", arr[random].substring(5));
    msg.channel.send(embed);
    
    //msg.channel.send(arr[random]);
    
};