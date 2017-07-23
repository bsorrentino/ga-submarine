/// <reference path="ga.d.ts" />

type Collision = "left" | "top" | "right" | "left";

type EasingType = "smoothstep" ;

declare interface Path {

}

declare interface Sound  {

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


declare interface ga {


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
   * 
   */
  contain(s:DisplayableObject, bounds:Bounds, bounce?:boolean, extra?:(collision:Collision)=> void ):Collision|undefined;

  /*
  Use it to find out if two rectangular sprites are touching.
  Parameters:
  a. A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
  b. A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.

  */
  hitTestRectangle(r1:DisplayableObject, r2:DisplayableObject, global?:boolean ):boolean;
 
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
    
}