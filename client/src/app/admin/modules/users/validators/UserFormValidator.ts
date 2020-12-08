import { ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';

export const UserFormValidator =
    (roleFieldName: string, albumNumberFieldName: string): ValidatorFn => {
    return (control: FormControl): ValidationErrors | null => {
        const roleField = control.get(roleFieldName);
        const albumNumberField = control.get(albumNumberFieldName);

        const roleValue = roleField.value;
        const albumNumberValue = albumNumberField.value;

        if (roleValue === 'student') {
            if (albumNumberValue) {
                albumNumberField.setErrors({
                    required: null
                })
                if (!albumNumberValue.match(/^[0-9]{6}$/))
                    albumNumberField.setErrors({
                        pattern: true
                    })
                else
                    albumNumberField.setErrors(null)
            } else
                albumNumberField.setErrors({
                    required: true
                });
            return null;
        } else
            albumNumberField.setErrors({
                required: null
            });

        albumNumberField.updateValueAndValidity({ onlySelf: true });
        return null;
    }
}