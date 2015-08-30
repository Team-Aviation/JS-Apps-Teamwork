var playlistCollection = (function() {
    // Checking if the module is sucsessfully loaded
    console.log('PlaylistCollection sucsessfully loaded!');

	var PlaylistCollection = Object.create({});

	// UNIT TESTS: Check if creates PlaylistCollection as expected:
	// When giving no input to throw
	// When giving a non array as input to throw
	// When giving an empty array to throw
	// When giving an array of objects different from playlist to throw
	// When giving an array of playlists and one different object to throw
	// When giving an array of one playlist to create a PlaylistCollection
	// When giving an array of many playlists to create a PlaylistCollection
	Object.defineProperty(PlaylistCollection, 'init', {
		value: function(playlists) {
			this.setOfPlaylists = playlists;

			return this;
		}
	});

	Object.defineProperty(PlaylistCollection, 'setOfPlaylists', {
        // UNIT TESTS: Check if returns the expected value:
        // Array of playlist
        get: function () {
            return this._setOfPlaylists;
        },
        set: function (playlists) {
            validatePlaylistsArray(playlists);
            this._description = playlists;
        }
    });

    // UNIT TESTS: Check if returns the expected array of playlists:
	// When giving no input to throw
	// When giving a non array as input to throw
	// When giving an empty array to throw
	// When giving an array of objects different from strings to throw
	// When giving an array of strings and one different from string object to throw
	// When giving an array of one string that has no match in the playlists to return an empty array
	// When giving an array of many strings that have no match in the playlists to return an empty array
	// When giving an array of strings that match one name of playlist to return an array of that playlist
	// When giving an array of strings that match more names of playlists to return an array of those playlists
	// When giving an array of strings that match one name of track in one playlist to return an array of that playlist
	// When giving an array of strings that match names of tracks in different playlists to return an array of those playlists
	// When giving an array of strings that match one genre in one playlist to return an array of that playlist
	// When giving an array of strings that match genres in different playlists to return an array of those playlists
	// When giving an array of strings that match names, genres and names of tracks from different playlists to return an array of those playlists
	Object.defineProperty(PlaylistCollection, 'searchForPlaylists', {
		value: function(keywords) {
			var foundPlaylists = [];
			var i, j, k, collectionLen, wordsLen, propertyItemsCount;
			var currentPlaylist, currentPlaylistName, currentPlaylistTrack, currentPlaylistGenre;
			var currentWord;
			var playlistAlreadyAdded;

			vlidateStringsArray(keywords);

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

	// UNIT TESTS: Check if returns the expected PlaylistCollection:
	// When giving no input to throw
	// When giving a non playlist as input to throw
	// When giving a playlist that is already added to throw
	// When giving a playlist that is not still added to return PlaylistCollection whith added the given playlist
	Object.defineProperty(PlaylistCollection, 'addNewPlaylist', {
		value: function(playlist) {
			var i, len, currentPlaylist;

			validateIfPlaylist(playlist);
			
			for (i = 0, len = this.setOfPlaylists.length; i < len; i += 1) {
				currentPlaylist = this.setOfPlaylists[i];
				if (currentPlaylist.id === playlist.id) {
					throw new Error('The playlist is already added to this set!');
				}
			}

			this._setOfPlaylists.push(playlist);

			return this;
		}
	});

	// UNIT TESTS: Check if returns the expected PlaylistCollection:
	// When giving no input to throw
	// When giving a non number as input to throw
	// When giving an id that does not match any playlist id to throw
	// When giving an id that matches a playlist to retyrn PlaylistCollection in which the playlist with the given id ie removed
	Object.defineProperty(PlaylistCollection, 'deletePlaylist', {
		value: function(id) {
			var i, len, currentPlaylistId;
			var playlistRemoved = false;

			validateIfNumber(id);

			for (i = 0, len = this.setOfPlaylists.length; i < len; i += 1) {
				currentPlaylistId = this.setOfPlaylists[i].id;
				if (currentPlaylistId === id) {
					this._setOfPlaylists.splice(i, 1);
					playlistRemoved = true;
				}
			}

			if (!playlistRemoved) {
				throw new Error('Unable to find playlist with the given id!');
			}

			return this;
		}
	});

    function validatePlaylistsArray(playlists) {
    	var i, len;

		validateIfNonEmptyArray(playlists);
    	
		for (i = 0, len = playlists.length; i < len; i++) {
			validateIfPlaylist(playlists[i]);
		}
    }

    function vlidateStringsArray(keywords) {
    	var i, len;

    	validateIfNonEmptyArray(keywords);

    	for (i = 0, len = keywords.length; i < len; i++) {
			validateIfeNonEmptyString(keywords[i]);
		}
    }

    function validateIfeNonEmptyString(obj) {
    	if (!((typeof obj === 'string' || obj instanceof String) && obj)) {
			throw new Error('The input object is not a non empty string!');
		}
    }

    function validateIfNonEmptyArray(obj) {
		if (!(obj instanceof Array)) {
			throw new Error('The input should be an array!');
		}
		if (obj.length < 1) {
			throw new Error('The input array should have at least one item as content!');
		}
	}

	function validateIfPlaylist(obj) {
		if(!(obj.id && obj.name && obj.genre && obj.tracksList)) {
			throw new Error('The input objects is not a playlist!');
		}
	}

	function validateIfNumber(obj) {
		if (isNaN(obj)) {
			throw new Error('The input objects is not a number!');
		}
	}

	return PlaylistCollection;
}());

export {playlistCollection};