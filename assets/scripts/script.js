var words = [
    "vaporwave",
    "macintosh plus",
    "trippy",
    "relaxation",
    "space",
    "wavy",
    "drugs",
    "chill",
    "green tea",
    "crystal pepsi",
    "crew neck sweaters",
    "gogurts",
    "running in the nineties",
    "baby boomers",
    "millenial mindset",
    "apple computer one",
    "mac is the superior os dude trust me",
    "web design",
    "flashy neon colors",
    "awful gradients"
];
var guesses = 8;
var word = "";
var newPanel;
var gameOver = false;
var winCondition = false;
var guessingList = document.getElementById('display-guesses');
var gamesPlayed = 0;
newWord();
function newWord() {
    if(gamesPlayed != 0) {
        words.splice(wordNum, wordNum + 1);
    }
    wordNum = Math.floor(Math.random() * words.length);
    word = words[wordNum];
    newPanel = true;
    updateGuess();
    displayWord(word);
    gamesPlayed++;
    document.getElementById('display-guesses').innerHTML = '';
    if(gamesPlayed >= 20) {
        document.getElementById('hm-head').innerHTML = 'Y &nbsp; O &nbsp; U &nbsp; &nbsp; &nbsp; W &nbsp; O &nbsp; N &nbsp; &nbsp; &nbsp; I &nbsp; T &nbsp; &nbsp; &nbsp; A &nbsp; L &nbsp; L . &nbsp; &nbsp; &nbsp; H &nbsp; A &nbsp; V &nbsp; E &nbsp; &nbsp; &nbsp; A &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ~ &nbsp; W &nbsp; A &nbsp; V &nbsp; Y &nbsp; ~ &nbsp; &nbsp; &nbsp; D &nbsp; A &nbsp; Y .';
        gameOver = true;
    }
}

function displayWord(wordObj) {
    for(var i = 0; i < wordObj.length; i++) {
        if(i == 0) {
            document.getElementById('display-word').innerHTML = '_ ';
        } else if (wordObj[i] != ' ') {
            document.getElementById('display-word').innerHTML += '_ ';
        } else {
            document.getElementById('display-word').innerHTML += '&nbsp; ';
        }
    }
}

function updateGuess() {
    if(newPanel) {
       guesses = 8;
       updateHangman();
       }
    else {
       guesses = guesses - 1;
        updateHangman();
       }
    document.getElementById('display-lives').innerHTML = 'Y O U &nbsp; H A V E &nbsp; ' + guesses + ' &nbsp; G U E S S E S &nbsp; L E F T .';
    if(guesses == 1) {
        document.getElementById('display-lives').innerHTML = 'Y O U &nbsp; H A V E &nbsp; ' + guesses + ' &nbsp; G U E S S &nbsp; L E F T .';
    }
    if(guesses == 0) {
        document.getElementById('hm-head').innerHTML = 'Y &nbsp; O &nbsp; U &nbsp; &nbsp; &nbsp; L &nbsp; O &nbsp; S &nbsp; E &nbsp; . &nbsp; &nbsp; &nbsp; R &nbsp; E &nbsp; F &nbsp; R &nbsp; E &nbsp; S &nbsp; H &nbsp; &nbsp; &nbsp; T &nbsp; O &nbsp; &nbsp; &nbsp; T &nbsp; R &nbsp; Y &nbsp; &nbsp; &nbsp; A &nbsp; G &nbsp; A &nbsp; I &nbsp; N &nbsp; .';
        gameOver = true;
    }
}

function updateGuessList(keyPressed) {
    if(guessingList.innerHTML.indexOf(keyPressed.toUpperCase()) == -1) {
        console.log(keyPressed + guessingList.innerHTML.indexOf(keyPressed));
        guessingList.innerHTML += keyPressed.toUpperCase() + ' ';  
    }
}

