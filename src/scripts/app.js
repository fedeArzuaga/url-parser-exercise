import {urlParser} from "./script";

const form = document.querySelector('#url-parser-form');

form.addEventListener('submit', e => {

    console.log(e.target.urlFormat, e.target.urlInstance)
    console.log(urlParser);

});