// Answers type representing possible answers and a function to convert answer to string
export type Answers = "A" | "B" | "C" | "D" 

export function answerToString(answer : Answers){
    if(answer == "A")return "A";
    if(answer =="B")return "B";
    if(answer == "C")return "C";
    if(answer == "D")return "D";
}
