export class SignupInfo {

  username: string;
  role: string[];
  password: string;

  constructor(username: string, password: string, role: string) {
    this.username = username;
    console.log(role);
    if (role == "student") {
      this.role = ['student'];
    }else if (role == "teacher"){
      this.role = ['teacher'];
    } else {
      this.role = [''];
    }
    this.password = password;
  }
}
