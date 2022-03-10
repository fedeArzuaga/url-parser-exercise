const form = document.querySelector('#url-parser-form');
const preTag = document.querySelector('#output');

form.addEventListener('submit', e => {

    e.preventDefault();

    const data = {
        format: e.target.urlFormat.value,
        instance: e.target.urlInstance.value
    }

    if ( data.format.length > 0 && data.instance.length > 0 ) {

        const validateData = validateFormat(data.format, data.instance, "/");

        if ( validateData ) {
            const result = urlParser(data.format, data.instance);
            preTag.textContent = JSON.stringify(result, null, 4);
        }

    }

});