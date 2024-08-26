import $api from "../http";
import { AxiosResponse } from "axios";

export default class AuthService {
  static fetchUser = (): Promise<AxiosResponse> => {
    return $api.get("/user/profile");
  };
}
