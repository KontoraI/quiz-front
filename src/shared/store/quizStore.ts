import { makeAutoObservable } from "mobx";
import { IQuestionsResponse } from "../types";
import QuizService from "../api/QuizService";

class Quiz {
  dayTest: IQuestionsResponse = {
    answers: [],
    question_id: 0,
    question_number: 0,
    question_title: "",
    questions_count: 0,
    selected_answer: false,
  };
  resultText: string = "";
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (bool: boolean) => {
    this.loading = bool;
  };

  quizRequest = async (index: number) => {
    try {
      const { data } = await QuizService.quizList(index);
      this.dayTest = {
        answers: data.answers,
        questions_count: data.questions_count,
        question_id: data.question_id,
        question_number: data.question_number,
        question_title: data.question_title,
        selected_answer: data.selected_answer,
      };
      this.setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  setAnswer = async (question_id: number, answer_id: number) => {
    try {
      const response = await QuizService.setAnswer(question_id, answer_id);
    } catch (error) {
      console.log(error);
    }
  };

  getResults = async () => {
    try {
      const { data } = await QuizService.getResults();
      this.resultText = data.content;
    } catch (error) {
      console.log(error);
    }
  };
}

export const quizService = new Quiz();
