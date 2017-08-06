/// <reference path="ga.d.ts" />

declare namespace GA { 

export type Collision = undefined | 
                        "left" | 
                        "top" | 
                        "right" | 
                        "left";
export type Hitting = undefined | 
                      "topLeft" | 
                      "topRight" | 
                      "bottomLeft" | 
                      "bottomRight" | 
                      "topMiddle" | 
                      "bottomMiddle" | 
                      "leftMiddle" | 
                      "rightMiddle";
                      
export type EasingType = "smoothstep" ;

export interface Path {

}

export interface Camera {

    x:number;
    y:number;
    centerX:number;
    centerY:number;
    readonly rightInnerBoundary:number;
    readonly leftInnerBoundary:number;
    readonly topInnerBoundary:number;
    readonly bottomInnerBoundary:number;

    /**
     * Make it follow a sprite
     */
    follow(sprite:DisplayableObject):void;
    /**
     * center the camera over a sprite
     */
    centerOver(sprite:DisplayableObject):void;
}

export interface Sound  {

    /**
     * 
     */
    volume:number;

    /**
     * 
     */
    loop:boolean;

    /**
     * You can set the sound object's pan by assigning a value between -1 (left speaker) to 1 (right speaker). 
     * A pan value of 0 makes the sound equal volume in both speakers.
     */
    pan:number;

    /**
     * 
     */
    play():void;

}


export interface Engine {


/**
 * Center and scale the game engine inside the HTML page 
 */
scaleToWindow(backgroundColor?:string):void;

/*
### random

Returns a random integer between a minimum and maximum value
Parameters:
a. An integer.
b. An integer.
Here's how you can use it to get a random number between, 1 and 10:

    randomInt(1, 10);

*/
randomInt(min:number, max:number):number;

/**
 * Returns a random floating point number between a minimum and maximum value
 * 
 */
randomFloat(min:number, max:number):number;


/**
 * Move a sprite or an array of sprites by adding its
 * velocity to its position
 */
move( sprites:DisplayableObject|Array<DisplayableObject> ):void;

/**
 * Wait for a certain number of milliseconds and then execute a callback function.
 * 
 * @duration millseconds
 * @callback
 * @return handle (@see: clearTimeout)
 */
wait(duration:number, callBack:(()=>void)):number;

/**
 * 
 */
contain(s:DisplayableObject, bounds:Bounds, bounce?:boolean, extra?:(collision:Collision)=> void ):Collision;

/*

Use it to find out if two rectangular sprites are touching.
Parameters:
a. A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
b. A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.

*/
hitTestRectangle(r1:DisplayableObject, r2:DisplayableObject, global?:boolean ):boolean;
/*

Use it to find out if a point is touching a circular or rectangular sprite.
Parameters:
a. An object with `x` and `y` properties.
b. A sprite object with `x`, `y`, `centerX` and `centerY` properties.
If the sprite has a `radius` property, the function will interpret
the shape as a circle.
*/
hitTestPoint(point:Coordinate, sprite:DisplayableObject):boolean;
/*

Use it to find out if two circular sprites are touching.
Parameters:
a. A sprite object with `centerX`, `centerY` and `radius` properties.
b. A sprite object with `centerX`, `centerY` and `radius`.
*/

hitTestCircle(c1:Circle, c2:Circle, global?:boolean):boolean;
/*

Use it to find out if a circular shape is touching a rectangular shape
Parameters: 
a. A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
b. A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.

*/
hitTestCircleRectangle(c1:Circle, r1:Rectangle, global?:boolean):Hitting|boolean;
/*

Use it to find out if a circular shape is touching a point
Parameters: 
a. A sprite object with `centerX`, `centerY`, and `radius` properties.
b. A point object with `x` and `y` properties.

*/
hitTestCirclePoint(c1:Circle, point:Coordinate,  global?:boolean):boolean;

/*
Use it to find out if two rectangular sprites are touching.
Parameters:
a. A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
b. A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
*/
hitTestRectangle(r1:Rectangle, r2:Rectangle, global?:boolean):boolean;

/**
 * 
 */
sound(asset:string):Sound;

/**
 * 
 */
walkCurve(
  sprite:DisplayableObject,           //The sprite
  pathArray:Array<[[number]]>,        //2D array of Bezier curves
  totalFrames:number,                //The duration, in frames
  type:EasingType,                       //The easing type
  loop:boolean,                               //Should the animation loop?
  yoyo:boolean,                       //Should the direction reverse?
  delayBeforeContinue:number         //Delay, in milliseconds, between sections
):Path;

/**
 * 
 */
walkPath(
  sprite:DisplayableObject,                   //The sprite
  originalPathArray:Array<[number]>,        //A 2D array of waypoints
  totalFrames:number,              //The duration, in frames
  type:EasingType,                       //The easing type
  loop:boolean,                               //Should the animation loop?
  yoyo:boolean,                       //Should the direction reverse?
  delayBeforeContinue:number         //Delay, in milliseconds, between sections
):Path;

/**
 * A function for making sprites shoot bullets.
 */
shoot(
    shooter:DisplayableObject, 
    angle:number, 
    offsetFromCenter:number,
    bulletSpeed:number, 
    bulletArray:DisplayableObject[], 
    bulletSprite:()=>DisplayableObject):void;
  
/**
 * method that creates and returns a camera for a scrolling game world.   
 *    
 * @world   worldObject
 * @canvas  theCanvas
 * @return  Camera
 */
worldCamera(world:DisplayableObject|Bounds, canvas:HTMLCanvasElement):Camera;

}

} // end namespace GA