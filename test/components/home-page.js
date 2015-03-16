define(['components/home-page/home'], function(homePage) {
  var HomePageViewModel = homePage.viewModel;

  describe('Home page view model', function() {

    it('should supply a friendly message which changes when acted upon', function() {
      var instance = new HomePageViewModel();
      expect(instance.cardsPlayed().length).toBe(0, "initial cardPlayed should have nothing");

      // See the message change
      instance.play();
      expect(instance.cardsPlayed().length)
        .toBeGreaterThan(0, "cannot be 0 cards played after playing");
    });

  });

});



