import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../types";

export default class AuthService {
  static async fetchUser(): Promise<AxiosResponse<IUser>> {
    return $api.get("/user/profile");
  }
}
