import { makeAutoObservable } from "mobx";
import AuthService from "../api/UserService";
import { IUser } from "../types";

class User {
  user: IUser = {
    email: "",
    name: "",
    user_id: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  loadUser = async () => {
    try {
      const { data } = await AuthService.fetchUser();
      this.user.email = data.email;
      this.user.name = data.name;
      this.user.user_id = data.user_id;
    } catch (error) {
      console.log(error);
    }
  };
}

export const userService = new User();
