import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Attribute, AttributeValue, Combination, Product } from '../../model/interface';

import * as _ from 'lodash';

@Component({
  selector: 'app-attribute-editor',
  templateUrl: './attribute-editor.component.html',
  styleUrls: ['./attribute-editor.component.scss'],
})
export class AttributeEditorComponent implements OnInit {
  @Input() attributes: Attribute[];
  @Input() combinationForm: FormGroup;
  @Input() product: Product;

  selectedAttributes: any = [];
  toggle = {};
  created: boolean = false;
  enabledAttributesIds: any = {};

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.enabledAttributesIds = this.product.combinations.reduce((enabled, combination) => {
      combination.attributes
        .map(item => item.attribute._id)
        .forEach(id => enabled[id] = true);

      return enabled;
    }, {});
  }

  onSelectAttribute(attribute: Attribute, value: AttributeValue): void {
    // Remove attribute if it is already selected
    if (this.isSelected(attribute, value)) {
      this.selectedAttributes = this.selectedAttributes.filter(item => item.attribute != attribute);
      return null;
    }

    // Remove previously values on this attribute, if any
    this.selectedAttributes = this.selectedAttributes.filter(item => item.attribute != attribute);

    this.selectedAttributes.push({
      attribute,
      value,
    });
  }

  initCombinationControl() {
    return this.fb.group({
      quantity: 0,
      attributes: this.fb.array(this.selectedAttributes.map(attribute => (
        this.fb.group({
          attribute: attribute.attribute,
          value: attribute.value,
        })
      ))),
    })
  }

  onCreateCombination(): void {
    if (!this.selectedAttributes.length) {
      return null;
    }
    const control = <FormArray>this.combinationForm.controls['combinations'];
    control.push(this.initCombinationControl());

    this.selectedAttributes = [];
    this.created = true;
  }

  onRemoveCombination(index: number): void {
    const control = <FormArray>this.combinationForm.controls['combinations'];
    control.removeAt(index);
  }

  onDeattachAttribute(attribute: Attribute): void {
    // TODO: implement
  }

  isSelected(attribute: Attribute, value: AttributeValue): boolean {
    return this.selectedAttributes.find(item => item.attribute == attribute && item.value == value);
  }

  onEnableAttribute(attribute: Attribute) {
    // console.log(attribute);
    this.enabledAttributesIds[attribute._id] = true;
  }

}
