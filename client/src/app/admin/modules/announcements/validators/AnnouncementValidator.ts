import { ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';

export const AnnouncementValidator =
    (dateFromFieldName: string, timeFromFieldName: string, dateToFieldName: string, timeToFieldName: string): ValidatorFn => {
    return (control: FormControl): ValidationErrors | null => {
        const dateFromField = control.get(dateFromFieldName);
        const timeFromField = control.get(timeFromFieldName);
        const dateToField = control.get(dateToFieldName);
        const timeToField = control.get(timeToFieldName);

        const dateFromValue = dateFromField.value;
        const timeFromValue = timeFromField.value;

        const dateToValue = dateToField.value;
        const timeToValue = timeToField.value;

        if (dateFromValue && timeFromValue &&
            dateToValue && timeToValue) {
            const from = new Date(`${dateFromValue} ${timeFromValue}`);
            const to = new Date(`${dateToValue} ${timeToValue}`);

            if (from > to) {
                dateFromField.setErrors({
                    dateInvalid: true
                });
                timeFromField.setErrors({
                    dateInvalid: true
                });
                dateToField.setErrors({
                    dateInvalid: true
                });
                timeToField.setErrors({
                    dateInvalid: true
                });
            } else {
                dateFromField.setErrors(null);
                timeFromField.setErrors(null);
                dateToField.setErrors(null);
                timeToField.setErrors(null);
            }
        }
        return null;
    }
}