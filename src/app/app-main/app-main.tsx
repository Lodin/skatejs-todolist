import {Component, h} from 'skatejs/src/index';
import ClearableTextField from '../extensions/ClearableTextField'

class AppMain extends Component<null> {
  renderCallback() {
    return [
      <ClearableTextField />
    ];
  }
}

customElements.define('app-main', AppMain);

export default AppMain;
