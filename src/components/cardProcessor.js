define([], function() {

    // Returns a random integer between min (included) and max (excluded)
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    var result = {};
    result.makeCard = function(s, r) {
        return {
            suit: s,
            rank: r
        };
    };
    result.getCardKey = function(c) {
        return c.suit + c.rank;
    };


    result.getDeck= function() {
        var suits = ['spades', 'hearts', 'clubs', 'diamonds'];
        var rank = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
        var deck = [];
        suits.forEach(function(s) {
            rank.forEach(function(r) {
                deck.push(this.makeCard(s,r));
            }, this);
        }, this);
        // for(var x=0;x<2;x++) {
        //     deck.push(this.makeCard('joker', 'joker'));
        // }
        return deck;
    };
    result.getShuffled= function(a) {
        var unshuffled = a.map(function(x){return x;});
        var shuffled = [];
        while(unshuffled.length != 0) {
            var removed = unshuffled.splice(getRandomInt(0, unshuffled.length), 1);
            shuffled.push(removed[0]);
        }
        return shuffled;
    };

    result.getCardOperators = function(rankValues, suitMultipliers) {
        var deck = this.getDeck();
        var result = {};
        deck.forEach(function(card) {
            var key = this.getCardKey(card);
            var operator = function(value) {
                return value + (suitMultipliers[card.suit] * rankValues[card.rank]);
            };
            result[key] = operator;
        }, this);
        return result;
    };
    result.defaultRankValues = {
        'ace': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'jack': 10,
        'queen': 10,
        'king': 10
    };
    result.defaultSuitMultipliers = {
        spades: 1,
        hearts: -1,
        clubs: 1,
        diamonds: -1
    };

    result.playGame = function(deck, cardOperators, targetCount) {
        var total = 0;
        var cardCount = 0;
        var reachedTotal = false;
        deck.every(function(card, cardNumber) {
            total = cardOperators[this.getCardKey(card)](total);
            if (total >= targetCount || total <= -targetCount) {
                cardCount = cardNumber + 1;
                reachedTotal = true;
                return false;
            }
            return true;
        }, this);
        if (reachedTotal)
            return  cardCount;
        else
            return deck.length + 1;
    };
    result.createArray = function(arrayLength, initValue) {
        var result = [];
        for(var i=0;i<arrayLength;i++) {
            result.push(initValue);
        }
        return result;
    };

    result.playGames = function(getDeckfunc, cardOperators, targetCount, gameIterations) {
        var frequencyCount = this.createArray(getDeckfunc().length + 1, 0);
        var cardCount = -1;
        for(var i=0;i<gameIterations;i++) {
           cardCount = this.playGame(getDeckfunc(), cardOperators, targetCount); 
           frequencyCount[cardCount-1] += 1;
        }
        return frequencyCount;
    };


    return result;
});

