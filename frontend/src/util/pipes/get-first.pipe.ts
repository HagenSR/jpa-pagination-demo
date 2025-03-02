import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'getFirstElement'
})
export class GetFirstPipe<T> implements PipeTransform {

  transform(value: T[]): T | undefined{
    return Boolean(value) ? value[0] : undefined;
  }

}