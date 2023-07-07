import { Quize } from "./quize.js";
export class Setting{
    constructor() {
        this.category = document.getElementById("category");
        this.difficulty = Array.from(document.getElementsByName("difficulty"));
        this.numberOfQuestions = document.getElementById("numberOfQuestions");
        document.getElementById("startBtn").addEventListener("click",this.startQuize.bind(this));
    }

    async startQuize() {
        const catValue = this.category.value;
        const diffValue = this.difficulty.filter((e) => { return e.checked })[0].value;
        const numQuesValue = this.numberOfQuestions.value;
        const api = `https://opentdb.com/api.php?amount=${numQuesValue}&category=${catValue}&difficulty=${diffValue}`;
        const result = await this.fetchApi(api);
        if (result.length > 0) {
            $("#setting").fadeOut(500, function () {
                $("#quiz").fadeIn(500);
            });
            
            new Quize(result);
        }

        if (numQuesValue == "") {
            $("#alert1").fadeIn(500);
        } else {
            $("#alert1").fadeOut(500);
        }
    }

    async fetchApi(api) {
        const link = await fetch(api);
        const res = await link.json();
        return res.results;
    }
}