import { ComponentType } from "react";

export type RootStackParamList = {
  MailScreen: undefined;
  CodeScreen: undefined;
  QuizScreen: undefined;
  Questions: undefined;
  Results: undefined;
  Profile: undefined;
  Information: undefined;
};

export interface IRoute {
  name: keyof RootStackParamList;
  component: ComponentType;
}

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
  questions_count: number;
  selected_answer: number | false;
}

export interface IResultResponse {
  content: string;
}

export interface IUser {
  email: string;
  name: string;
  user_id: number;
}
