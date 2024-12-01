export type Answers = "A" | "B" | "C" | "D" 

export function answerToString(answer : Answers){
    // Typescript is dumb
    if(answer == "A")return "A";
    if(answer =="B")return "B";
    if(answer == "C")return "C";
    if(answer == "D")return "D";
}