import { makeAutoObservable } from "mobx";
import AuthService from "../api/AuthService";
import { MMKV } from "react-native-mmkv";
import QuizService from "../api/QuizService";
import { IQuizResponse } from "../types";
import { DevSettings } from "react-native";
import RNRestart from "react-native-restart";

class Auth {
  startTest: IQuizResponse = {
    test_finished: false,
    day_number: 0,
    day_title: "",
    description: "",
  };
  isAuth: boolean = false;
  emailStore: string = "";
  isLoading: boolean = false;
  correctCode: undefined | boolean = undefined;

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

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setEmail = (email: string) => {
    this.emailStore = email;
  };

  login = async (email: string, password: string) => {
    this.setIsLoading(true);
    const storage = new MMKV();
    try {
      const response = await AuthService.login(email, password);
      storage.set("token", JSON.stringify(response.data.token));
      storage.set("refreshToken", JSON.stringify(response.data.refresh_token));
      this.checkAuth();
      if (__DEV__) {
        DevSettings.reload();
      } else {
        RNRestart.Restart();
      }
    } catch (error) {
      console.log(error);
      this.setCorrectCode(true);
    }
  };

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  passwordRequest = async (email: string) => {
    try {
      const response = await AuthService.passwordRequest(email);
      this.setEmail(email);
    } catch (error) {
      console.log(error);
    }
  };

  logout = () => {
    const storage = new MMKV();
    storage.clearAll();
    this.isAuth = false;
    this.emailStore = "";
  };

  testRequest = async () => {
    try {
      const { data } = await QuizService.checkTest();
      this.startTest = {
        test_finished: data.test_finished,
        day_number: data.day_number,
        day_title: data.day_title,
        description: data.description,
      };
      this.setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  setCorrectCode = (bool: boolean) => {
    this.correctCode = bool;
  };
}

export const authService = new Auth();
