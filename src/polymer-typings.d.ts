import {HTMLProps} from 'skatejs/src/ts-typings/common';

declare class PaperButton extends HTMLElement {
  public raised: boolean;
}

declare class PaperInput extends HTMLElement {
  public accept: string;
  public allowedPattern: string;
  public alwaysFloatLabel: boolean;
  public autocapitalize: string;
  public autocomplete: string;
  public autocorrect: string;
  public autofocus: boolean;
  public autosave: string;
  public autoValidate: string;
  public charCounter: string;
  public disabled: boolean;
  public errorMessage: string;
  public label: string;
  public type: string;
  public value: string;

  public change(event: Event): void;
}

declare class PaperIcon extends HTMLElement {
  public icon: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'paper-button': HTMLProps<PaperButton>,
      'paper-input': HTMLProps<PaperInput>,
      'paper-icon-button': HTMLProps<PaperIcon>
    }
  }
}
