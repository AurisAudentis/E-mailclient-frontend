import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "fromname"
})
export class FromnamePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return value.replace("\"", "").replace(/<.*>/, "");
  }

}
