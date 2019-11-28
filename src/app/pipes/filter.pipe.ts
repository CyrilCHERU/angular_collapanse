import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  /**
   *
   * @param items Le Tableau des items que l'on veut filtrer
   * @param search Le terme de la recherche
   */
  transform(items: any[], search: string): any[] {
    return items.filter(
      item =>
        item.customer.lastName.toLowerCase().includes(search.toLowerCase()) || item.customer.firstName.toLowerCase().includes(search.toLowerCase()));
  }

  // /**
  //  *
  //  * @param items Le Tableau des items que l'on veut filtrer
  //  * @param search Le terme de la recherche
  //  * @param fields Les chemins des champs a tester
  //  */
  // transform(items: any[], search: string, fields: string[]): any[] {
  //   return items.filter(item => {
  //     for (const field of fields){
  //       const value = get(item, field);
  //       if(value.toLowerCase().includes(search.toLowerCase())){
  //         return true;
  //       }
  //     }
  //   }); AVEC librairie LODASH installee
  // ++ un tableau des champs a filtrer filterfields = ["customer.firstName", "customer.lastName", "status"]
  // import { get } from 'lodash'
}
