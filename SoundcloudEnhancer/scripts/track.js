var track = (function(){
    // Checking if the module is successfully loaded
    console.log('Track successfully loaded!');

    var previousID = 1;

    var trackObject = {
        init: function(name, url) {
            this._id = previousID++;
            this.name = name;
            this.url = url;

            return this;
        },
        get id(){
            return this._id;
        },
        get name(){
            return this._name;
        },
        set name(value){
            validator.validateName(value, 'Track name');

            this._name = value;
        },
        get url(){
            return this._url;
        },
        set url(value){
            validator.validateUrl(value, 'Track URL');

            this._url = value;
        }
    };

    return trackObject;
}());

export {track};
