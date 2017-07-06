import axios from 'axios';
import { $ } from './bling';

function ajaxComment(e) {
    // if user did not press enter return
    if (e.keyCode !== 13) {
        return;
    }
    e.preventDefault();
    this.blur();
    axios
    .post(`/api/v1/feature/${this.dataset.feature}/review/comment`, {
        workflow: this.dataset.workflow,
        comment: this.value
    })
    .then(res => {
        // TODO: give user feedback
        const comment = res.data.comment;
    })
    .catch(console.error);
}

export default ajaxComment;
