var friendsData = require('../data/friends.js');

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.json(friendsData);
});

router.post('/', function(req, res){

    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };
    var scoresArray = [];
    for(var i=0; i < req.body.scores.length; i++) {
        scoresArray.push( parseInt(req.body.scores[i]) )
    }
    newFriend.scores = scoresArray;

    var scoreComparisonArray = [];
    for(var i = 0; i < friendsData.length; i++) {
        var currentComparison = 0;
        for(var j = 0; j < newFriend.scores.length; j++) {
            currentComparison += Math.abs( newFriend.scores[j] - friendsData[i].scores[j] );
        }

        scoreComparisonArray.push(currentComparison);
    }
    
    var bestMatchPostion = 0;
    for(var i = 1; i < scoreComparisonArray.length; i++){
        if(scoreComparisonArray[i] <= scoreComparisonArray[bestMatchPostion]) {
            bestMatchPostion = i;
        }
    }

    var bestFriendMatch = friendsData[bestMatchPostion];

    res.json(bestFriendMatch);

    friendsData.push(newFriend);

});

module.exports = router;