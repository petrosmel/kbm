import {Pipe, PipeTransform} from '@angular/core';
import {IUser} from "../models/user.model";

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: IUser, ...args: unknown[]): string {
    return `${value.firstname.charAt(0).toUpperCase()} ${value.lastname.charAt(0).toUpperCase()}`;
  }

}
