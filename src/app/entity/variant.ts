import {ProfessionalStandard} from './professional-standard';
import {Course} from './course';

export class Variant{
  text: string;
  value: any;

  constructor(text: string, value: any) {
    this.text = text;
    this.value = value;
  }
}
