const form = document.querySelector('#url-parser-form');
const preTag = document.querySelector('#output');
const uiMessageContainer = document.querySelector("#ui-alert");

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
            uiMessages("URL parsed succesfully", "success", uiMessageContainer);

        } else {

            uiMessages("URL instance should match to the URL format ", "error", uiMessageContainer);

        }

    } else {

        uiMessages("Both URL format and URL instance shouldn't be empty ", "error", uiMessageContainer);

    }

});