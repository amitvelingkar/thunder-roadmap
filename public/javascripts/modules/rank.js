import axios from 'axios';
import { $ } from './bling';

function ajaxRank(e) {
    // if user did not press enter return
    if (e.type === 'keydown' && e.keyCode !== 13) {
        return;
    }
    e.preventDefault();
    this.blur();
    axios
    .post(`/api/v1/feature/${this.dataset.feature}/rank`, {
        stackrank: this.value
    })
    .then(res => {
        // TODO: give user feedback
        const stackrank = res.data.stackrank;
    })
    .catch(console.error);
}

export default ajaxRank;
