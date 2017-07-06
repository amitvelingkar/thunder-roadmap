import axios from 'axios';
import { $ } from './bling';

function ajaxMilestone(e) {
    e.preventDefault();
    axios
    .post(`/api/v1/feature/${this.dataset.feature}/rate`, {
        workflow: this.dataset.workflow,
        milestone: this.value
    })
    .then(res => {
        // TODO
        const score = res.data.score;
    })
    .catch(console.error);
}

export default ajaxMilestone;
