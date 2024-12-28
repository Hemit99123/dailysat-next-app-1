// User interface representing a user in the system
import { DBQuestionRecord } from "./questions";

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
    questionsAnswered: DBQuestionRecord[]
}