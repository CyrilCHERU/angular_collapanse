import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitphone'
})
export class Splitphone implements PipeTransform {

  transform(phone: string) {

    const str = phone;
    for (let i = 0; i < 5; i++) {

      let newPhone = '';
      let temp = '';
      temp = str.slice(0, 2);
      newPhone = temp + '.';
    }
  }
}
