

$(document).ready(function(){
    //turns jquery like a class
    var app = {
        //defining array of objects for the cards
        cards: [{num: 1, image: 'img/clam.png'}, {num: 1, image: 'img/clam.png'}, {num: 2, image: 'img/glasses.png'}, {num: 2, image: 'img/glasses.png'}, {num: 3, image: 'img/pail.png'}, {num: 3, image: 'img/pail.png'}, {num: 4, image: 'img/rainbow.png'}, {num: 4, image: 'img/rainbow.png'}, {num: 5, image: 'img/sandals.png'}, {num: 5, image: 'img/sandals.png'}, {num: 6, image: 'img/shell.png'}, {num: 6, image: 'img/shell.png'}, {num: 7, image: 'img/shells.png'},{num: 7, image: 'img/shells.png'}, {num: 8, image: 'img/snail.png'}, {num: 8, image: 'img/snail.png'}, {num: 9, image: 'img/snorkel.png'}, {num: 9, image: 'img/snorkel.png'}, {num: 10, image: 'img/starfish.png'}, {num: 10, image: 'img/starfish.png'}, {num: 11, image: 'img/sun.png'}, {num: 11, image: 'img/sun.png'}, {num: 12, image: 'img/tube.png'}, {num: 12, image: 'img/tube.png'}],
        // boolean for the 
        turn: true, 
        //score 
        scoreOne: 0,
        scoreTwo: 0,
        //calling the init method
        init: function() {
            app.shuffle();
        },
        //shuffle function 
        shuffle: function() {
            //generate random numbers
            var random = 0;
            var temp = 0;
            for(i = 1; i < app.cards.length; i++) {
                random = Math.round(Math.random() * i);
                //console.log(random);
                temp = app.cards[i];
                app.cards[i] = app.cards[random];
                app.cards[random] = temp;
            }
            //runs assign cards after it shuffles
            app.assignCards();
            //concatenate +app.cards
            console.log('Shuffled Card Array: '+app.cards);
        },
        // using data - 'dash' attr 
        assignCards: function() {
            //puts in index number to assign
            $('.card').each(function(index) {
                //iterate to pull the index of the num & the image together to assign to each card
                $(this).attr('data-card-value', app.cards[index]['num']);
                $(this).attr('data-card-image', app.cards[index]['image']);
            });
            // shuffled and assigned before the click handler
            app.clickHandlers();
        },
        // handlers
        clickHandlers: function() {
            $('.card').on('click', function() {
                console.log($(this).data('cardImage'));
                //adding the value and ard image to the card "front"
                //determine how many cards have been 'selected'
                $(this).html('<p>'+$(this).data('cardValue')+'</p>').addClass('selected').css('background-image', `url(${$(this).data('cardImage')})`);
                //everytime the card is flipped run the checkMatch
                app.checkMatch();
            });
        },
        checkMatch: function() {
            //if 2 of the items have been selected, 2 items have the class selected
            if ($('.selected').length == 2) {
                //console.log($('.selected').first().data('cardValue'));
                //if the selected the first card value = the last card data
                if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')){
                    //remove the card if the values match
                    $('.selected').each(function() {
                        //unmatched class to remove the unmatched class
                        $(this).animate({opacity: 0}).removeClass('unmatched');
                    });
                    $('.selected').each(function() {
                        $(this).removeClass('selected');
                    });    
                    //if player 1 makes a score it will add 1 in the button #player1
                    if(app.turn == true) {
                        app.scoreOne++;
                        $('#player1').html(app.scoreOne);
                    } else {
                    //else player 2 scores it will add 1 in the button #player2
                        app.scoreTwo++;
                        $('#player2').html(app.scoreTwo);
                    }
                    
                    //run check win
                    app.checkWin();
                } else {
                    //flip the cards back over if they do not match
                   setTimeout(function() {
                    $('.selected').html('').removeClass('selected').css('background-image', '')
                   }, 1000); //wait a second so you can see the card before it flips
                }
                //if app.turn is true player 1 background is blue otherwise Player 2 is yellow
            if (app.turn == true) {
            $('body').css('background-color', 'yellow');
                app.turn = false;
                    
            } else {
            $('body').css('background-color', '#1ac9ff');
                app.turn = true;
            }
            } 
        },
        // checkWin method
        checkWin: function() {
            //comparison to check if there is a win
            if($('.unmatched').length === 0) {  // === to ensure that the value is 0 and not null
                //if scoreOne is greater than scoreTwo player 1 wins
                if(app.scoreOne > app.scoreTwo) {
                    $('.container').html('<h1>Player 1 Won!</h1>');
                //else if scoreTwo is greater than scoreOne player 2 wins
                } else if(app.scoreTwo > app.scoreOne) {
                    $('.container').html('<h1>Player 2 Won!</h1>');
                //else if neither happens they have tied and need to play again!
                } else {
                    $('.container').html(`<h1>You've tied!<br>Please Play Again!</h1>`);
                }
                 
            }
        }
    };
    //fucntion init called
    app.init();
});