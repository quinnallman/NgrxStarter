import {Component, OnInit} from "@angular/core";
import { UserService } from "../user.service";
import { User } from "../user.model";
import { Observable, from } from "rxjs";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styles: [`
    thead {
      background-color: lightblue;
    }

    th {
      min-width: 5rem;
      padding-left: 1rem;
      padding-right: 1rem;
    }
  `]
})
export class HomeComponent implements OnInit {
  users$: Observable<User[]> = from([])

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users$ = this.userService.getUsers()
  }

  saveUser(user: User) {
    this.userService.updateUser(user).subscribe({
      next: () => {
        user.editing = false;
      },
      error: err => {
        // notify user, log error, etc.
        console.debug('Error updating user: ' + err)
      }
    })
  }
}
