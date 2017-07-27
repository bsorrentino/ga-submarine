
declare namespace GA {

export type Coordinate = { x:number, y:number };

export type Bounds = { x:number, y:number, width:number, heignt:number };

export interface KeyHandler {

    readonly code:number;
    readonly isDown:boolean;
    readonly isUp:boolean;
    press:() => void;
    release:() => void;
}

export interface DisplayableObject {
    x:number;
    y:number;
     
    //Velocity.
    vx:number;
    vy:number;
    
    pivotX:number;
    pivotY:number;
    
    width:number;
    height:number;
    
    visible:boolean;
    interactive:boolean;
    rotation:number;
    alpha:number;

    readonly gx:number;
    readonly gY:number;
    readonly halfWdth:number;
    readonly halfHeight:number;
    readonly position:Coordinate;
    readonly centerX:number;
    readonly centerY:number;
    readonly localBounds:Bounds;
    readonly globalBounds:Bounds;

    setPosition( x:number, y:number):void;

    putCenter(o:DisplayableObject, xOffset?:number, yOffset?:number):void;

    putTop(o:DisplayableObject, xOffset?:number, yOffset?:number):void;

    putRight(o:DisplayableObject, xOffset?:number, yOffset?:number):void;

    putBottom(o:DisplayableObject, xOffset?:number, yOffset?:number):void;

    putLeft(o:DisplayableObject, xOffset?:number, yOffset?:number):void;

    /**
     * figures out if the pointer is touching a sprite.
     */
    hitTestSprite(sprite:DisplayableObject):boolean;

    // Children

    children:DisplayableObject[];
    
    addChild(sprite:DisplayableObject):void;
    removeChild(sprite:DisplayableObject):void;

    add(...sprites: DisplayableObject[]):void;
    remove(...sprites: DisplayableObject[]):void;

    // Allow extension
    [key: string]: any

}

export interface Group extends DisplayableObject {

}

export interface Sprite extends DisplayableObject {
    loop:boolean;

    play():void;
    stop():void;
}

export interface Line extends DisplayableObject {
}

export interface Text extends DisplayableObject {
    content:string;
}

export interface Rectangle extends DisplayableObject {
  
    /**
     * sprite to set the point around which the sprite should rotate.
     * 0.5 is the default center point. Assign any percentage between
     * 0.01 and 0.99 to shift the center of rotation.
     * 
     */
    //rotate:number;
}

export interface Circle extends DisplayableObject {
    diameter:number;
    radius:number;
}

export interface Stage extends DisplayableObject {

}

export interface Engine {

    /**
     * 
     */
    new( heightPx:number, widthPx:number, initialState:Function, assets?:Array<string> ):Engine;

    /**
     * 
     */
    canvas:HTMLCanvasElement;

    /**
     *  Custom key handler
     */
    keyboard( keyCode:number):KeyHandler;

    /**
     *  Default key handlers
     */
    key: {
        leftArrow:KeyHandler;
        upArrow:KeyHandler;
        rightArrow:KeyHandler;
        downArrow :KeyHandler;
        space:KeyHandler;
    };
    
    scale:number;
    /**
     * 
     */
    stage:Stage;

    /**
     * The frame rate will default to 60 fps is you don't set it
     */
    fps:number;
  
    /**
     * Optionally change the background color
     */
    backgroundColor:string;

    /**
     * Optionally hide the mouse pointer
     */
    hidePointer():void;

    /**
     * 
     */
    showPointer():void;

    /**
     * set the game state
     */
    state:Function;

    /**
     * 
     */
    start():void;

    /**
     * 
     */
    pause():void;

    /**
     * 
     */
    resume():void;


    /**
     * 
     */
    rectangle( widthPx:number, heightPx:number, fillColor:string, strokeColor?:string, lineWidth?:number, x?:number, y?:number ):Rectangle;
    
    /**
     * 
     */
    circle( diameter:number, fillstyle:string, stroketyle?:string, lineWidth?:number, x?:number, y?:number ):Circle;

    /**
     * `line` creates and returns a line with a start and end points.
     * arguments: lineColor, lineWidth, startX, startY, endX, endY.
     * 
     */
    line(strokeStyle?:string, lineWidth?:number, x?:number, y?:number, endX?:number, endY?:number):Line;

    /**
     * 
     * The font family name will be the same as the font's file name
     */
    text(content:string, font:string, fillstype:string, x?:number, y?:number):Text;

    /**
     * 
     */
    group(...sprites: DisplayableObject[]):Group;
}

} // end namespace GA

declare var ga:GA.Engine;