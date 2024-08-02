import { Component, Input, OnInit } from "@angular/core";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { Observable, from } from "rxjs";

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
    users$: Observable<User[]> = from([])

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.users$ = this.userService.getUsers()
    }
}
