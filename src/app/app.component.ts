import { Component } from '@angular/core';
import {TokenStorageService} from "./auth/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Final';
  private roles?: string[];
  authority?: string;

  constructor(private tokenStorage: TokenStorageService) {  }

  ngOnInit() {
    console.log("init");
    if (this.tokenStorage.getToken()) {
      console.log(this.tokenStorage.getToken());
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_STUDENT') {
          this.authority = 'student';
          return false;
        } else if (role == 'ROLE_TEACHER') {
          this.authority = 'teacher';
          return false;
        }
        return true;
      });
    }
  }

  signOut(): void {
    this.authority = undefined;
    this.tokenStorage.signOut();
  }

}
