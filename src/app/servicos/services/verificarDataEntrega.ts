// not-delivered.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notDelivered'
})

export class NotDeliveredPipe implements PipeTransform {
  transform(value: string): string {
    // Verifica se a data é igual a '01/01/0001'
    if (value === '01/01/0001') {
      return 'Não entregue';
    }
    // Se não for igual, retorna a data original
    return value;
  }
}
