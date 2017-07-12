import axios from 'axios';
import { $ } from './bling';

function ajaxFeatureBlocked(e) {
    e.preventDefault();
    axios
    .post(`/api/v1/feature/${this.dataset.feature}/blocked`, {
        blocked: this.checked
    })
    .then(res => {
        // TODO
        const blocked = res.data.blocked;
    })
    .catch(console.error);
}

export default ajaxFeatureBlocked;
