describe('decks-get', function() {

    var mongoose = require('mongoose');
    var mockgoose = require('mockgoose');
    mockgoose(mongoose);

    var CardGoose = require('../../models/card'); //need this for deck model
    var DeckGoose = require('../../models/deck');
    var decksGet = require('../../routes/decksGet');


    var userId1;

    beforeEach(function(done) {
        userId1 = mongoose.Types.ObjectId();

        DeckGoose.create({
                _id: '1-deck',
                name: 'Saints',
                cards: ['st.pattrick', 'st.peters', 'thepope'],
                userId: userId1,
                pride: 3
            },
            function(err, deck) {
                if(err) {
                    throw err;
                }

                DeckGoose.create({
                        _id: '1-ldfsj',
                        name: 'Buffalo',
                        cards: ['buffalo', 'buffalo', 'buffalo'],
                        userId: userId1,
                        pride: 3
                    },
                    function(err, deck) {
                        if(err) {
                            throw err;
                        }
                        done();
                    });
            });
    });


    afterEach(function() {
        mockgoose.reset();
    });


    it('should return a deck that is owned by the requester', function(done) {
        var request = {
            session: {
                _id: userId1
            },
            body: {
                deckId: '1-deck'
            }
        };
        decksGet(request, {apiOut: function(err, response) {
            expect(response.name).toBe('Saints');
            done(err);
        }});
    });


    it('should return a list of decks owned by the requester', function(done) {
        var request = {
            session: {
                _id: userId1
            }
        };
        decksGet(request, {apiOut: function(err, response) {
            expect(response.length).toBe(2);
            done();
        }});
    });

});