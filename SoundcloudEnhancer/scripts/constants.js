var constants = (function() {
    // Checking if the module is successfully loaded
    console.log('Constants successfully loaded!');

    return {
        MIN_NAME_LENGTH: 2,
        MAX_NAME_LENGTH: 40
    };
}());

export {constants};
