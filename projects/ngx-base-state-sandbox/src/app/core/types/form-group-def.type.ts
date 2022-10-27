import { FormControl } from '@angular/forms';

export type FormGroupDef<T> = {
    [K in keyof T]: FormControl<T[K]>;
};
