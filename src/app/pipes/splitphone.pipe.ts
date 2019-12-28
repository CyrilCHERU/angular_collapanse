import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "splitphone"
})
export class Splitphone implements PipeTransform {
  transform(phone: string) {}
}
