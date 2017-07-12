import axios from 'axios';
import { $ } from './bling';

function ajaxTargetMilestone(e) {
    e.preventDefault();
    axios
    .post(`/api/v1/feature/${this.dataset.feature}/target-milestone`, {
        targetMilestone: this.value || undefined
    })
    .then(res => {
        // TODO
        const targetMilestone = res.data.targetMilestone;
    })
    .catch(console.error);
}

export default ajaxTargetMilestone;
