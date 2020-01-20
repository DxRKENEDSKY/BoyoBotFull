/* 
 * Designed and Built by DxrkenedSky
 */

const Discord = require('discord.js');

exports.pickup = function(msg) {
    
    var pickuplines = [
        
        "On a scale of 1 - 20 you're a natural 20",
        "Ore you a druid? Because your shape drives me crazy",
        "I must be a paladin, because you make me want to use lay on hands",
        "My favorite terrain is your underdark",
        "You must be a wizard, because I've fallen under your spell",
        "Give me skin",
        "Are you a vampire? Because I want you to kiss my neck",
        "I know mass polymorph, want to go at it like rabbits tonight?",
        "Please tell me you're not a mimic, because that chest is too good to be true.",
        "Are you proficient in marshal weapons? Because I'd love for you to get your hands on my greatsword",
        "I hope you're vulnerable to, piercing damage :wink:",
        "You know, I'm thinking about multiclassing into cleric, because you make me want to get on my knees"
        
        
    ];
        
    var num = Math.ceil(Math.random() * pickuplines.length);
    console.log(num);
    console.log(pickuplines.length);
    
    msg.reply(pickuplines[num]);
        
 
    
};
