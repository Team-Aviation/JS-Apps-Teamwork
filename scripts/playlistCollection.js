var PlaylistCollection = (function() {
	// This will be used in the other objects
	//var idCounter = 0;
	var PlaylistCollection = Object.create({});

	Object.defineProperty(PlaylistCollection, 'init', {
		value: function(playlists) {
			this.setOfPlaylists = playlists;

			return this;
		}
	});

	Object.defineProperty(Item, 'setOfPlaylists', {
        get: function () {
            return this._setOfPlaylists;
        },
        set: function (playlists) {
            validatePlaylistsArray(playlists);
            this._description = playlists;
        }
    });

    Object.defineProperty(PlaylistCollection, 'searchForPlaylists', {
		value: function(keywords) {
			var foundPlaylists = [];
			var i, j, k, collectionLen, wordsLen, propertyItemsCount;
			var currentPlaylist, currentPlaylistName, currentPlaylistTrack, currentPlaylistGenre;
			var currentWord;
			var playlistAlreadyAdded;

			// TODO: Validate the input!!!!!!!

			// Iterating on the current set of playlists
			for (i = 0, collectionLen = this.setOfPlaylists.length; i < collectionLen; i += 1) {
				currentPlaylist = this.setOfPlaylists[i];
				currentPlaylistName = currentPlaylist.name.toLowerCase();
				playlistAlreadyAdded = false;

				// Iterating on the keywords patterns array
				for (j = 0, wordsLen = keywords.length; j < wordsLen; j += 1) {
					currentWord = keywords[j].toLowerCase();

					// Checking if current word is contained in the current playlist
					if (currentPlaylistName.indexOf(currentWord) >= 0) {
						foundPlaylists.push(currentPlaylist);
						// playlistAlreadyAdded = true;
						break;
					}

					// Checking if current word is contained in any of the current playlist tracks name
					for (k = 0, propertyItemsCount = currentPlaylist.tracksList.length;
							k < propertyItemsCount; k += 1) {
						currentPlaylistTrack = currentPlaylist.tracksList[k].name.toLowerCase();
						if (currentPlaylistTrack.indexOf(currentWord) >= 0) {
							foundPlaylists.push(currentPlaylist);
							playlistAlreadyAdded = true;
							break;
						}
					}

					if (playlistAlreadyAdded) {
						break;
					}

					// Checking if current word is contained in any of the current playlist genres
					for (k = 0, propertyItemsCount = currentPlaylist.genre.length;
							k < propertyItemsCount; k += 1) {
						currentPlaylistGenre = currentPlaylist.genre[k].toLowerCase();
						if (currentPlaylistGenre.indexOf(currentWord) >= 0) {
							foundPlaylists.push(currentPlaylist);
							break;
						}
					}
				}

			}

			return foundPlaylists;
		}
	});



    function validatePlaylistsArray(playlists) {
    	var i,
			len,
			currentItem;

    	if (!(playlists instanceof Array)) {
			throw new Error('Input playlists are not in the format required!');
		}
		if (playlists.length < 1) {
			throw new Error('Playlists array should have at least one playlist as content!');
		}
		for (i = 0, len = playlists.length; i < len; i++) {
			currentItem = playlists[i];
			if(!(currentItem.id && currentItem.name && currentItem.genre && currentItem.tracksList)) {
				throw new Error('The input objects in the array are not playlists!');
			}
		}
    }

	return PlaylistCollection;

}());

export {PlaylistCollection};