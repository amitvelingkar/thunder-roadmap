import axios from 'axios';
import { $ } from './bling';

function ajaxFeatureSentiment(e) {
    e.preventDefault();
    axios
    .post(`/api/v1/feature/${this.dataset.feature}/sentiment`, {
        sentiment: this.value || undefined
    })
    .then(res => {
        // TODO
        const sentiment = res.data.sentiment;
    })
    .catch(console.error);
}

export default ajaxFeatureSentiment;
