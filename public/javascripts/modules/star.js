import axios from 'axios';
import { $ } from './bling';

function ajaxStar(e) {
    e.preventDefault();
    axios
    .post(this.action, {
        workflow: this.workflow.value,
        score: this.star.value
    })
    .then(res => {
        const score = res.data.score;
        const stars = this.parentElement.getElementsByClassName('star__button');
        for (let i=0; i < stars.length; i++) {
            if (i<score) {
                stars[i].classList.add('star__button--starred');
            } else {
                stars[i].classList.remove('star__button--starred');
            }
        }
    })
    .catch(console.error);
}

export default ajaxStar;
