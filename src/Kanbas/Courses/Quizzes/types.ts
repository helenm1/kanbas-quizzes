import { QuestionType } from "./constants";

export type Question = {
  title: string;
  // questionText: string;
  type: QuestionType;
  points: number;
  description: string;
  options: string[];
  answers: string[];
};

export enum TrueFalseAnswer {
  true = "True",
  false = "False",
}
