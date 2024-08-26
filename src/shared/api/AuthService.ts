import $api from "../http";
import { AxiosResponse } from "axios";
import { IRefreshResponse } from "../types";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IRefreshResponse>> {
    return $api.post("/auth/login", { email, password });
  }

  static async passwordRequest(email: string): Promise<AxiosResponse> {
    return $api.post("/user/password_request", { email });
  }
}
