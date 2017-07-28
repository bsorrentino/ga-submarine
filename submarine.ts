
const SZ = 8;

let g = new ga( 80*SZ, 60*SZ, setup);

g.start();

const CRUISE_VELOCITY = 2;

var cruise:GA.Rectangle,
    submarines:Array<GA.DisplayableObject>,
    bombs:Array<GA.DisplayableObject>,
    sea:GA.DisplayableObject,
    end
;

/** 
    `setup` function that will run only once.
    Use it for initialization tasks
*/
function setup() {
  console.log( "setup", "canvas.w", g.canvas.width, "canvas.h", g.canvas.height);

  g.backgroundColor = "white";  
  g.canvas.style.border = "1px black dashed";

  let deepY = 9*SZ;

  let sea = g.rectangle( g.canvas.width,  g.canvas.height - deepY, "cyan" );
  sea.setPosition( 0, deepY );
  sea.interactive = false;

  let horizon = g.line( "blue", 1, 0, sea.y+1, sea.width, sea.y+1);

  //let scene = g.group();

  g.key.leftArrow.press = () => {
      cruise.vx = -CRUISE_VELOCITY ;
  }
  g.key.leftArrow.release = () => {
    cruise.vx = 0 ;
  }
  g.key.rightArrow.press = () => {
      cruise.vx = CRUISE_VELOCITY ;
  }
  g.key.rightArrow.release = () => {
    cruise.vx = 0 ;    
  }
  g.key.upArrow.press = () => {
       let b = bombs.filter( (b) => b.isRight && !b.visible )[0];
       if( b ) b.fire();
  }
  g.key.downArrow.press = () => {
       let b = bombs.filter( (b) => b.isLeft && !b.visible )[0];
       if( b ) b.fire();
  }

  ///
  /// CRUISE
  /// 
  cruise = g.rectangle(11*SZ, 3*SZ, "black" );
  
  g.stage.putCenter( cruise ); cruise.y = 6*SZ;

  cruise.play = (cycle:number) => {
    let collision = g.contain(cruise, g.stage.localBounds);
    
    if( !collision ) g.move( cruise );

  }

  //
  // SUBMARINES
  // 

  const SUB_NUMBER = 2;

  submarines = new Array<GA.DisplayableObject>( SUB_NUMBER );
  for( var ii = 0; ii < SUB_NUMBER ; ++ii ) {

    let sub = g.rectangle(11*SZ, 3*SZ, "black" );
    sub.vx = 1;
    sub.visible = true;
    g.stage.putLeft(sub);
    sub.y = g.randomInt( sea.y, sea.height + sea.y);

    sub.play = ( cycle:number ) => {

      if( cycle%3===0 ) g.move(sub);
    }
    sub.strike = () => {

      sub.visible = false;
      sub.y = g.randomInt( sea.y, sea.height + sea.y);
    }

    submarines.push(  sub  );
  }


  //
  // BOMBS
  // 

  //let b1 = g.circle( 10, "red"); b1.isLeft = true;
  //let b2 = g.circle( 10, "black"); b2.isRight = true;
  let b1 = g.rectangle( 10, 10,  "red"); b1.isLeft = true;
  let b2 = g.circle( 10,  "red"); b2.isLeft = true;
  let b3 = g.rectangle( 10, 10, "black"); b3.isRight = true;
  let b4 = g.circle( 10, "black"); b4.isRight = true;

  bombs = new Array<GA.DisplayableObject>(  b1, b2, b3, b4 );

  bombs.forEach( (bomb) => {
    bomb.visible = false;

    bomb.fire = () => {
      if( bomb.visible ) return;

      bomb.visible = true;

      var points:[[number]];

      if( bomb.isLeft ) {
        cruise.putLeft(bomb);   
        let x = bomb.x, y = bomb.y;
        points =
          [
            [x,y],
            [x - 5.22*10, y - 7.22*10],
            [x - 7.87*10, y - 3.54*10],
            [x - 8.00*10, y + cruise.height]
          ];       
      }
      else {
        cruise.putRight(bomb);
        let x = bomb.x, y = bomb.y;
        points = 
            [
              [x, y],
              [x + 5.22*10, y - 7.22*10],
              [x + 7.87*10, y - 3.54*10],
              [x + 8.00*10, y + cruise.height]
            ];    
          
      }
      let path = g.walkCurve(
          bomb, //The sprite
          //An array of Bezier curve points that 
          //you want to connect in sequence
          [ points ],
          100,                   //Total duration, in frames
          "smoothstep",          //Easing type
          false,                  //Should the path loop?
          false,                  //Should the path yoyo?
          1000                   //Delay in milliseconds between segments
        );

    }

    bomb.play = (cycle:number) => {

      let pos =  (bomb.isLeft) ? "left" : "right";
      let wasInTheSea = bomb.isInTheSea;
      bomb.isInTheSea = g.hitTestRectangle( bomb, sea );
      if( bomb.isInTheSea ) {
        //console.log( "bomb ", pos ," in the sea", bomb.isInTheSea );
        bomb.vy = 1
        g.move(bomb);

        submarines
          .filter( (sub) => sub.visible )
          .forEach( (sub) => {
            if( g.hitTestRectangle(bomb,sub) ) {
              sub.strike();
              bomb.visible = false;
            }
            
          });

      }
      else if( wasInTheSea ) {
        console.log( "bomb ", pos ," out of sea", bomb.isInTheSea );
        bomb.visible = false;

      }
      
    }
  });
  
    //Change the state to `play`
  g.state = play;
  
  
}

let cycle = 0;
//The `play` function will run in a loop
function play() {

    ++cycle;

    bombs.forEach( (b) => b.play(cycle) );
   
    submarines.forEach( (s) => s.play(cycle) );

    cruise.play( cycle );


}

