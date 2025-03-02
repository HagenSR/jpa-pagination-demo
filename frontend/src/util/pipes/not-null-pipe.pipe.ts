import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notNullPipe'
})
export class NotNullPipePipe<T> implements PipeTransform {

  transform(value: T): T {
    return value!;
  }

}
