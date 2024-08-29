import { AxiosResponse } from "axios";
import $api from "../http/index";
import { IQuestionsResponse, IQuizResponse, IResultResponse } from "../types";

export default class QuizService {
  static async checkTest(): Promise<AxiosResponse<IQuizResponse>> {
    return $api.get("/tex/day");
  }

  static async quizList(
    index: number
  ): Promise<AxiosResponse<IQuestionsResponse>> {
    return $api.get(`/tex/question/${index}`);
  }

  static async setAnswer(
    question_id: number,
    answer_id: number
  ): Promise<AxiosResponse> {
    return $api.post("/tex/answer", {
      question_id,
      answer_id,
    });
  }

  static async getResults(): Promise<AxiosResponse<IResultResponse>> {
    return $api.get("/tex/results");
  }
}
