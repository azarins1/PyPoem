const Nouns = ["sorrow", "breath", "heart", "fate", "love", "time", "life", "death", "light", "plight"];
const Locations = ["hell", "paradise", "bed"];
const Verbs = ["pierces", "casts", "shatters", "manipulates"];
const AbsVerbs = ["care for", "lift", "cradle", "seduce", "love"];
const INGVerbs = ["sucking", "grinding", "seducing", "dying", "longing"];
const Adjectives = ["sweet", "bitter", "uncertain", "delicate", "teeming", "crippled", "cruel"];
const Adverbs = ["swiftly", "delicately", "slowly"];
const Pronouns = ["he", "she", "it"];
const Conjunctions = ["and", "or", "but", "however"];
const Prepositions = ["in", "of", "before", "after"]; 
const Interjections = ["oh", "dear", "God"];
const Tu = ["love", "goddess", "maiden"];
const You = ["fellow", "sir", "mortal"]; 
const Swear = ["witch", "fiend"];
const Desire = ["desire", "heart's content"];
const Nothing = ["shadows", "cobwebs", "little"];
const Me = ["me", "my"];
/*
    STRUCTURE code names
    N -> Nouns
    V -> Verbs
    G -> -ING Verbs
    A -> Adjectives
    D -> Adverbs
    P -> Pronouns (s/he)
    C -> Conjunctions
    R -> Prepositions
    I -> Interjections
    M -> Me! (my/mine)
    B -> Abstract Verbs
    T -> Tu(you)
    L -> Locations [NOUNS]
    S -> Swear
    E -> Desire
    Z -> Nothing

    * -> End of a line
    All lower-case letters correspond with the uppercase counterparts; they just 
*/
const structures = [
    `
    N*
    I,[how]PV[me]*
    G[my]AN*
    RA[times]*
    *
    B[me]AT,*
    ITR[the seas]*
    [my]N[is]G*
    [for you],IT*
    `,
    `
    [your]N[is]G*
    g[so]D*
    [for what is]N*
    R[your]AN?*
    *
    [your]n[is]A*
    [always]G[me]*
    [to your fullest]*
    IY,[may you rot in]L*
    `,
    `
    [leave my]L,*
    [mortal]S!*
    [I]B[you],*
    [you never]b[back]*
    *
    [Your]ANV[me],*
    [leaving]Z[to my]E*
    `
];
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
function random(type){
    //getRandomInt(type.length);
    return (" " + type[getRandomInt(type.length)]);
}
let frame = structures[getRandomInt(structures.length)];
//Line below is for testing purposes only.
frame = structures[2];
let currentLine = "";
console.log("");
let lastINGVerb = "";
let lastNoun = "";
let lastAdverb = "";
for(let i = 0; i < frame.length; i++){
    if(frame[i] == "N"){
        lastNoun = random(Nouns)
        currentLine += lastNoun;
    } else if(frame[i] == "n"){
        currentLine += lastNoun;
    } else if(frame[i] == "S"){
        currentLine += random(Swear);
    } else if(frame[i] == "Z"){
        currentLine += random(Nothing);
    } else if(frame[i] == "E"){
        currentLine += random(Desire);
    } else if(frame[i] == "L"){
        currentLine += random(Locations);
    } else if(frame[i] == "V"){
        currentLine += random(Verbs);
    } else if(frame[i] == "A"){
        currentLine += random(Adjectives);
    } else if(frame[i] == "D"){
        currentLine += random(Adverbs);
    } else if(frame[i] == "P"){
        currentLine += random(Pronouns);
    } else if(frame[i] == "C"){
        currentLine += random(Conjunctions);
    } else if(frame[i] == "R"){
        currentLine += random(Prepositions);
    } else if(frame[i] == "I"){
        currentLine += random(Interjections);
    } else if(frame[i] == "M"){
        currentLine += random(Me);
    } else if(frame[i] == "T"){
        currentLine += random(Tu);
    } else if(frame[i] == "Y"){
        currentLine += random(You);
    } else if(frame[i] == ","){
        currentLine += ",";
    } else if(frame[i] == "!"){
        currentLine += "!";
    } else if(frame[i] == "?"){
        currentLine += "?";
    } else if(frame[i] == "B"){
        lastAdverb = random(AbsVerbs);
        currentLine += lastAdverb;
    } else if(frame[i] == "b"){
        currentLine += lastAdverb;
    } else if(frame[i] == "G"){
        lastINGVerb = random(INGVerbs);
        currentLine += lastINGVerb;
    }  else if(frame[i] == "g"){
        //This will repeat the last -ing verb
        currentLine += lastINGVerb;
    } else if(frame[i] == "*"){
        console.log(currentLine);
        currentLine = "";
    } else if(frame[i] == "["){
        currentLine += " ";
        for (let v = 1; v < 100; v++){
            if(frame[i + v] == "]"){
                //currentLine += " ";
                i = i + v;
                v = 100;
            } else {
            currentLine += frame[i + v];
            }
        }
    }
}
console.log("");
//console.log(structures[0])
