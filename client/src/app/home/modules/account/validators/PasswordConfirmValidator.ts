import { ValidatorFn, ValidationErrors, FormGroup, FormControl } from '@angular/forms';

export const PasswordConfirmValidator = 
    (passwordFieldName: string, passwordConfirmFieldName: string): ValidatorFn => {
    return (control: FormControl): ValidationErrors | null => {
        const passwordField = control.get(passwordFieldName);
        const passwordConfirmField = control.get(passwordConfirmFieldName);

        const passwordValue = passwordField.value;
        const passwordConfirmValue = passwordConfirmField.value;

        if (!passwordValue || !passwordConfirmValue)
            passwordConfirmField.setErrors({
                notMatch: null,
                required: true
            });

        if (passwordValue !== passwordConfirmValue)
            passwordConfirmField.setErrors({
                notMatch: true
            });

        return null;
    }
}