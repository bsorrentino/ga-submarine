"use strict";
var SZ = 8;
var g = new ga(80 * SZ, 60 * SZ, setup);
g.start();
var CRUISE_VELOCITY = 2;
var cruise, submarines, bombs, sea, scoreDisplay, end;
function setup() {
    console.log("setup", "canvas.w", g.canvas.width, "canvas.h", g.canvas.height);
    g.backgroundColor = "white";
    g.canvas.style.border = "1px black dashed";
    var deepY = 9 * SZ;
    var sea = g.rectangle(g.canvas.width, g.canvas.height - deepY, "cyan");
    sea.setPosition(0, deepY);
    sea.interactive = false;
    var horizon = g.line("blue", 1, 0, sea.y + 1, sea.width, sea.y + 1);
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
        var b = bombs.filter(function (b) { return b.isRight; }).filter(function (b) { return !b.visible; });
        if (b[0])
            b[0].fire();
    };
    g.key.downArrow.press = function () {
        var b = bombs.filter(function (b) { return b.isLeft; }).filter(function (b) { return !b.visible; });
        if (b[0])
            b[0].fire();
    };
    scoreDisplay = g.text("0", "20px emulogic", "black");
    {
        g.stage.putRight(scoreDisplay);
        var x = scoreDisplay.x - scoreDisplay.width * 6;
        g.stage.putTop(scoreDisplay);
        scoreDisplay.x = x;
        scoreDisplay.y += scoreDisplay.height + 5;
        var label = g.text("SCORE: ", "20px emulogic", "pink");
        scoreDisplay.putLeft(label);
        label.x -= label.width;
        scoreDisplay.currentScore = 0;
        scoreDisplay.increment = function (score) {
            scoreDisplay.currentScore += score || 1;
            scoreDisplay.content = String(scoreDisplay.currentScore);
        };
        scoreDisplay.decrement = function (score) {
            scoreDisplay.currentScore -= score || 1;
            scoreDisplay.content = String(scoreDisplay.currentScore);
        };
    }
    cruise = g.rectangle(11 * SZ, 3 * SZ, "black");
    g.stage.putCenter(cruise);
    cruise.y = 6 * SZ;
    cruise.play = function (cycle) {
        var collision = g.contain(cruise, g.stage.localBounds);
        if (!collision)
            g.move(cruise);
    };
    var SUB_NUMBER = 4;
    submarines = new Array(SUB_NUMBER);
    var _loop_1 = function () {
        var sub = g.rectangle(11 * SZ, 3 * SZ, "black");
        sub.visible = false;
        sub.start = function () {
            var rnd = g.randomInt(0, 100);
            if (rnd % 2 === 0) {
                sub.vx = -1;
                g.stage.putRight(sub);
            }
            else {
                sub.vx = 1;
                g.stage.putLeft(sub);
            }
            sub.y = g.randomInt(sea.y, sea.height + sea.y) + sub.height;
            g.wait(g.randomInt(750, 1500), function () { return sub.visible = true; });
        };
        sub.play = function (cycle) {
            if (cycle % 3 === 0)
                g.move(sub);
        };
        sub.strike = function () {
            sub.visible = false;
            scoreDisplay.increment();
        };
        submarines.push(sub);
    };
    for (var ii = 0; ii < SUB_NUMBER; ++ii) {
        _loop_1();
    }
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
            var path = g.walkCurve(bomb, [points], 100, "smoothstep", false, false, 1000);
        };
        bomb.boom = function () {
            bomb.visible = false;
            bomb.isInTheSea = false;
        };
        bomb.play = function (cycle) {
            if (cycle % 2 !== 0)
                return;
            var pos = (bomb.isLeft) ? "left" : "right";
            var wasInTheSea = bomb.isInTheSea;
            bomb.isInTheSea = g.hitTestRectangle(bomb, sea);
            if (bomb.isInTheSea) {
                bomb.vy = 1;
                g.move(bomb);
                submarines
                    .filter(function (sub) { return sub.visible; })
                    .forEach(function (sub) {
                    if (g.hitTestRectangle(bomb, sub)) {
                        bomb.boom();
                        sub.strike();
                    }
                });
            }
            else if (wasInTheSea) {
                console.log("bomb ", pos, " out of sea", bomb.isInTheSea);
                bomb.visible = false;
            }
        };
    });
    g.state = play;
}
var cycle = 0;
function play() {
    ++cycle;
    if (cycle % 20 === 0)
        submarines.filter(function (s) { return !s.visible; }).forEach(function (s) { return s.start(); });
    bombs.filter(function (b) { return b.visible; }).forEach(function (b) { return b.play(cycle); });
    submarines.filter(function (s) { return s.visible; }).forEach(function (s) { return s.play(cycle); });
    cruise.play(cycle);
}
