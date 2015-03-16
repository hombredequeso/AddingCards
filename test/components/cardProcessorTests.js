
define(['components/cardProcessor', 'underscore'], function(cp, _) {
    describe('cardProcessor Tests', function() {

        it('should exist', function() {
            expect(cp).not.toBe(undefined);
        });

        it('getDeck should return 54 cards', function() {
            var deck = cp.getDeck();

            expect(deck.length).toBe(52);
        });
        it('getShuffled should return a new deck of shuffled cards', function() {
            var deck = cp.getDeck();

            var shuffledDeck = cp.getShuffled(deck);

            expect(shuffledDeck.length).toBe(deck.length);
        });
        it('getCardFunction finds expected card function based on card key', function() {
            var cardOperators = {};
            var card = cp.makeCard('spade', '2');
            cardOperators[cp.getCardKey(card)] = function(x) {return x + 1;};
            var operator = cardOperators[cp.getCardKey(card)];
            var result = operator(7);

            expect(result).toBe(8);
        });

        it('underscore is defined ok', function() {
            expect(_).not.toBe(undefined);
        });

        it('getCardOperators get specified operator for each card', function() {


            var cardOperators = cp.getCardOperators(
                cp.defaultRankValues, 
                cp.defaultSuitMultipliers);

            expect(_.keys(cardOperators).length).toBe(52);

            var aceOfSpadesOperator = cardOperators[cp.getCardKey(cp.makeCard('spades', 'ace'))];
            var testValue = aceOfSpadesOperator(10);
            expect(testValue).toBe(11);

            var twoOfSpadesOperator = cardOperators[cp.getCardKey(cp.makeCard('spades', '2'))];
            var testValue = twoOfSpadesOperator(10);
            expect(testValue).toBe(12);

            var aceOfHeartsOperator = cardOperators[cp.getCardKey(cp.makeCard('hearts', 'ace'))];
            var testValue2 = aceOfHeartsOperator(10);
            expect(testValue2).toBe(9);
        });

        it('playGame returns count to target', function() {
            var deck = cp.getDeck();
            var cardOperators = cp.getCardOperators(
                cp.defaultRankValues, 
                cp.defaultSuitMultipliers);

            var targetCount =3;

            var gameCardCount = cp.playGame(deck, cardOperators, targetCount);

            expect(gameCardCount).toBe(2);
            
        });

        it('playGames returns frequency count array', function() {
            var deck= cp.getDeck();
            var getDeckfunc = function() {return deck;};
            var cardOperators = cp.getCardOperators(
                cp.defaultRankValues, 
                cp.defaultSuitMultipliers);
            var targetCount = 3;
            var gameIterations = 10;

            var frequencyCount = cp.playGames(
                getDeckfunc, 
                cardOperators, 
                targetCount, 
                gameIterations);
        });
    });

});
