import {Component, h, emit} from 'skatejs/src/index';
import style from './ClearableTextField.css';

class ClearableTextField extends Component<null> {
  public renderCallback() {
    return [
      <style>{style}</style>,
      <div class="text">
        <paper-input label="test label" onKeypress={(event) => console.log(event)} />
      </div>,
      <div class="cancel">
        <paper-icon-button icon="cancel" />
      </div>
    ];
  }
}

customElements.define('clearable-text-field', ClearableTextField);

export default ClearableTextField;
