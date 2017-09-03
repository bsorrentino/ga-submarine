
declare namespace GA {

export type Coordinate = { x:number, y:number };

export type Bounds = { x:number, y:number, width:number, heignt:number };

/**
 * 
 */
export interface KeyHandler {

    readonly code:number;
    readonly isDown:boolean;
    readonly isUp:boolean;
    press:() => void;
    release:() => void;
}

/**
 * 
 */
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
    parent:DisplayableObject;
    
    layer:number;

    readonly gx:number;
    readonly gY:number;
    readonly halfWidth:number;
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

    // Sahdow
    shadow:boolean;
    shadowColor:string; // = "rgba(100, 100, 100, 0.5)";
    shadowOffsetX:number;
    shadowOffsetY:number;
    shadowBlur:number;

    // Collison Area
    collisionArea?:Bounds
    
    // Allow extension
    //[key: string]: any

}

/**
 * 
 */
export interface Group extends DisplayableObject {

}

/**
 * 
 */
export interface Sprite extends DisplayableObject {
    loop:boolean;
    playing:boolean;

    show(frameNumber:number):void;
    playSequence(sequenceArray:Array<number>):void;
    play():void;
    stop():void;

    
}

export interface Line extends DisplayableObject {
    ax:number;
    ay:number;
    bx:number;
    by:number;
    lineWidth:number;

    strokeStyle:string;

    /**
     * The `lineJoin` style.
     * Options are "round", "mitre" and "bevel".
     */
    lineJoin:"round" | "mitre" | "bevel";

}

export interface Text extends DisplayableObject {
    content:string;
}

export interface Rectangle extends DisplayableObject {
    fillStyle:string;
    strokeStyle:string;
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

/**
 * 
 */
interface Assets {
    whenLoaded:()=>void;
    loadHandler:()=>void;

    load(sources:Array<string>):void;
}

/**
 * 
 */
export interface Engine {

    /**
     * 
     */
    new( heightPx:number, widthPx:number, initialState:Function, assets?:Array<string>, load?:Function ):Engine;

    /**
     * 
     */
    assets:Assets;

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
     * An array that stores functions which should be run inside Ga's core `update` game loop. 
     * Just push any function you write into this array, and ga will run it in a continuous loop.
     */
    updateFunctions:[ ()=> void ];
  
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
     * remove any sprite, or an argument list of sprites, from its parent.
     * 
     */
    remove(spritesToRemove:DisplayableObject):void;

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

    /**
     * 
     * creates and returns a sprite using:
     *  a JavaScript Image object, 
     *  a tileset `frame`, 
     *  a `filmstrip`, 
     *  or a frame from a texture atlas (in standard Texture Packer format).
     * 
     * @param source.
     */
    sprite(source:Array<string>|string):Sprite ;
  
}

} // end namespace GA

declare var ga:GA.Engine;