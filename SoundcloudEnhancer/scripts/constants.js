var constants = (function() {
    // Checking if the module is sucsessfully loaded
    console.log('Constants sucsessfully loaded!');

    return {
        MIN_NAME_LENGTH: 2,
        MAX_NAME_LENGTH: 40
    };
}());

export {constants};