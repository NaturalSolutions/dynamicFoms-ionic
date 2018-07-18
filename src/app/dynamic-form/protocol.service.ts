import { Injectable }       from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { FieldBase }     from './field-base';
import { TextField }  from './field-text';
import { NumberField }  from './field-number';
import { SelectField } from './field-select';



@Injectable()
export class FieldService {

  constructor(public http: Http) {
   
    //this.loadProtocols()
  }
  /*getFields() {

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
  }*/

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
    let fieldsTab: FieldBase<any>[] = [];

    let firstProto = data[0];
    let fields = firstProto.fields;
    fields.forEach(function (field) {
      let fieldtype = field.type ; 
      let formFied ; 
      switch(fieldtype) {
        case "text":
        formFied = new TextField({
        });
            break;
        case "select":
        formFied = new SelectField({
          options: field.options 
        });
            break;
        case "number":
            formFied = new NumberField({
            });
            break;
    }
    formFied.key = field.key;
    formFied.label = field.label;
    formFied.order = field.order;
    formFied.required = field.required;



    fieldsTab.push(formFied);
    }); 
    return fieldsTab.sort((a, b) => a.order - b.order);

  }
}
