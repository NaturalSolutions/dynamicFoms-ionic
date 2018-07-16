import { Injectable }       from '@angular/core';

import { FieldBase }     from './field-base';
import { TextField }  from './field-text';
import { NumberField }  from './field-number';
import { SelectField } from './field-select';



@Injectable()
export class FieldService {

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getFields() {

    let fields: FieldBase<any>[] = [

      new SelectField({
        key: 'sexe',
        label: 'Sexe',
        options: [
          {key: 'male',  value: 'male'},
          {key: 'femelle',  value: 'femelle'},
          {key: 'juvenile',   value: 'juvenile'}
        ],
        order: 3
      }),

      new TextField({
        key: 'taxon',
        label: 'Espèce',
        value: '',
        required: true,
        order: 1
      }),

      new TextField({
        key: 'remarque',
        label: 'remarque',
        order: 2
      }),
      new NumberField({
        key: 'nombre',
        label: 'nombre',
        type: 'number',
        order: 3
      })
    ];

    return fields.sort((a, b) => a.order - b.order);
  }
}
