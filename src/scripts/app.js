function urlParser ( urlFormatString, urlInstance ) {

    // Spliting the given format into different parts
    const newObjectProperties = splitAnyString( urlFormatString, '/' );

    // Splitting the url instance in two parts: format's values and parameters
    const [urlFormatValues, urlParameters] = splitAnyString( urlInstance, '?' );

    // Splitting the fomat's values to get each of them individually, identifying all variables parts with a colon at the begining
    const newObjValues = splitAnyString( urlFormatValues, '/' );

    // Splitting the parameters get each one as a "key-value" format. Ex: 'sort=desc'
    const urlParametersSplitted = splitAnyString(urlParameters, '&');
    
    urlParametersSplitted.forEach(element => {

        // Adding new keys' name as new properties (the left side of the parameters)
        newObjectProperties.push( ":" + element.substring( 0, element.indexOf("=")) );

        // Adding new values' parameters as new values (the right side of the parameters)
        newObjValues.push( element.substring(element.indexOf("=") + 1, element.length) );

    });

    const object = {};

    for( let i = 0; i < newObjectProperties.length; i++ ) {
        // Including ONLY the variable parts into an object
        if( newObjectProperties[i][0] == ":" ) {
            object[`${ newObjectProperties[i].substring(1) }`] = newObjValues[i]
        }
    }

    return object;

}

// Helper function to split a string removing possibles emtpy strings trhoughout the process
function splitAnyString( string, character ) {
    return string.split(character)
                 .filter( string => string.length != 0);
}