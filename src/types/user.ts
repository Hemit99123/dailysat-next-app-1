import { QuestionData } from "@/app/reading/page";

export interface User {
    // MongoDB string 
    _id? : string,
    id: string,
    email: string,
    name: string,
    picture: string,
  
    // Given name is the first name
    given_name: string,
  
    // Currency
    currency: number,
  
    // Questions answered
    questionsAnswered: QuestionData[]
  }