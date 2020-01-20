/* 
 * Designed and Built by DxrkenedSky
 */
const Discord = require('discord.js');
const fs = require('fs');
const main = require("../main.js");

//JSON FILES
const linkJson = fs.readFileSync("./JSONS/GifLinks.json");
var content = JSON.parse(linkJson);


//GLOBAL VARIABLES
var sendGifBool = true;
var nat20Image = content.nat20;
var nat1Image = content.nat1;


exports.roll = function (args, msg) {

    if (args.length < 1) {
        msg.channel.send("Error! Use format !roll <number of dice> <number of sides> OR !roll <number of dice> <number of sides> <heal/attack> <character name>");
    }

    //This is the object that displays the rolls.
    var embed = new Discord.RichEmbed();

    var string = args[0];
    string = string.split('d');

    var numDice = string[0];
    var numSides = string[1];

    var final = '';
    var total = 0;

    var numbers = [];

    var nat1 = 0;
    var nat20 = 0;

    var lowRolls = []; //Rolls 1 - 5
    var belowAverageRolls = []; // Rolls 6 - 10
    var aboveAverageRolls = []; // Rolls 11 - 15
    var highRolls = []; // Rolls 16 - 20






    //THIS FOR LOOP ROLLS THE DICE
    for (var i = 0; i < numDice; i++) {
        var temp = (Math.floor(Math.random() * numSides) + 1);
        numbers[i] = temp;
        total += temp;

        //Low Rolls
        if (temp >= 1 && temp <= 5) {
            lowRolls.push(temp);
        }

        //Below Average Rolls 
        if (temp >= 6 && temp <= 10) {
            belowAverageRolls.push(temp);
        }

        //Above Average Rolls
        if (temp >= 11 && temp <= 15) {
            aboveAverageRolls.push(temp);
        }

        //High Rolls
        if (temp >= 16 && temp <= 20) {
            highRolls.push(temp);
        }

        //Count Nat 1's
        if (temp === 1) {
            nat1 += 1;
        }

        //Count Nat 20's
        if (temp === 20) {
            nat20 += 1;
        }

        var f = temp.toString();
        final += ', ' + f;

    } // END OF FOR LOOP



    



    //Total Number Rolled
    if (args.includes("total")) {
        if (numDice > 1) {
            embed.addField("Total Rolled:", total);
        }
    }
    
    if(args.includes('mod')) {
        var modifier = parseInt(args[args.indexOf('mod') + 1]);
        console.log("The Modifier is " + modifier);
        
        var intFinal = parseInt(final);
        console.log("Variable intFinal is " + intFinal);
        
    }

    var buildString = function () {
        var line1 = "Total Rolls: " + numDice.toString() + "\n";
        var line2 = "------------------------------------------------------------" + "\n";
        var line3 = ((nat20 / numDice) * 100).toString() + "% | " + nat20.toString() + " | Nat 20's" + "\n";
        var line4 = ((nat1 / numDice) * 100).toString() + "% | " + nat1.toString() + " | Nat 1's" + "\n";
        var line5 = line2 + "\n";
        var line6 = ((highRolls.length / numDice) * 100).toString() + "% | " + highRolls.length.toString() + " | High" + "\n";
        var line7 = ((aboveAverageRolls.length / numDice) * 100).toString() + "% | " + aboveAverageRolls.length.toString() + " | Above Average" + "\n";
        var line8 = ((belowAverageRolls.length / numDice) * 100).toString() + "% | " + aboveAverageRolls.length.toString() + " | Below Average" + "\n";
        var line9 = ((lowRolls.length / numDice) * 100).toString() + "% | " + lowRolls.length.toString() + " | Low" + "\n";
        var line10 = line2 + "\n";

        var finalString = line1 +
                line2 +
                line3 +
                line4 +
                line5 +
                line6 +
                line7 +
                line8 +
                line9 +
                line10;

        return finalString;

    };

    //Perform analysis on the numbers rolled
    if (args.includes("analysis")) {
        var average = (total / numDice);
        embed.addField("Average:", average);

        msg.channel.send("```" + buildString() + "```");
    }


    if (sendGifBool === true && numSides === '20') {
        console.log("Worked");

        if (numbers.includes(20)) {
            embed.setImage(nat20Image);
        }

        if (numbers.includes(1)) {
            embed.setImage(nat1Image);
        }
    }
    
    embed.setTitle("Dice Roller");
    embed.setColor('#6e1e9c');
    embed.setThumbnail('https://i.imgur.com/OJ8f02w.jpg');
    embed.addField("Numbers Rolled:", final.substring(1));

    console.log(numbers);
    msg.channel.send(embed);

};

exports.sendGif = function (args, msg) {
    if (msg.member.hasPermission("ADMINISTRATOR")) {
        sendGifBool = !sendGifBool;
        msg.channel.send("```Toggled Gifs to " + sendGifBool.toString() + "```");
    }

    if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.channel.send("```You do not have permission to perform this command!```");
    }

};

//UNFINISHED
exports.gifChange = function (args, msg) {

    if (msg.member.hasPermission("ADMINISTRATOR")) {

        var jsonString = JSON.stringify(content);
        var trueContent = JSON.parse(jsonString);

        var ImageView = new Discord.RichEmbed();
        ImageView.setTitle("Updated Image");

        var nat20or1 = args[0];
        var link = args[1];

        var state = null;

        if (nat20or1 === '1') {
            trueContent.nat1 = link;
            console.log(trueContent);
            state = 1;
        }

        if (nat20or1 === "20") {
            trueContent.nat20 = link;
            console.log(trueContent);
            state = 20;
        }

        var final = JSON.stringify(trueContent);
        var finalJson = JSON.parse(final);

        fs.writeFile("./JSONS/GifLinks.json", final, function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

        if (state === 1) {
            ImageView.setImage(content.nat1);
        } else if (state === 20) {
            ImageView.setImage(content.nat20);
        }

        msg.channel.send(ImageView);
        
        
        main.reset();

    } else {
        msg.channel.send("```You don't have permission to run this command!");
    }
};


exports.testNat20 = function (args, msg) {

    var embed = new Discord.RichEmbed();
    embed.setImage(nat20Image);
    msg.channel.send(embed);

};

exports.testNat1 = function (args, msg) {

    var embed = new Discord.RichEmbed();
    embed.setImage(nat1Image);
    msg.channel.send(embed);

};


/*
 * {
 
 "nat1" : "https://media.giphy.com/media/1eExO6YeWuh5v7beZy/giphy.gif",
 "nat20" : "https://media.giphy.com/media/1F5DWIbVqi8BzMDcKh/giphy.gif",
 
 "nat1Default" : "https://media.giphy.com/media/1eExO6YeWuh5v7beZy/giphy.gif",
 "nat20Default" : "https://media.giphy.com/media/1F5DWIbVqi8BzMDcKh/giphy.gif"
 
 }
 */

