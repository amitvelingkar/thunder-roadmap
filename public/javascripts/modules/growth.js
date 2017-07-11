import axios from 'axios';
import { $ } from './bling';

function ajaxGrowth(e) {
    e.preventDefault();
    axios
    .post(`/api/v1/feature/${this.dataset.feature}/growth`, {
        growth: this.value || undefined
    })
    .then(res => {
        // TODO
        const growth = res.data.growth;
    })
    .catch(console.error);
}

export default ajaxGrowth;
