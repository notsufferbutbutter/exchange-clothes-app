import { Component } from "@angular/core";
import { SignupComponent } from "../components/signup/signup.component";

@Component({
    selector: 'app-signup-page',
    imports: [SignupComponent],
    template: `
        <div class="flex justify-center items-center min-h-screen pb-20">
            <app-signup></app-signup>
        </div>
    `
})
export default class SignupPage {

}