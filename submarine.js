"use strict";
var g = new ga(500, 500, setup);
g.start();
/**
    `setup` function that will run only once.
    Use it for initialization tasks
*/
function setup() {
    console.log("setup");
    g.backgroundColor = "cyan";
    //Change the state to `play`
    g.state = play;
}
//The `play` function will run in a loop
function play() {
    console.log("play");
}
