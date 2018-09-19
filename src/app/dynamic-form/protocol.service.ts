import { Injectable }       from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { FieldBase }     from './field-base';
import { TextField }  from './field-text';
import { NumberField }  from './field-number';
import { SelectField } from './field-select';
import { AutocompField} from './field-autocomplete';
import {CheckboxField} from './field-checkbox';
import {RadioField} from './field-radio';
import {DateField} from './field-date';



@Injectable()
export class FieldService {

  constructor(public http: Http) {
   
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
        case "checkbox" :
            formFied = new CheckboxField({
             });
            break;
        case "radio" :
            formFied = new RadioField({
              options: field.options 
            });
          break;
        case "autocomplete" :
            formFied = new AutocompField({
            });
            break;
        case "date" :
        formFied = new DateField({
        });
        break;
    }
    formFied.key = field.key;
    formFied.label = field.label;
    formFied.order = field.order;
    formFied.required = field.required;
    formFied.options = field.options || '';



    fieldsTab.push(formFied);
    }); 
    return fieldsTab.sort((a, b) => a.order - b.order);

  }
}
