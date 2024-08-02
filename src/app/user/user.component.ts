import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { FormControl, FormGroup } from "@angular/forms";
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
    }

    userForm = new FormGroup({
        name: new FormControl(''),
        username: new FormControl(''),
        email: new FormControl(''),
    })

    save$: Subject<boolean> = new Subject()
    saveSubscription?: Subscription

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.userForm.setValue({
            name: this.user.name,
            username: this.user.username,
            email: this.user.email,
        })

        this.saveSubscription = this.save$.pipe(
            exhaustMap(() => this.userService.updateUser({
                ...this.user,
                name: this.userForm.value.name ?? '',
                username: this.userForm.value.username ?? '',
                email: this.userForm.value.email ?? '',
            }))
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
