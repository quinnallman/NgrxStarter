import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {provideHttpClient} from "@angular/common/http";
import { UserComponent } from "../user/user.component";
import { UserListComponent } from "../user/user-list.component";

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        HomeComponent,
        UserComponent,
        UserListComponent
    ],
    exports: [
        HomeComponent
    ],
    providers: [
        provideHttpClient()
    ],
})
export class HomeModule {}
