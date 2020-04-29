import { User } from "./Interface";
import { userInfo } from "os";

const diceImage = (username: string) =>
  `https://avatars.dicebear.com/v2/${
    username[0].toLowerCase() > "m" ? "male" : "female"
  }/:${username}.svg`;
const defaultImage =
  "https://static.productionready.io/images/smiley-cyrus.jpg";

export function createUserStore() {
  const leerUser: User = {
    email: "",
    token: "",
    username: "",
    bio: "",
    image: "",
  };
  const localUser: User = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser") || "")
    : null;
  return {
    isSignedin: !!localUser,
    currentUser: localUser || leerUser,
    setUser(user: User) {
      this.currentUser = user;
      this.isSignedin = true;
      if (!this.currentUser.image || this.currentUser.image === defaultImage)
        this.currentUser.image = diceImage(this.currentUser.username);
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
    },
    logout() {
      localStorage.removeItem("currentUser");
      this.isSignedin = false;
      this.currentUser = leerUser;
    },
  };
}
export type TUserStore = ReturnType<typeof createUserStore>;
