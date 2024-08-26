import { AxiosResponse } from "axios";
import $api from "../http/index";
import { IQuestionsResponse, IQuizResponse } from "../types";


export default class QuizService {
  static async checkTest(): Promise<AxiosResponse<IQuizResponse>> {
    return $api.get("/tex/day");
  }

  static async quizList(
    index: number
  ): Promise<AxiosResponse<IQuestionsResponse>> {
    return $api.get(`/tex/question/${index}`);
  }

  static async getAnswer(
    question_id: number,
    answer_id: number
  ): Promise<AxiosResponse> {
    return $api.post("http://142.93.166.36:8080/api/tex/answer", {
      question_id,
      answer_id,
    });
  }

  static async getResults(): Promise<AxiosResponse> {
    return $api.get("http://142.93.166.36:8080/api/tex/results");
  }

}
