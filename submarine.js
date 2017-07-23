"use strict";
var SZ = 8;
var g = new ga(80 * SZ, 60 * SZ, setup);
g.start();
var cruise, velocity = 2, right_bomb, left_bomb, end;
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
        cruise.vx = -velocity;
    };
    g.key.leftArrow.release = function () {
        cruise.vx = 0;
    };
    g.key.rightArrow.press = function () {
        cruise.vx = velocity;
    };
    g.key.rightArrow.release = function () {
        cruise.vx = 0;
    };
    g.key.upArrow.press = function () {
        left_bomb.fire();
    };
    g.key.downArrow.press = function () {
        right_bomb.fire();
    };
    left_bomb = g.circle(10, "red");
    left_bomb.fire = function () {
        cruise.putLeft(left_bomb);
        var x = left_bomb.x, y = left_bomb.y;
        var path_left_bomb = g.walkCurve(left_bomb, [
            [
                [x, y],
                [x - 5.22 * 10, y - 7.22 * 10],
                [x - 7.87 * 10, y - 3.54 * 10],
                [x - 8.00 * 10, y + cruise.height]
            ]
        ], 100, //Total duration, in frames
        "smoothstep", //Easing type
        false, //Should the path loop?
        false, //Should the path yoyo?
        1000 //Delay in milliseconds between segments
        );
    };
    right_bomb = g.circle(10, "red");
    right_bomb.fire = function () {
        cruise.putRight(right_bomb);
        var path_right_bomb = g.walkCurve(right_bomb, //The sprite
        //An array of Bezier curve points that 
        //you want to connect in sequence
        [
            [
                [right_bomb.x, right_bomb.y],
                [right_bomb.x + 5.22 * 10, right_bomb.y - 7.22 * 10],
                [right_bomb.x + 7.87 * 10, right_bomb.y - 3.54 * 10],
                [right_bomb.x + 8.00 * 10, right_bomb.y + cruise.height]
            ]
        ], 100, //Total duration, in frames
        "smoothstep", //Easing type
        false, //Should the path loop?
        false, //Should the path yoyo?
        1000 //Delay in milliseconds between segments
        );
    };
    //Change the state to `play`
    g.state = play;
}
//The `play` function will run in a loop
function play() {
    var mvBounds = g.stage.localBounds;
    var collision = g.contain(cruise, mvBounds);
    if (!collision)
        g.move(cruise);
    else
        console.log("collision", collision);
}
