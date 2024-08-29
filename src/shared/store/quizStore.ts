import { makeAutoObservable } from "mobx";
import { IQuestionsResponse, IQuizResponse } from "../types";
import QuizService from "../api/QuizService";

class Quiz {
  startTest: IQuizResponse = {
    test_finished: false,
    day_number: 0,
    day_title: "",
    description: "",
  };
  dayTest: IQuestionsResponse = {
    answers: [],
    question_id: 0,
    question_number: 0,
    question_title: "",
    questions_count: 0,
    selected_answer: 0,
  };
  resultText: string = "";
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (bool: boolean) => {
    this.loading = bool;
  }

  testRequest = async () => {
    try {
      const { data } = await QuizService.checkTest();
      this.startTest = {
        test_finished: data.test_finished,
        day_number: data.day_number,
        day_title: data.day_title,
        description: data.description,
      };
    } catch (error) {
      console.log(error);
    }
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
