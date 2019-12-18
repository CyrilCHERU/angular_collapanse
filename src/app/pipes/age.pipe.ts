import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'age'
})

export class AgePipe implements PipeTransform {

  /**
   *
   * @param items Le Tableau des items que l'on veut filtrer
   * @param search Le terme de la recherche
   */
  transform(date: any): any {

    const age = moment(date, 'YYYYMMDD').fromNow(); // il y a 7 ans

    return age.substr(0, 2);

  }
}
