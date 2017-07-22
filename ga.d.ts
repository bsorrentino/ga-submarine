

declare interface Text {
    x:number;
    y:number;
}

declare interface Rectangle {
  
    /**
     * sprite to set the point around which the sprite should rotate.
     * 0.5 is the default center point. Assign any percentage between
     * 0.01 and 0.99 to shift the center of rotation.
     * 
     */
    rotate:number;
  
    pivotX:number;
    pivotY:number;
}

declare interface Circle {

}

declare interface ga {

    new( height:number, width:number, state:Function, assets?:Array<string> ):ga;

    canvas:HTMLCanvasElement;

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
    rectangle( width:number, height:number, fillColor:string, strokeColor:string, lineWidth:number, x:number, y:number ):Rectangle;
    
    /**
     * 
     */
    circle( diameter:number, fillstyle:string, stroketyle:string, lineWidth:number, x:number, y:number ):Circle;


    /**
     * 
     * The font family name will be the same as the font's file name
     */
    text(content:string, font:string, fillstype:string, x?:number, y?:number):Text;

}


declare var ga:ga;