
type Coordinate = { x:number, y:number };

type Bounds = { x:number, y:number, width:number, heignt:number };

declare interface KeyHandler {

    readonly code:number;
    readonly isDown:boolean;
    readonly isUp:boolean;
    press:() => void;
    release:() => void;
}

declare interface DisplayableObject {
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

    addChild(sprite:DisplayableObject):void;
    removeChild(sprite:DisplayableObject):void;

    add(...sprites: DisplayableObject[]):void;
    remove(...sprites: DisplayableObject[]):void;

    // Allow extension
    [key: string]: any

}

declare interface Group extends DisplayableObject {

}

declare interface Sprite extends DisplayableObject {
    loop:boolean;

    play():void;
    stop():void;
}

declare interface Line extends DisplayableObject {
}

declare interface Text extends DisplayableObject {
    content:string;
}

declare interface Rectangle extends DisplayableObject {
  
    /**
     * sprite to set the point around which the sprite should rotate.
     * 0.5 is the default center point. Assign any percentage between
     * 0.01 and 0.99 to shift the center of rotation.
     * 
     */
    rotate:number;
}

declare interface Circle extends DisplayableObject {

}

declare interface Stage extends DisplayableObject {

}

declare interface ga {

    /**
     * 
     */
    new( heightPx:number, widthPx:number, initialState:Function, assets?:Array<string> ):ga;

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


declare var ga:ga;