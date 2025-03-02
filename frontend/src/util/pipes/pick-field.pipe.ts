import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'pickField'
})
export class PickFieldPipe<T> implements PipeTransform {

  transform(value: T, field: string): any | undefined{
    return Boolean(value) ? value[field as unknown as keyof T] : undefined;
  }

}