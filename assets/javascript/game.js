var hangman = {

    planets: ["MERCURY", "EARTH", "MARS", "SATURN", "JUPITER", "VENUS", "NEPTUNE", "URANUS", "PLUTO"], //set up array of words
    
    // ****************** PLUTO IS STILL A PLANET *******************

    word: "", //set word as empty string
    blanks: "", //initialize blanks

    wins: "", //wins

    guessed: [], //all guessed letters

    newWord: function () {
        //Picking a new word
        var wordIndex = Math.floor((Math.random() * 9)); //pick random number from 1-9
        word = this.planets[wordIndex]; //pick the planet at the random index
        console.log(wordIndex, word);

        //reset 
        blanks = "";
        guessed = [];
        document.getElementById("guesses").innerHTML="";
        console.log (guessed);

        //write blanks
        for (i = 0; i < word.length; i++) {
            blanks = blanks + " _ ";
        };

        // write blanks to div
        document.getElementById("word").textContent = blanks;
        console.log(blanks);
    },

    guess: function (letter) {

        //ensure letter is uppercase
        letter = letter.toUpperCase();

        //check if it's guessed yet
        if (guessed.includes(letter)) {
            console.log("already guessed: "+ guessed);
            alert("You already guessed that!");
        }
        // check if it's wrong
        else if (word.includes(letter) != true) {

            // add to array of guessed letters
            guessed.push(letter);

            // create a li element with letter in it
            var wrong = document.createElement("li");
            wrong.innerHTML = letter;

            // put li element in slot
            document.getElementById("guesses").appendChild(wrong);
        }
        // else it must be right
        else {

            //add to array of guessed
            guessed.push(letter);

            //initialize an array of correct indices
            var indices = [];
            //iterate through word to see collect correct indices
            for (i = 0; i < word.length; i++) {
                checkLetter = word[i];
                if (checkLetter === letter) {
                    indices.push(i);
                }
            }

            //replace blanks at indices with word at indices
            for (i = 0; i < indices.length; i++) {
                index = indices[i];

                //initialize an array to replace the blanks
                var blanksArray = [];
                blanks = ""
                
                console.log("guessed letters: " + guessed);
                console.log("the letter at that index is " + word[index]);

                // write the word to the blanks array
                for (i=0;i<word.length;i++){

                    //if the letter has been guessed, add it to the array
                    if (guessed.includes(word[i])) {
                        blanksArray.push(word[i]);
                        console.log("you found a new letter, it's " + word[index]);
                    }
                        else {
                            blanksArray.push(" _ ");
                            console.log("already guessed");
                        }
                    blanks = blanks + blanksArray[i];
                }

                if (blanks.includes(" _ ") != true) {
                    hangman.win();
                }

                console.log(blanks);

                //write to doc
                document.getElementById("word").textContent = blanks;
            }
        }
    },

    win: function () {
        //set variable to hold image
        var planetPic = ""

        switch (blanks) {
            case "MERCURY":
                planetPic = "http://www.stickpng.com/assets/images/580b585b2edbce24c47b2709.png";
                break;
            case "EARTH":
                planetPic = "http://pngimg.com/uploads/earth/earth_PNG11.png";
                break;
            case "MARS":
                planetPic = "";
                break;
            case "SATURN":
                planetPic = "";
                break;
            case "JUPITER":
                planetPic = "";
                break;
            case "VENUS":
                planetPic = "";
                break;
            case "NEPTUNE":
                planetPic = "";
                break;
            case "URANUS":
                planetPic = "";
                break;
            case "PLUTO":
                planetPic = "";
                break;
            default:
                break;
        }

        document.getElementById("planetPic").setAttribute("src",planetPic);

        //game resets after 1 second
        setTimeout(function(){
            hangman.newWord();
        },1000);
    },
};

hangman.newWord();

document.getElementById("newWord").addEventListener("click", function () {
    hangman.newWord();
});

document.addEventListener("keydown", function (event) {
    console.log(event.which);
    guessedLetter = String.fromCharCode(event.which);
    console.log(guessedLetter);
    hangman.guess(guessedLetter);
});