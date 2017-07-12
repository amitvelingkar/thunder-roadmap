import axios from 'axios';
import { $ } from './bling';

function ajaxFeatureDependency(e) {
    e.preventDefault();
    axios
    .post(`/api/v1/feature/${this.dataset.feature}/dependency`, {
        dependency: this.checked
    })
    .then(res => {
        // TODO
        const dependency = res.data.dependency;
    })
    .catch(console.error);
}

export default ajaxFeatureDependency;
