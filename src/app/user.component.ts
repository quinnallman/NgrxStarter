import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { FormControl } from "@angular/forms";
import { Subject, Subscription, exhaustMap, timer } from "rxjs";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
    @Input() user: User = {
        id: 0,
        name: '',
        username: '',
        email: '',
        editing: false,
    };

    name = new FormControl(this.user.name)
    username = new FormControl(this.user.username)
    email = new FormControl(this.user.email)

    save$: Subject<boolean> = new Subject()
    saveSubscription?: Subscription

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.saveSubscription = this.save$.pipe(
            exhaustMap(() => this.userService.updateUser(this.user))
        ).subscribe({
            next: () => {
                this.user.editing = false
              },
              error: err => {
                // notify user, log error, etc.
                console.debug('Error updating user: ' + err)
              }
        })
    }

    ngOnDestroy(): void {
        this.saveSubscription?.unsubscribe()
    }
}
