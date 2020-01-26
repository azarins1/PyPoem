function calcPolitics(message) {
    const Republicans = [
        "trump",
        "pence",
        "second amendment",
        "wall",
        "president",
        "russia",
        "border wall",
        "trump's wall",
        "alabama",
        "bush"
    ];
    const Democrats = [
        "warren",
        "bernie",
        "pelosi",
        "hillary",
        "buttigeg",
        "mayor pete",
        "obama",
        "undocumented immigrants",
        "abortion",
        "sanctuary cities",
        "sanctuary city",
        "green new deal",
        "popular vote",
        "california"
    ];
    const positive = [
        "brilliant",
        "kind",
        "lifted",
        "improved",
        "help",
        "care",
        "protecting",
        "best",
        "innocent",
        "fear",
        "rejoice",
        "support",
        "healthy",
        "great",
        "friendly",
        "competent",
        "savior",
        "wonderful"
    ];
    const negative = [
        "nothing",
        "destroying",
        "abusing",
        "idiot",
        "lie",
        "liar",
        "ruining",
        "enemies",
        "bullying",
        "bully",
        "bullies",
        "harasses",
        "obese",
        "fat",
        "down",
        "bad",
        "trial",
        "fistfight",
        "infected",
        "guilty",
        "evil",
        "blame",
        "racist",
        "isis",
        "incompetent",
        "crook",
        "crooked",
        "imbecile",
        "bigot",
        "bigots",
        "bomb",
        "scum"
    ];
    const RepublicanVocabSlurs = [
        //What rude republicans call democrats
        "illegal aliens",
        "communists",
    ];
    const DemocratVocabSlurs = [
        //what rude democrats call republicans
        "kremlin",
        "kremlins",
        "nazis",
        "facist",
        "racial discrimination",
        "hate speech"
    ];
    const LostPower = [
        "out",
        "gone",
        "dead",
        "don't",
        "isn't",
        "doesn't"
    ];
    const WORSTwords = [
        "worse",
        "worst",
        "satan"
    ];
    const simmilar = [
        "as well",
        "also",
        "like",
        "neither",
        "as well"
    ];
    const window = 20;
    let lower = message.toLowerCase();
    let words = lower.split(/[\s!.,?"']+/);
    for (let i = 0; i < words.length; i++) {
        if (words[i].slice(-2) == "'s") {
            //Get rid of the 's
            console.log("Out with the 's");
            words[i].slice(-2);
        }
        if (simmilar.indexOf(String(words[i] + " " + words[i + 1])) != -1
            || Republicans.indexOf(String(words[i] + " " + words[i + 1])) != -1
            || Democrats.indexOf(String(words[i] + " " + words[i + 1])) != -1
            || RepublicanVocabSlurs.indexOf(String(words[i] + " " + words[i + 1])) != -1
            || DemocratVocabSlurs.indexOf(String(words[i] + " " + words[i + 1])) != -1) {

            //console.log(simmilar.indexOf(String(words[i] + " " + words[i + 1])));
            words[i] = words[i] + " " + words[i + 1];
            //words[i + 1] = "filler";
            console.log("converted a 2-word segment");
            //console.log(words);
        }
        if (simmilar.indexOf(String(words[i] + " " + words[i + 1] + " " + words[i + 2])) != -1
            || Republicans.indexOf(String(words[i] + " " + words[i + 1] + " " + words[i + 2])) != -1
            || Democrats.indexOf(String(words[i] + " " + words[i + 1] + " " + words[i + 2])) != -1
            || RepublicanVocabSlurs.indexOf(String(words[i] + " " + words[i + 1] + " " + words[i + 2])) != -1
            || DemocratVocabSlurs.indexOf(String(words[i] + " " + words[i + 1] + " " + words[i + 2])) != -1) {

            //console.log(simmilar.indexOf(String(words[i] + " " + words[i + 1])));
            words[i] = words[i] + " " + words[i + 1] + " " + words[i + 2];
            //words[i + 1] = "filler";
            console.log("converted a 3-word segment");
            //console.log(words);
        }
    }
    //console.log(words);
    let RepublicanPos = 99; //Low = Rep, High = Dem
    let DemocratPos = 99; //High = Rep, Low = Dem
    let RepublicanNeg = 99; //Low = Den, High = Rep
    let DemocratNeg = 99; //Low = Rep, High = Dem
    let RepublicanSlursUsed = 0;
    let DemocratSlursUsed = 0;
    let Bomb = "N";
    let AutoNeutral = false;
    //console.log(words);
    for (let i = 0; i < words.length; i++) {
        if (RepublicanVocabSlurs.indexOf(words[i]) != -1) {
            //console.log("Rs")
            RepublicanSlursUsed++;
        }
        if (DemocratVocabSlurs.indexOf(words[i]) != -1) {
            //console.log("Ds")
            DemocratSlursUsed++;
        }
        if (simmilar.indexOf(words[i]) != -1) {
            //console.log("simmilar initiated")
            //console.log("Ds")
            let Rprez = false;
            let Dprez = false;
            for (let t = 0; t < words.length; t++) {
                if (Republicans.indexOf(words[t]) != -1) {
                    Rprez = true;
                    //console.log("Republican found")
                } else if (Democrats.indexOf(words[t]) != -1) {
                    Dprez = true;
                    //console.log("Democrat found")
                }
            }
            if (Rprez == true && Dprez == true) {
                AutoNeutral = true;
                //console.log("This will definetly be neutral");
            }
        }
        if (WORSTwords.indexOf(words[i]) != -1) {
            let powerLost = false;
            for (let d = 1; d < window; d++) {
                if (LostPower.indexOf(words[i - d]) != -1 || LostPower.indexOf(words[i + d]) != -1) {
                    //This changes the state!
                    powerLost = true;
                }
                if (Republicans.indexOf(words[i - d]) != -1 || Republicans.indexOf(words[i + d]) != -1) {
                    if (powerLost == false) {
                        Bomb = "D";
                    } else {
                        Bomb = "R";
                    }
                    //We found the closest distance; let's end this
                    d = window;
                }
                if (Democrats.indexOf(words[i - d]) != -1 || Democrats.indexOf(words[i + d]) != -1) {
                    if (powerLost == false) {
                        Bomb = "R";
                    } else {
                        Bomb = "D";
                    }
                    //We found the closest distance; let's end this
                    d = window;
                }
            }
        }
        if (Republicans.indexOf(words[i]) != -1) {
            let powerLost = false;
            //Republican alert! Let's look for positive/negative word distances
            for (let d = 1; d < window; d++) {
                if (LostPower.indexOf(words[i - d]) != -1 || LostPower.indexOf(words[i + d]) != -1) {
                    //This changes the state!
                    powerLost = true;
                }
                if (positive.indexOf(words[i - d]) != -1 || positive.indexOf(words[i + d]) != -1) {
                    if (powerLost == false) {
                        RepublicanPos = d;
                    } else {
                        RepublicanNeg = d;
                    }
                    //We found the closest distance; let's end this
                    d = window;
                }
                if (negative.indexOf(words[i - d]) != -1 || negative.indexOf(words[i + d]) != -1) {
                    if (powerLost == false) {
                        RepublicanNeg = d;
                    } else {
                        RepublicanPos = d;
                    }
                    //We found the closest distance; let's end this
                    d = window;
                }
            }
        }
        if (Democrats.indexOf(words[i]) != -1) {
            //Republican alert! Let's look for positive/negative word distances
            for (let d = 1; d < window; d++) {
                if (positive.indexOf(words[i - d]) != -1 || positive.indexOf(words[i + d]) != -1) {
                    DemocratPos = d;
                    //We found the closest distance; let's end this
                    d = window;
                }
                if (negative.indexOf(words[i - d]) != -1 || negative.indexOf(words[i + d]) != -1) {
                    DemocratNeg = d;
                    //We found the closest distance; let's end this
                    d = window;
                }
            }
        }
    }
    let RepublicanScore = 0;
    let DemocratScore = 0;
    if (Bomb == "R") {
        RepublicanScore++;
    } else if (Bomb == "D") {
        DemocratScore++;
    }
    if (RepublicanSlursUsed > DemocratSlursUsed) {
        RepublicanScore++;
    } else if (RepublicanSlursUsed < DemocratSlursUsed) {
        DemocratScore++;
    }
    if (RepublicanPos > DemocratPos) {
        DemocratScore++;
    }
    if (RepublicanPos < DemocratPos) {
        RepublicanScore++;
    }
    if (RepublicanNeg > DemocratNeg) {
        RepublicanScore++;
    }
    if (RepublicanNeg < DemocratNeg) {
        DemocratScore++;
    }
    //console.log(RepublicanScore, RepublicanPos, RepublicanNeg, DemocratScore, DemocratPos, DemocratNeg);
    if (RepublicanScore > DemocratScore && AutoNeutral == false) {
        return "R";
    } else if (DemocratScore > RepublicanScore && AutoNeutral == false) {
        return "D";
    } else {
        return "N";
    }
    // let RepublicanScore = RepublicanPos + DemocratNeg
    // let DemocratScore = RepublicanNeg + DemocratPos;
    /*if (RepublicanScore < DemocratScore) {
        return "Republican";
    }
    if (RepublicanScore > DemocratScore) {
        return "Democrat";
    }
    if (RepublicanScore == DemocratScore) {
        return "Neutral";
    }*/
}
if (true) {
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("Starting session 1...");
    console.log("D" == calcPolitics("Trump is abusing his powers as president! We should all vote for warren!")); //Dem
    console.log("R" == calcPolitics("The undocumented immigrants are ruining our welfare system!")); //Rep
    console.log("R" == calcPolitics("Mrs. Warren is a liar!")); //Rep
    console.log("D" == calcPolitics("Trump's latest lie is the worst yet! #KickTrump2020")); //Dem
    console.log("N" == calcPolitics("Just toured the Buckingham park! #BestGardens")); //Neutral
    console.log("N" == calcPolitics("This is why I normally work alone!")); //Neutral
    console.log("D" == calcPolitics("When Trump is out of office, it will be the best day in history!")); //Dem
    console.log("R" == calcPolitics("Why is Warren running? Trump was bad, but Warren is gonna be worse!")); //Rep
    console.log("D" == calcPolitics("Get down, Mr. President!")); //Dem
    console.log("N" == calcPolitics("Trump's impeachment is of no concern to me.")); //Neutral
    console.log("N" == calcPolitics("Humanity is a failure. There's no point in life.")); //
    console.log("D" == calcPolitics("Russia was just confirmed to have a hand in the election! #TrumpisAFraud")); //
    console.log("N" == calcPolitics("Rump Dead! Body guard fails!")); //
    console.log("R" == calcPolitics("Hillary should be put on trial for her emails. #ArrestHillary!")); //
    console.log("N" == calcPolitics("Destiny is never left to chance")); //
    console.log("D" == calcPolitics("OMG Trump is confirmed to have lost his left collarbone in a fistfight!")); //
    console.log("D" == calcPolitics("The world needs to reset. Trump has infected this world for too long!")); //
    console.log("N" == calcPolitics("I don't give a damn aout anything.")); //
    console.log("End of session 1!");
    console.log("");
    console.log("");
    console.log("");
    console.log("Starting session 2...");
    console.log("N" == calcPolitics("If you want me bowing at your feet, you'll have to do it by force, scum!")); //
    console.log("D" == calcPolitics("This border plan will only worsen America's reputation! #BanBorderWall")); //
    console.log("R" == calcPolitics("It is just fear that causes Trump to do these things. Don't blame him for it!")); //
    console.log("N" == calcPolitics("Why can't everyone be at peace? There's no need for violence!")); //
    console.log("D" == calcPolitics("There's nothing that can be done about Trump's election, but I still doubt his success.")); //
    console.log("N" == calcPolitics("Hillary is not bad, and neither is Trump.")); //
    console.log("N" == calcPolitics(`Trump's favorite song is "My way"`)); //
    console.log("N" == calcPolitics(`Can you truly believe Hillary is a racist, when Trump is as well?`)); //
    console.log("D" == calcPolitics("Why is Trump revered as a savior of humanity? All he’s done is make big speeches with no action!"));
    console.log("N" == calcPolitics("Recent kamikaze jets have been confirmed to be some of Russia’s own air force")); //
    console.log("N" == calcPolitics("Good news. Trump and the other leaders have decided not to initiate WWIII, but there’s still tension and hatred towards our “President”."));
    console.log("N" == calcPolitics("I gave you a wild card, and it could turn the tables on Ted Cruz’s plans"));
    console.log("D" == calcPolitics("The Trump you know is a decoy. It’s actually someone else in that office. Someone worse than he."));
    console.log("N" == calcPolitics("Wakanda Forever!"));
    console.log("R" == calcPolitics("Warren is rumored to have passed on inside information to ISIS. This is treachery!"));
    console.log("R" == calcPolitics("Trump isn’t fully innocent, but he is certainly not guilty of betraying our country!"));
    console.log("D" == calcPolitics("Rejoice! Trump is out of office and Warren has taken control!"));
    //console.log("D" == calcPolitics("Rejoice! President Donald Trump is out of office and Warren has taken control!"));
    console.log("R" == calcPolitics("You may be more powerful, but Trump still has the support of the people!"));
    console.log("N" == calcPolitics("Can’t say anything about the man nowadays, Warren has wiped all memory of Trump in America."));
    console.log("D" == calcPolitics("The second amendment of the constitution is evil, causing preventable violence."));
    console.log("D" == calcPolitics("Thanks to Greta, we now have plans for a healthy Green new Deal!"));
    console.log("");
    console.log("Starting session 3...");
    console.log("");
    console.log("D" == calcPolitics("This is just crazy. Trump's plan is going to bomb completely."));
    console.log("N" == calcPolitics("Warren’s not who she seems. I wouldn’t be one to trust her completely."));
    console.log("N" == calcPolitics("No one knows who I am until I put on the mask. When I put on the mask, I become someone."));
    console.log("N" == calcPolitics("I heard that this new president isn’t like Trump or Clinton. He’s a totally different person."));
    console.log("N" == calcPolitics("If you do press the button, we’ll have to kill you, and we’ll stop those nukes ourselves"));
    console.log("D" == calcPolitics("Why does Trump even try? He doesn’t even care about humanity!"));
    console.log("R" == calcPolitics("Yes! Trump actually did it! He’s finished building that wall!"));
    console.log("D" == calcPolitics("We need an actual vote! One without aristocratic scum like Trump taking over!"));
    console.log("N" == calcPolitics("We’ve gotta believe in ourselves again! A country that has the people as its leader!"));
    console.log("R" == calcPolitics("Representatives of the states are the only things we need, we don’t need a popular vote from the people."));
    console.log("R" == calcPolitics("BodyGuard saves our lord and savior Trump!"));
    console.log("D" == calcPolitics("We must rise, brothers! Rise together to stop this racial discrimination!"));
    console.log("R" == calcPolitics("You must know, George Walker Bush is deciding to go for a second run as President! Isn’t that wonderful?"));
    console.log("R" == calcPolitics("Everything Obama’s done up till now is all for nothing! We need a real leader!"));
    console.log("R" == calcPolitics("Nobody cares about what Trump did, so how does protesting for his impeachment make a difference? I say he stays in office!"));
    console.log("N" == calcPolitics("We want a future where people can freely choose to vote and speak out for themselves! Not just some so-called representatives of the people!"));
}
