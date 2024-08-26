import { makeAutoObservable } from "mobx";
import AuthService from "../api/AuthService";
import { MMKV } from "react-native-mmkv";
import QuizService from "../api/QuizService";
import { IQuestionsResponse, IQuizResponse } from "../types";

class Auth {
  isAuth: boolean = false;
  user = {};
  emailStore: string = "";
  isLoading: boolean = false;
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
    question_count: 0,
  };

  constructor() {
    makeAutoObservable(this);

    this.checkAuth();
  }

  checkAuth() {
    const storage = new MMKV();
    if (storage.contains("token")) {
      this.isAuth = true;
    }
  }

  checkTest() {
    const storage = new MMKV();
    if (storage.getBoolean("testFinished")) {
      this.startTest.test_finished = true;
    } else {
      this.startTest.test_finished = false;
    }
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser = (user: any) => {
    this.user = user;
  };

  setEmail = (email: string) => {
    this.emailStore = email;
  };

  login = async (email: string, password = "11111111") => {
    const storage = new MMKV();
    this.setIsLoading(true);
    try {
      const response = await AuthService.login(email, password);
      storage.set("token", JSON.stringify(response.data.token));
      storage.set("refreshToken", JSON.stringify(response.data.refresh_token));
      this.checkAuth();
    } catch (error) {
      console.log(error);
    }
  };

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  passwordRequest = async (email: string) => {
    try {
      const response = await AuthService.passwordRequest(email);
    } catch (error) {
      console.log(error);
    }
  };

  testRequest = async () => {
    try {
      const response = await QuizService.checkTest();
      console.log(response);
      this.setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  quizRequest = async (index: number) => {
    try {
      const { data } = await QuizService.quizList(index);
      this.dayTest = {
        answers: data.answers,
        question_count: data.question_count,
        question_id: data.question_id,
        question_number: data.question_number,
        question_title: data.question_title,
      };
    } catch (error) {
      console.log(error);
    }
  };

  logout = () => {
    const storage = new MMKV();
    storage.clearAll();
    this.isAuth = false;
    this.dayTest = {
      answers: [],
      question_id: 0,
      question_number: 0,
      question_title: "",
      question_count: 0,
    };
    this.emailStore = "";
    this.isLoading = false;
    this.startTest = {
      test_finished: false,
      day_number: 0,
      day_title: "",
      description: "",
    };
  };
}

export const authService = new Auth();
