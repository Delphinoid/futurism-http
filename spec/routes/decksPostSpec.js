describe('decks-post', function() {

    var mongoose = require('mongoose');
    require('../../fns/mongoose/findByIdAndSave').attach(mongoose);
    var mockgoose = require('mockgoose');
    mockgoose(mongoose);

    var decksPost = require('../../routes/decksPost');


    it('should save a valid deck', function(done) {
        var request = {
            session: {
                _id: mongoose.Types.ObjectId()
            },
            body: {
                name: 'Team Flamingo',
                cards: ['1111111111', '222222222222'],
                pride: 5
            }
        };
        decksPost(request, {apiOut: function(err, result) {
            expect(err).toBe(null);
            expect(result.name).toBe('Team Flamingo');
            done();
        }});
    });

});