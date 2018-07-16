import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { FieldBase }              from './dynamic-form/field-base';
import { FieldControlService }    from './dynamic-form/field-control.service';
import { FieldService } from './dynamic-form/protocol.service';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [FieldControlService, FieldService ]
})
export class DynamicFormComponent implements OnInit {

  //@Input() fields: FieldBase<any>[] = [];
  fields: FieldBase<any>[] = [];
  form: FormGroup;
  payLoad = '';


  constructor(private qcs: FieldControlService, service : FieldService) {
    this.fields = service.getFields();
    }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.fields);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
