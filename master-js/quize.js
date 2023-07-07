export class Quize{
    constructor(data) {
        this.score = 0;
        this.questions = data;
        this.currentQestion = 0;
        this.showQuestion(this.questions[this.currentQestion]);
        document.getElementById("next").addEventListener("click", this.nextQuestion.bind(this));
        document.getElementById("tryBtn").addEventListener("click",this.tryAgain.bind(this));
    }

    tryAgain() {
        $("#finish").fadeOut(400, () => {
            $("#setting").fadeIn(400)
        });
        $("#numberOfQuestions").val("");
    }

    showQuestion(current) {
        const correct = current.correct_answer;
        const incorrect = current.incorrect_answers;
        const answers = [correct, ...incorrect];
        const randomAnswers = this.shuffle(answers);
        document.getElementById("question").innerHTML = current.question;
        let cartona = '';
        for (let i = 0; i < randomAnswers.length; i++) {
            cartona += `
            <label class="form-check-label">
                <input type="radio" class="form-check-input" name="answer"  value="${randomAnswers[i]}"
                >
                ${randomAnswers[i]}
            </label> </br>
        `;
        }
        document.getElementById("rowAnswer").innerHTML = cartona;
        document.getElementById("currentQuestion").innerHTML=this.currentQestion+1;
        document.getElementById("totalNumberOfQuestions").innerHTML=this.questions.length;
    }

    nextQuestion() {
        let userAns = Array.from(document.getElementsByName("answer")).filter((e) => { return e.checked })[0];
        if (userAns) {
            document.getElementById("alert").style.display = "none";
            userAns=userAns.value
            let correctAns = this.questions[this.currentQestion].correct_answer;
            this.checkAnswer(userAns,correctAns)
            this.currentQestion++;
            if (this.currentQestion < this.questions.length) {
                this.showQuestion(this.questions[this.currentQestion]);
            } else {
                $("#quiz").fadeOut(500, () => {
                    $("#finish").fadeIn(500);
                });
                document.getElementById("score").innerHTML=this.score;
            }
        } else {
            document.getElementById("alert").style.display = "block";
        }
        
    }

    checkAnswer(userAns,correctAns) {
        if (userAns == correctAns) {
            this.score++;
            $("#Correct").fadeIn(400).fadeOut(400);
        } else {
            $("#inCorrect").fadeIn(400).fadeOut(400);
        }
    }

    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }
}