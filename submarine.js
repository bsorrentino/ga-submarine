"use strict";
var SZ = 8;
var g = new ga(80 * SZ, 60 * SZ, setup);
g.start();
var CRUISE_VELOCITY = 2;
var cruise, submarines, bombs, sea, end;
/**
    `setup` function that will run only once.
    Use it for initialization tasks
*/
function setup() {
    console.log("setup", "canvas.w", g.canvas.width, "canvas.h", g.canvas.height);
    g.backgroundColor = "white";
    g.canvas.style.border = "1px black dashed";
    var deepY = 9 * SZ;
    var sea = g.rectangle(g.canvas.width, g.canvas.height - deepY, "cyan");
    sea.setPosition(0, deepY);
    sea.interactive = false;
    var horizon = g.line("blue", 1, 0, sea.y + 1, sea.width, sea.y + 1);
    //let scene = g.group();
    g.key.leftArrow.press = function () {
        cruise.vx = -CRUISE_VELOCITY;
    };
    g.key.leftArrow.release = function () {
        cruise.vx = 0;
    };
    g.key.rightArrow.press = function () {
        cruise.vx = CRUISE_VELOCITY;
    };
    g.key.rightArrow.release = function () {
        cruise.vx = 0;
    };
    g.key.upArrow.press = function () {
        var b = bombs.filter(function (b) { return b.isRight && !b.visible; })[0];
        if (b)
            b.fire();
    };
    g.key.downArrow.press = function () {
        var b = bombs.filter(function (b) { return b.isLeft && !b.visible; })[0];
        if (b)
            b.fire();
    };
    ///
    /// CRUISE
    /// 
    cruise = g.rectangle(11 * SZ, 3 * SZ, "black");
    g.stage.putCenter(cruise);
    cruise.y = 6 * SZ;
    cruise.play = function (cycle) {
        var collision = g.contain(cruise, g.stage.localBounds);
        if (!collision)
            g.move(cruise);
    };
    //
    // SUBMARINES
    // 
    var SUB_NUMBER = 2;
    submarines = new Array(SUB_NUMBER);
    var _loop_1 = function () {
        var sub = g.rectangle(11 * SZ, 3 * SZ, "black");
        sub.vx = 1;
        sub.visible = true;
        g.stage.putLeft(sub);
        sub.y = g.randomInt(sea.y, sea.height + sea.y);
        sub.play = function (cycle) {
            if (cycle % 3 === 0)
                g.move(sub);
        };
        sub.strike = function () {
            sub.visible = false;
            sub.y = g.randomInt(sea.y, sea.height + sea.y);
        };
        submarines.push(sub);
    };
    for (var ii = 0; ii < SUB_NUMBER; ++ii) {
        _loop_1();
    }
    //
    // BOMBS
    // 
    //let b1 = g.circle( 10, "red"); b1.isLeft = true;
    //let b2 = g.circle( 10, "black"); b2.isRight = true;
    var b1 = g.rectangle(10, 10, "red");
    b1.isLeft = true;
    var b2 = g.circle(10, "red");
    b2.isLeft = true;
    var b3 = g.rectangle(10, 10, "black");
    b3.isRight = true;
    var b4 = g.circle(10, "black");
    b4.isRight = true;
    bombs = new Array(b1, b2, b3, b4);
    bombs.forEach(function (bomb) {
        bomb.visible = false;
        bomb.fire = function () {
            if (bomb.visible)
                return;
            bomb.visible = true;
            var points;
            if (bomb.isLeft) {
                cruise.putLeft(bomb);
                var x = bomb.x, y = bomb.y;
                points =
                    [
                        [x, y],
                        [x - 5.22 * 10, y - 7.22 * 10],
                        [x - 7.87 * 10, y - 3.54 * 10],
                        [x - 8.00 * 10, y + cruise.height]
                    ];
            }
            else {
                cruise.putRight(bomb);
                var x = bomb.x, y = bomb.y;
                points =
                    [
                        [x, y],
                        [x + 5.22 * 10, y - 7.22 * 10],
                        [x + 7.87 * 10, y - 3.54 * 10],
                        [x + 8.00 * 10, y + cruise.height]
                    ];
            }
            var path = g.walkCurve(bomb, //The sprite
            //An array of Bezier curve points that 
            //you want to connect in sequence
            [points], 100, //Total duration, in frames
            "smoothstep", //Easing type
            false, //Should the path loop?
            false, //Should the path yoyo?
            1000 //Delay in milliseconds between segments
            );
        };
        bomb.play = function (cycle) {
            var pos = (bomb.isLeft) ? "left" : "right";
            var wasInTheSea = bomb.isInTheSea;
            bomb.isInTheSea = g.hitTestRectangle(bomb, sea);
            if (bomb.isInTheSea) {
                //console.log( "bomb ", pos ," in the sea", bomb.isInTheSea );
                bomb.vy = 1;
                g.move(bomb);
                submarines
                    .filter(function (sub) { return sub.visible; })
                    .forEach(function (sub) {
                    if (g.hitTestRectangle(bomb, sub)) {
                        sub.strike();
                        bomb.visible = false;
                    }
                });
            }
            else if (wasInTheSea) {
                console.log("bomb ", pos, " out of sea", bomb.isInTheSea);
                bomb.visible = false;
            }
        };
    });
    //Change the state to `play`
    g.state = play;
}
var cycle = 0;
//The `play` function will run in a loop
function play() {
    ++cycle;
    bombs.forEach(function (b) { return b.play(cycle); });
    submarines.forEach(function (s) { return s.play(cycle); });
    cruise.play(cycle);
}
