import axios from 'axios';
import { $ } from './bling';

function ajaxMilestone(e) {
    e.preventDefault();
    axios
    .post(`/api/v1/feature/${this.dataset.feature}/review/milestone`, {
        workflow: this.dataset.workflow,
        milestone: this.value
    })
    .then(res => {
        // TODO
        const rating = res.data.rating;
    })
    .catch(console.error);
}

export default ajaxMilestone;
