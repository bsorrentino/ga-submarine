"use strict";
var SZ = 8;
var g = new ga(80 * SZ, 60 * SZ, setup);
g.start();
var cruise;
/**
    `setup` function that will run only once.
    Use it for initialization tasks
*/
function setup() {
    console.log("setup", "canvas.w", g.canvas.width, "canvas.h", g.canvas.height);
    g.backgroundColor = "white";
    g.canvas.style.border = "1px black dashed";
    var deepY = 9 * SZ;
    var deep = g.rectangle(g.canvas.width, g.canvas.height - deepY, "cyan");
    deep.setPosition(0, deepY);
    var horizon = g.line("blue", 1, 0, deep.y + 1, deep.width, deep.y + 1);
    var sea = g.group(deep, horizon);
    sea.interactive = false;
    cruise = g.rectangle(11 * SZ, 3 * SZ, "black");
    g.stage.putCenter(cruise);
    cruise.y = 6 * SZ;
    var scene = g.group();
    g.key.leftArrow.press = function () {
        cruise.vx = -1;
    };
    g.key.leftArrow.release = function () {
        cruise.vx = 0;
    };
    g.key.rightArrow.press = function () {
        cruise.vx = 1;
    };
    g.key.rightArrow.release = function () {
        cruise.vx = 0;
    };
    //Change the state to `play`
    g.state = play;
}
//The `play` function will run in a loop
function play() {
    g.move(cruise);
}
