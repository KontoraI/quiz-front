import { makeAutoObservable } from "mobx";
import AuthService from "../api/AuthService";
import { MMKV } from "react-native-mmkv";
import QuizService from "../api/QuizService";
import { IQuestionsResponse, IQuizResponse } from "../types";
import { DevSettings } from "react-native";
import RNRestart from "react-native-restart";

class Auth {
  isAuth: boolean = false;
  user = {};
  emailStore: string = "";
  isLoading: boolean = false;

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
      this.setIsLoading(false);

      if (__DEV__) {
        DevSettings.reload();
      } else {
        RNRestart.Restart();
      }
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
}

export const authService = new Auth();
