export interface IRefreshResponse {
  token: string;
  refresh_token: string;
}

export interface IQuizResponse {
  test_finished: boolean;
  day_title: string;
  description: string;
  day_number: number;
}

export interface IQuestionsResponse {
  answers: {
    answer_id: number;
    answer_title: string;
  }[];
  question_id: number;
  question_number: number;
  question_title: string;
  question_count: number;
}
