import { Injectable }       from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { FieldBase }     from './field-base';
import { TextField }  from './field-text';
import { NumberField }  from './field-number';
import { SelectField } from './field-select';



@Injectable()
export class FieldService {

  data:any;
  fields: FieldBase<any>[];

  constructor(public http: Http) {
    //this.loadProtocols()
  }
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

  loadProtocols(){
    return new Promise(resolve =>{
      this.http.get('assets/data/protocols.json')
      .map(res => res.json())
      .subscribe(data => {
        let fields = this.generateProtocols(data);
        resolve(fields);
      });

    });
  }
  generateProtocols(data){

    let firstProto = data[0];
    let fields = firstProto.fields;
    fields.forEach(function (field) {
      console.log(field);
      let fieldtype = field.type ; 
      let formFied ; 
      switch(fieldtype) {
        case "text":
        formFied = new TextField({
          key: fieldtype.key,
          label: fieldtype.label,
          order: fieldtype.order,
          required : fieldtype.required
        });
            break;
        case "select":
        formFied = new SelectField({
          key: fieldtype.key,
          label: fieldtype.label,
          options: fieldtype.options ,
          order: fieldtype.order,
          required : fieldtype.required
        });
            break;
        case "number":
            formFied = new TextField({
              key: fieldtype.key,
              label: fieldtype.label,
              order: fieldtype.order,
              required : fieldtype.required
            });
            break;
    }
    this.fields.push(formFied);
    }); 
    return this.fields.sort((a, b) => a.order - b.order);

  }
}
