import { AbstractControl, ValidatorFn } from "@angular/forms";

export function checker(design:RegExp):ValidatorFn{
    return (formsComponents: AbstractControl):{[key:string]:any}|null=>{
        const valCheck= design.test(formsComponents.value)
        return valCheck?null:{'design':{value:formsComponents.value}}
    }
}