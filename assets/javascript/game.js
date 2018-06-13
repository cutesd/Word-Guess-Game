
$(document).ready(function () {

    var WordGuess = function (options) {

        var winCnt = 0;
        var loseCnt = 0;
        var remain = 0;
        var guesses = [];
        var answer = "";
        var correctCnt = 0;
        var wrongCnt = 0;
        var ans_arr;
        var idx = 0;
        var hintToggle = 0;
        var hint_str = '';
        var hint_arr = ['I keep the doctor away.','Nothing rhymes with ...',"Don't slip on my peel!","I'm fuzzy on the outside and green on the inside!","I'm not a sad berry, I'm a ...","I might be green or red, if you put my juice in a barrel I'll get you drunk","I'm one dark berry"];

        var winOut = document.getElementById('winOut');
        var loseOut = document.getElementById('lossOut');
        var remainOut = document.getElementById('remainOut');
        var guessOut = document.getElementById('guessOut');
        var ansOut = document.getElementById('answerOut');
        var hint = document.getElementById('hint');
        var img = document.getElementById('hm-img');
        var answerArea = document.getElementById('answerArea');

        var jumbo;

        var btns = document.querySelectorAll('.btn');

        this.play = function () {
            for (var i = 0; i < btns.length; i++) {
                btns[i].addEventListener("click", startGame);
            }
            hint.addEventListener("click", toggleHint);
            startGame();
        }

        this.guess = function (ltr) {
            checkAnswer(ltr);
        }

        function display() {
            winOut.textContent = winCnt;
            loseOut.textContent = loseCnt;
            remainOut.textContent = remain;
            guessOut.textContent = guesses;
            ansOut.textContent = ans_arr.join(" ");
        }

        function startGame() {
            hintToggle = 0;
            hint.textContent = "click here to view hint";
            correctCnt = 0;
            remain = options.NumGuesses;
            guesses = [];
            answer = getRndWord();
            ans_arr = new Array(answer.length);
            if (jumbo) jumbo.classList.add('d-none');
            wrongCnt = 0;
            img.src=["assets/images/hm"+ (++wrongCnt)+".gif"];
            answerArea.classList.remove('d-none');
            arrUpdate();
            display();
        }

        function arrUpdate() {
            for (var i = 0; i < ans_arr.length; i++) {
                if (ans_arr[i] == undefined) {
                    setCellVal(i, "＿");
                }
            }
        }

        function setCellVal(i, val) {
            ans_arr[i] = val;
        }

        function getRndWord() {
            var word_arr = ['apple', 'orange', 'banana', 'kiwi', 'blueberry', 'grape', 'blackberry'];
            idx = Math.floor(Math.random() * word_arr.length);
            return word_arr[idx];
        }

        function toggleHint (e){
            if(hintToggle++ % 2 === 0){
                hint_str = hint.textContent;
                hint.textContent = hint_arr[idx];
            }else{
                hint.textContent = hint_str;
            }
            hint.addEventListener("click", toggleHint);
        }

        function checkAnswer(ltr) {
            if (answer.indexOf(ltr) > -1 && guesses.indexOf(ltr.toUpperCase()) < 0) {
                guesses.push(ltr.toUpperCase());
                for (var i = 0; i < answer.length; i++) {
                    if (answer.substr(i, 1) === ltr) {
                        correctCnt++;
                        setCellVal(i, ltr.toUpperCase());
                    }
                }
            } else {
                remain--;
                if (remain === 0) {
                    answerArea.classList.add('d-none');
                    jumbo = document.getElementById("jumboLose");
                    jumbo.classList.remove('d-none');
                    img.src=["assets/images/hangman-ani.gif"];
                    loseCnt++;
                } else {
                    img.src=["assets/images/hm"+ (++wrongCnt)+".gif"];
                    guesses.push(ltr.toUpperCase());
                }
            }

            if (correctCnt === answer.length) {
                img.src=["assets/images/win-ani2.gif"];
                answerArea.classList.add('d-none');
                jumbo = document.getElementById("jumboWin");
                jumbo.classList.remove('d-none');
                winCnt++;
            }
            display();
        }

    }

    var firstPress = true;
    var myGame = new WordGuess({ NumGuesses: 10 });
    myGame.play();

    document.addEventListener('keypress', (e) => {
        myGame.guess(e.key);

        if(firstPress){
            document.querySelector(".instr").classList.add('d-none');
            firstPress = !firstPress;
        }
    });
});