document.onkeyup = function(e) {
    if(!gameOver && event.keyCode >= 65 && event.keyCode <= 90) {
        document.getElementById('hm-head').innerHTML = "E &nbsp; N &nbsp; J &nbsp; O &nbsp; Y &nbsp;  &nbsp;  &nbsp; Y &nbsp; O &nbsp; U &nbsp; R &nbsp;  &nbsp;  &nbsp; S &nbsp; T &nbsp; A &nbsp; Y &nbsp;  &nbsp;  &nbsp; A &nbsp; T &nbsp;  &nbsp;  &nbsp; T &nbsp; H &nbsp; E &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; R &nbsp; E &nbsp; L &nbsp; A &nbsp; X &nbsp; A &nbsp; T &nbsp; I &nbsp; O &nbsp; N &nbsp;  &nbsp;  &nbsp; I &nbsp; N &nbsp; N &nbsp; .";
        newPanel = false;
        var char = e.key.toLowerCase();
        var charIndex = word.indexOf(char);
        if(charIndex == -1) {
            if(guessingList.innerHTML.toLowerCase().indexOf(char) == -1) {
                updateGuess();
                updateGuessList(char);
            }
        } else {
            revealLetter(char, charIndex);
            for(var i = charIndex + 1; i < word.length; i++) {
                charIndex = word.indexOf(char, i);
                if(charIndex != -1) {
                    revealLetter(char, charIndex);
                }
            }
        }
    } else if(winCondition) {
        gameOver = false;
        newWord();
        document.getElementById('hm-head').innerHTML = "E &nbsp; N &nbsp; J &nbsp; O &nbsp; Y &nbsp;  &nbsp;  &nbsp; Y &nbsp; O &nbsp; U &nbsp; R &nbsp;  &nbsp;  &nbsp; S &nbsp; T &nbsp; A &nbsp; Y &nbsp;  &nbsp;  &nbsp; A &nbsp; T &nbsp;  &nbsp;  &nbsp; T &nbsp; H &nbsp; E &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; R &nbsp; E &nbsp; L &nbsp; A &nbsp; X &nbsp; A &nbsp; T &nbsp; I &nbsp; O &nbsp; N &nbsp;  &nbsp;  &nbsp; I &nbsp; N &nbsp; N &nbsp; .";
    }
}

function revealLetter(c, index) {
    var wordBlanks = document.getElementById('display-word').textContent;
    var splitString = wordBlanks.split(' ');
    splitString[index] = c.toUpperCase();
    var revealedString = '';
    for(var q = 0; q < splitString.length; q++) {
        revealedString += splitString[q] + ' ';
    }
    document.getElementById('display-word').textContent = revealedString;
    if(document.getElementById('display-word').textContent.indexOf('_') == -1) {
        document.getElementById('hm-head').innerHTML = 'Y O U &nbsp; W I N ! &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; P R E S S &nbsp; A N Y &nbsp; B U T T O N &nbsp; T O &nbsp; C O N T I N U E .';
        gameOver = true;
        winCondition = true;
    }
}

function updateHangman() {
    var a = document.getElementById('hangman-head');
    var b = document.getElementById('hangman-shirt');
    var c = document.getElementById('hangman-pants');
    var d = document.getElementById('hangman-shoes');
    var e = document.getElementById('hangman-left');
    var f = document.getElementById('hangman-right');
    var g = document.getElementById('hangman-hat');
    var h = document.getElementById('hangman-chain');
    if(guesses == 0) {
        a.style.display = 'inline';
        b.style.display = 'inline';
        c.style.display = 'inline';
        d.style.display = 'inline';
        e.style.display = 'inline';
        f.style.display = 'inline';
        g.style.display = 'inline';
        h.style.display = 'inline';
    } else if(guesses == 1) {
        a.style.display = 'inline';
        b.style.display = 'inline';
        c.style.display = 'inline';
        d.style.display = 'inline';
        e.style.display = 'inline';
        f.style.display = 'inline';
        g.style.display = 'inline';
        h.style.display = 'none';
    } else if(guesses == 2) {
        a.style.display = 'inline';
        b.style.display = 'inline';
        c.style.display = 'inline';
        d.style.display = 'inline';
        e.style.display = 'inline';
        f.style.display = 'inline';
        g.style.display = 'none';
        h.style.display = 'none';
    } else if(guesses == 3) {
        a.style.display = 'inline';
        b.style.display = 'inline';
        c.style.display = 'inline';
        d.style.display = 'inline';
        e.style.display = 'inline';
        f.style.display = 'none';
        g.style.display = 'none';
        h.style.display = 'none';
    } else if(guesses == 4) {
        a.style.display = 'inline';
        b.style.display = 'inline';
        c.style.display = 'inline';
        d.style.display = 'inline';
        e.style.display = 'none';
        f.style.display = 'none';
        g.style.display = 'none';
        h.style.display = 'none';
    } else if(guesses == 5) {
        a.style.display = 'inline';
        b.style.display = 'inline';
        c.style.display = 'inline';
        d.style.display = 'none';
        e.style.display = 'none';
        f.style.display = 'none';
        g.style.display = 'none';
        h.style.display = 'none';
    } else if(guesses == 6) {
        a.style.display = 'inline';
        b.style.display = 'inline';
        c.style.display = 'none';
        d.style.display = 'none';
        e.style.display = 'none';
        f.style.display = 'none';
        g.style.display = 'none';
        h.style.display = 'none';
    } else if(guesses == 7) {
        a.style.display = 'inline';
        b.style.display = 'none';
        c.style.display = 'none';
        d.style.display = 'none';
        e.style.display = 'none';
        f.style.display = 'none';
        g.style.display = 'none';
        h.style.display = 'none';
    } else {
        a.style.display = 'none';
        b.style.display = 'none';
        c.style.display = 'none';
        d.style.display = 'none';
        e.style.display = 'none';
        f.style.display = 'none';
        g.style.display = 'none';
        h.style.display = 'none';
    }
}