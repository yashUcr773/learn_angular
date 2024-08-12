import { afterNextRender, Component, DestroyRef, inject, viewChild, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormsModule]
})
export class LoginComponent {

    private form = viewChild<NgForm>('form');
    private destroyRef = inject(DestroyRef);

    constructor() {
        afterNextRender(() => {

            const formData = window.localStorage.getItem('formValue')
            if (formData) {
                const email = JSON.parse(formData).email;
                setTimeout(() => {
                    this.form()?.controls?.['email'].setValue(email);
                })
            }

            const formSub = this.form()?.valueChanges?.pipe(debounceTime(500)).subscribe({
                next: (value) => window.localStorage.setItem('formValue', JSON.stringify({ email: value.email }))
            })

            this.destroyRef.onDestroy(() => {
                formSub?.unsubscribe();
            })
        })
    }

    onSubmit(formData: NgForm) {

        const email = formData.form.value.email;
        const password = formData.form.value.password;
        console.log(email, password);
        console.log(formData.form);
        console.log(formData.form.valid);

        formData.form.reset();

    }

}
