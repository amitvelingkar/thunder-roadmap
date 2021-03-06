import axios from 'axios';
import { $ } from './bling';

function ajaxFeatureName(e) {
    // if user did not press enter return
    if (e.type === 'keydown' && e.keyCode !== 13) {
        return;
    }
    e.preventDefault();
    this.blur();
    axios
    .post(`/api/v1/feature/${this.dataset.feature}/name`, {
        name: this.value
    })
    .then(res => {
        // TODO: give user feedback
        const name = res.data.name;
    })
    .catch(console.error);
}

export default ajaxFeatureName;
