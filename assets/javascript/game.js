var hangman = {

    planets: ["MERCURY", "EARTH", "MARS", "SATURN", "JUPITER", "VENUS", "NEPTUNE", "URANUS", "PLUTO"], //set up array of words
    
    // ****************** PLUTO IS STILL A PLANET *******************

    word: "", //set word as empty string
    blanks: "", //initialize blanks

    winNum: 0, //wins
    remain: 5, //guesses left

    guessed: [], //all guessed letters

    newWord: function () {
        //Picking a new word
        var wordIndex = Math.floor((Math.random() * 9)); //pick random number from 1-9
        word = this.planets[wordIndex]; //pick the planet at the random index
        console.log(wordIndex, word);

        //reset 
        blanks = "";
        guessed = [];
        this.remain = 5;
        document.getElementById("guessesLeft").textContent = this.remain; //NOT WORKING
        document.getElementById("guesses").innerHTML="";
        document.getElementById("planetPic").removeAttribute("src");

        //resetting spaceship
        document.getElementById("spaceship1").setAttribute("class","spaceshipHidden");
        document.getElementById("spaceship2").setAttribute("class","spaceshipHidden");
        document.getElementById("spaceship3").setAttribute("class","spaceshipHidden");
        document.getElementById("spaceship4").setAttribute("class","spaceshipHidden");
        document.getElementById("spaceship5").setAttribute("class","spaceshipHidden");

        console.log (guessed);

        //write blanks
        for (let i = 0; i < word.length; i++) {
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

            //update remaining guesses
            console.log(this.remain);
            this.remain = this.remain - 1;
            if(hangman.remain==0){ //NOT WORKING
                setTimeout(function(){
                    alert("You lose!");
                    hangman.newWord();
                },100);
            };
            document.getElementById("guessesLeft").textContent = this.remain;
        }
        // else it must be right
        else {

            //add to array of guessed
            guessed.push(letter);

            //initialize an array of correct indices
            var indices = [];
            //iterate through word to see collect correct indices
            for (let i = 0; i < word.length; i++) {
                checkLetter = word[i];
                if (checkLetter === letter) {
                    indices.push(i);
                }
            }

            //replace blanks at indices with word at indices
            for (let i = 0; i < indices.length; i++) {
                index = indices[i];

                //initialize an array to replace the blanks
                var blanksArray = [];
                blanks = ""
                
                console.log("guessed letters: " + guessed);
                console.log("the letter at that index is " + word[index]);

                // write the word to the blanks array
                for (let i=0;i<word.length;i++){

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
                //spaceship
                var blankMatch = [] + blanks.match(/_/g);
                var wordPercent = (word.length - (blankMatch.length))/word.length;
                console.log (wordPercent);

                //winning
                if (blanks.includes(" _ ") != true) {
                    document.getElementById("spaceship5").removeAttribute("class");
                    document.getElementById("spaceship4").removeAttribute("class");
                    document.getElementById("spaceship3").removeAttribute("class");
                    document.getElementById("spaceship2").removeAttribute("class");
                    document.getElementById("spaceship1").removeAttribute("class");
                    hangman.win();
                } else if(wordPercent>=0.8) {
                    document.getElementById("spaceship5").removeAttribute("class");
                    document.getElementById("spaceship4").removeAttribute("class");
                    document.getElementById("spaceship3").removeAttribute("class");
                    document.getElementById("spaceship2").removeAttribute("class");
                    document.getElementById("spaceship1").removeAttribute("class");
                } else if (wordPercent>=0.6){
                    document.getElementById("spaceship4").removeAttribute("class");
                    document.getElementById("spaceship3").removeAttribute("class");
                    document.getElementById("spaceship2").removeAttribute("class");
                    document.getElementById("spaceship1").removeAttribute("class");
                } else if (wordPercent>=0.4){
                    document.getElementById("spaceship3").removeAttribute("class");
                    document.getElementById("spaceship2").removeAttribute("class");
                    document.getElementById("spaceship1").removeAttribute("class");
                } else if (wordPercent>=0.2){
                    document.getElementById("spaceship2").removeAttribute("class");
                    document.getElementById("spaceship1").removeAttribute("class");
                } else {
                    document.getElementById("spaceship1").removeAttribute("class");
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
                planetPic = "https://upload.wikimedia.org/wikipedia/commons/f/f5/3D_Mars.png";
                break;
            case "SATURN":
                planetPic = "https://pics.clipartpng.com/idownload-image.php?file=Saturn_PNG_Clip_Art-2164.png";
                break;
            case "JUPITER":
                planetPic = "https://upload.wikimedia.org/wikipedia/commons/e/e1/Jupiter_%28transparent%29.png";
                break;
            case "VENUS":
                planetPic = "https://upload.wikimedia.org/wikipedia/commons/f/f4/3D_Venus.png";
                break;
            case "NEPTUNE":
                planetPic = "https://upload.wikimedia.org/wikipedia/commons/d/da/3D_Neptune.png";
                break;
            case "URANUS":
                planetPic = "https://upload.wikimedia.org/wikipedia/commons/3/32/3D_Uranus.png";
                break;
            case "PLUTO":
                planetPic = "https://vignette.wikia.nocookie.net/thesolarsystem6361/images/0/0a/Pluto_spacepedia.png/revision/latest/scale-to-width-down/480?cb=20180302130217";
                break;
            default:
                break;
        }

        
        document.getElementById("planetPic").setAttribute("src",planetPic);

        //add to wins
        hangman.winNum = hangman.winNum + 1;
        document.getElementById("wins").textContent = hangman.winNum;

        //game resets after 2 seconds
        setTimeout(function(){
            hangman.newWord();
        },2000);
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

