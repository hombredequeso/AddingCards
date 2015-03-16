define(["knockout", "text!./home.html", "components/cardProcessor"], function(ko, homeTemplate, cp) {

  function HomeViewModel(route) {
    var rankValue = function(r,v){return {rank:r, value:v};};
    var rankArray = [
        rankValue('ace', 1),
        rankValue('2', 2),
        rankValue('3', 3),
        rankValue('4', 4),
        rankValue('5', 5),
        rankValue('6', 6),
        rankValue('7', 7),
        rankValue('8', 8),
        rankValue('9', 9),
        rankValue('10', 10),
        rankValue('jack', 10),
        rankValue('queen', 10),
        rankValue('king', 10)
    ];
    this.rankValues = ko.observableArray(rankArray);
    this.cardsPlayed = ko.observableArray([]);
    this.message = ko.observable('waiting to play...');
    this.iterations = ko.observable(50);
    this.targetCount = ko.observable(15);
  }

  HomeViewModel.prototype.play = function() {
      var itr = this.iterations();
      var target = this.targetCount();
      var deck= cp.getDeck();
      var getDeckfunc = function() {return cp.getShuffled(deck);};
      var rankValues = {};
      this.rankValues().forEach(function(x) {
          rankValues[x.rank] = x.value;
      });
      var cardOperators = cp.getCardOperators(
          rankValues,
          //cp.defaultRankValues, 
          cp.defaultSuitMultipliers);

      var frequencyCount = cp.playGames(
          getDeckfunc, 
          cardOperators, 
          target, 
          itr);

      var result = frequencyCount.map(function(x, i) {
          return {
              cardCount: (i===52)? 'Ran out': i + 1,
              gameCount: x 
          };
      });
      this.cardsPlayed(result);


      //this.message(frequencyCount);
  };

  return { viewModel: HomeViewModel, template: homeTemplate };

});
