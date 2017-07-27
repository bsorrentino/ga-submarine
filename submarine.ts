
const SZ = 8;

let g = new ga( 80*SZ, 60*SZ, setup);

g.start();


var cruise:GA.Rectangle,
    velocity = 2,
    bombs:Array<GA.Circle>,
    sea:GA.Group,
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

  let deep = g.rectangle( g.canvas.width,  g.canvas.height - deepY, "cyan" );
  deep.setPosition( 0, deepY );

  let horizon = g.line( "blue", 1, 0, deep.y+1, deep.width, deep.y+1);

  sea = g.group( deep, horizon );
  sea.interactive = false;

  cruise = g.rectangle(11*SZ, 3*SZ, "black" );
  
  g.stage.putCenter( cruise ); cruise.y = 6*SZ;

  let scene = g.group();

  g.key.leftArrow.press = () => {
      cruise.vx = -velocity ;
  }
  g.key.leftArrow.release = () => {
    cruise.vx = 0 ;
  }
  g.key.rightArrow.press = () => {
      cruise.vx = velocity ;
  }
  g.key.rightArrow.release = () => {
    cruise.vx = 0 ;    
  }
  g.key.upArrow.press = () => {
       bombs.filter( (b) => b.isRight ).forEach(b => {
         b.fire();
       });
  }
  g.key.downArrow.press = () => {
       bombs.filter( (b) => b.isLeft ).forEach(b => {
         b.fire();
       });
  }

  let b1 = g.circle( 10, "red"); b1.isLeft = true;
  let b2 = g.circle( 10, "black"); b2.isRight = true;

  bombs = new Array<GA.Circle>(  b1, b2 );

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

    bomb.play = () => {
      let pos =  (bomb.isLeft) ? "left" : "right";
      let wasInTheSea = bomb.isInTheSea;
      bomb.isInTheSea = g.hitTestCircleRectangle( bomb, sea.children[0] );

      
      if( bomb.isInTheSea ) {
        console.log( "bomb ", pos ," in the sea", bomb.isInTheSea );
        bomb.vy = 1
        g.move(bomb);
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

//The `play` function will run in a loop
function play() {

    let mvBounds = g.stage.localBounds;

    bombs.forEach( (b) => b.play() );
   
    let collision = g.contain(cruise, mvBounds);
    
    if( !collision )
        g.move( cruise );
    else
      console.log( "collision", collision );

}

