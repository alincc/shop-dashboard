import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';

import { Attribute, AttributeValue, Combination, Product, ResolveEmit } from '../../../model/interface';
import { ConfirmationService, ToastService } from '../../../services';

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

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.enabledAttributesIds = this.combinationForm.value.combinations.reduce((enabled, combination) => {
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

  initCombinations() {
    return this.product.combinations.map(combination =>
      this.fb.group({
        quantity: combination.quantity,
        attributes: this.fb.array(combination.attributes.map(attribute => (
          this.fb.group({
            attribute: attribute.attribute,
            value: attribute.value,
          })
        ))),
      })
    );
  }

  onDeattachAttribute(attribute: Attribute): void {
    this.confirmationService
      .create('Are you sure?', 'Deattaching an attribute will remove the attribute from previously created combinations')
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.deattachAttribute(attribute);
        }
      });
  }

  deattachAttribute(attribute: Attribute): void {
    let items = this.combinationForm.get('combinations') as FormArray;
    for (let i = items.controls.length - 1; i >= 0; i--) {

      let attributes = items.at(i).get('attributes') as FormArray;

      for (let y = attributes.controls.length - 1; y >= 0; y--) {
        let attributeName = attributes.at(y).get('attribute').value.name;

        if (attribute.name == attributeName) {
          attributes.removeAt(y);
        }
      }

      // If the combinations have no attributes after deattaching, remove the combination
      if (attributes.value.length <= 0) {
        items.removeAt(i);
      }
    }

    // If the deattached attribute is currently selected, remove it from selected attributes
    this.selectedAttributes = this.selectedAttributes.filter(item => item.attribute._id !== attribute._id);

    // Remove the attribute from enabled attributes
    delete this.enabledAttributesIds[attribute._id];
  }

  /**
   * Returns true if there is enabled attributes that have not been selected
   * Returns false if all enabled attributes have been selected
   * @return {boolean}
   */
  notAllAttributesSelected(): boolean {
    return Object.keys(this.enabledAttributesIds).length !== this.selectedAttributes.length;
  }

  isSelected(attribute: Attribute, value: AttributeValue): boolean {
    return this.selectedAttributes.find(item => item.attribute == attribute && item.value == value);
  }

  onEnableAttribute(attribute: Attribute) {
    // console.log(attribute);
    this.enabledAttributesIds[attribute._id] = true;
  }

}
