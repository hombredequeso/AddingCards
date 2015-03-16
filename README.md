
#CARD ADDING GAME SIMULATOR
Simulator to determine the card count frequency for a simple card adding game.
The game was originally written to assist in setting card values to achieve games of a certain length for a high school assignment.
From a programming perspective, it was a good opportunity to try out the [Yeoman](http://yeoman.io/) knockout single-page-application generator, as illustrated in the video, ["Steve Sanderson - Architecting large Single Page Applications with Knockout.js"](https://vimeo.com/97519516)
##RULES OF THE GAME
* Cards are given the value specified. Spades and clubs are positive amounts, hearts and clubs are negative.
* Starting score is 0.
* Playing one card at a time, add the card value to the current total.
* The game finishes when the score is equal to or greater than the "Winning Value", or equal to or less than the negative "Winning Value."

##THE PROGRAM
The game is played "Games to Play" times. The frequency of how many cards were used before the game was won is displayed.

##PROGRAM SETUP AND USAGE
Although not really a single-page-application worthy application, this was used to try out the Yeoman knockout single-page-application generator.
It also uses many of the usual web/javascript development suspects along the way: nodejs, gulp, karma, bower.

Following are a few details concerning the program, setup, and usage (not intended to be comprehensive).

####Pre-requisites
* nodejs and npm installed.
* An http server of some kind. A simple option is to use the nodejs http-server.

####The Program
To use, the following steps or equivalent are required:
Get the source code:
```
git clone https://github.com/hombredequeso/AddingCards
cd AddingCards
```
Use npm to get various dependencies
```
npm install
```
Use bower to get the javascript dependencies
```
bower install
```
At this point, it is possible to run the debug version
```
http-server src
```
Or use gulp to compile and then run the release verson
```
gulp
http-server dist
```

####Testing
Use bower to get test javascript dependencies
```
cd test
bower install
cd ..
```
Run the tests using karma
```
karma start
```
