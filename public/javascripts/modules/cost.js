import axios from 'axios';
import { $ } from './bling';

function ajaxCost(e) {
    e.preventDefault();
    axios
    .post(`/api/v1/feature/${this.dataset.feature}/cost`, {
        cost: this.value || undefined
    })
    .then(res => {
        // TODO
        const cost = res.data.cost;
    })
    .catch(console.error);
}

export default ajaxCost;
