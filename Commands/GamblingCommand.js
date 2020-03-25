/* 
 Copyright DxRKENEDSKY, Funeral Moon Development
 */

const Discord = require("discord.js");
let bet = 0;
let num = 0;

let message;

exports.ContestingDice = function (msg, args) {

    let modifier = args[0];
    message = msg;

    if (modifier === "start") {

        let embed = new Discord.RichEmbed();
        embed.setTitle("Death Rolling");
        embed.setThumbnail("https://i.imgur.com/7svqWeG.jpeg");

        bet = args[1];
        embed.addField("Current Bet:", bet);
        num = bet;
        console.log(num);
        
        msg.channel.send(embed);
    }

    if (modifier === "roll") {

        roll();
    }

}

function roll() {
    
    if(num === 1) {
        message.channel.send("Game Complete! Please place a new bet.");
        return;
    }
    
    let embed = new Discord.RichEmbed();
        embed.setTitle("Death Rolling");
        embed.setThumbnail("https://i.imgur.com/7svqWeG.jpeg");

        var temp = (Math.floor(Math.random() * num) + 1);
        embed.addField("Current Bet:", bet);
        embed.addField("Last Number Rolled:", num);
        embed.addField("Number Rolled:", temp);
        
        num = temp;
        
        message.channel.send(embed);
}
