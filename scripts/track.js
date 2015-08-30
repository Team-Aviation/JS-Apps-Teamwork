var track = (function(){
    var previousID = 0;

    var validator = {
        validateIfUndefined: function(item, itemName){
            itemName = itemName || 'Value';

            if (item === undefined) {
                throw new Error(itemName + ' is undefined');
            }
        },
        validateIfString: function(str, strName){
            strName = strName || 'Value';

            if (typeof str !== 'string') {
                throw new Error(strName + ' is not a string');
            }
        },
        validateIfNumber: function(num, numName){
            numName = numName || 'Value';

            if (typeof num !== 'number') {
                throw new Error(numName + ' is not a number');
            }
        },
        validateName: function(name, nameName){
            nameName = nameName || 'Value';

            validator.validateIfUndefined(name, nameName);
            validator.validateIfString(name, nameName);
        },
        validateUrl: function(url, urlName){
            urlName = urlName || 'Value';

            validator.validateIfUndefined(url, urlName);
            validator.validateIfString(url, urlName);
            if (!isValidUrl(url)) {
                throw new Error(urlName + ' is not a valid URL.');
            }
        }
    };

    function isValidUrl(url){
        //TODO: validate URL

        return true;
    }

    var trackResult = {
        init: function(name, url) {
            this.name = name;
            this.url = url;
            this._id = previousID++;

            return this;
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
        },
        get id(){
            return this._id;
        }
    };

    return trackResult;
}());