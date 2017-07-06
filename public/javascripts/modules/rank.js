import axios from 'axios';
import { $ } from './bling';

function ajaxRank(e) {
    e.preventDefault();
    this.stackrank.blur();
    axios
    .post(this.action, {
        stackrank: this.stackrank.value
    })
    .then(res => {
        // TODO
        const stackrank = res.data.stackrank;
    })
    .catch(console.error);
}

export default ajaxRank;
