
declare interface ga {

    new( height:number, width:number, setup:Function):ga;

    state:Function;

    start():void;
}


declare var ga:ga;