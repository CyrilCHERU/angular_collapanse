import { Pipe, PipeTransform } from '@angular/core';

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


    date = date.split('/');
    const birthMonth = date[1] - 1; // (les mois commencent à 0)
    const birthDay = date[0];
    const now = new Date();
    const nowMonth = now.getMonth();
    const nowDay = now.getDate();
    let age = now.getFullYear() - date[2];

    // Si la date d'anniversaire n'est pas encore passée, on corrige l'age
    if (nowMonth < birthMonth || nowMonth === birthMonth && nowDay < birthDay) {
      age--;
    }
    return age;

  }
}
