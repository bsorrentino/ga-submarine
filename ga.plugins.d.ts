/// <reference path="ga.d.ts" />


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
}