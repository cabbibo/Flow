
var mouse = {};
var INTERSECTED;
var SELECTED;

var SELECTED_BALL;
var SELECTED_SONG;

var offset = new THREE.Vector3();

var mouseVec = new THREE.Vector3();
var raycaster = new THREE.Raycaster();

function initRaycaster(){


  renderer.domElement.addEventListener( 'mousemove', onMouseMove, false );
  renderer.domElement.addEventListener( 'mousedown', onMouseDown, false );
  renderer.domElement.addEventListener( 'mouseup', onMouseUp, false );
  //renderer.domElement.addEventListener( 'click', onClick, false );
  projector = new THREE.Projector();

}

function onMouseMove( event ) {

 // event.preventDefault();


  var pos = [
    event.clientX,
    event.clientY// - MARGIN,
  ];

  width = [
    window.innerWidth,
    window.innerHeight// - MARGIN*2
  ];

  mouse.x =   ( pos[0] / width[0] ) * 2 - 1;
  mouse.y = - ( pos[1] / width[1] ) * 2 + 1;


  //
  //
  mouseVec.set( mouse.x , mouse.y , .5 );

  //var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
  projector.unprojectVector( mouseVec, camera );

  raycaster.set( camera.position , mouseVec.sub( camera.position).normalize() );
  //var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );


  if ( SELECTED ) {

      var intersects = raycaster.intersectObject( movementPlane );

      var p = intersects[0].point;
      var s = offset;
      SELECTED.mesh.position.copy( intersects[ 0 ].point.sub( offset ) );
      //return;

  }


  var objects = [];
  for( var i = 0; i < SONGS.length; i++ ){

   // objects.push( SONGS[i].toMesh );
    objects.push( SONGS[i].fromMesh );
    objects.push( SONGS[i].titleMesh );
    objects.push( SONGS[i].titleMandala );

  }

  for( var i = 0; i < BALLS.length; i++ ){

    objects.push( BALLS[i].mesh );

  }


  var intersects = raycaster.intersectObjects( objects , true );



  if ( intersects.length > 0 ) {

    if ( INTERSECTED != intersects[ 0 ].object ) {

    
      if ( INTERSECTED ){

        var b = checkForIntersectedBall( INTERSECTED );
        var s = checkForIntersectedSong( INTERSECTED );
        
        if( s )
          s.onHoverOut();
     
        if( b )
          b.onHoverOut();
        
                //INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
        
      }

      INTERSECTED = intersects[ 0 ].object;

      var b = checkForIntersectedBall( INTERSECTED );
      var s = checkForIntersectedSong( INTERSECTED );
      if( s )
        s.onHoverOver();

      if( b){
        if( SELECTED_BALL ){

          if( SELECTED_BALL == b ){
            b.onHoverOver();
            movementPlane.position.copy( b.mesh.position );
            movementPlane.lookAt( camera.position );
          }


        }else{
          b.onHoverOver();
          movementPlane.position.copy( b.mesh.position );
          movementPlane.lookAt( camera.position );
        }
      }
	  //movementPlane.lookAt( camera.position );

    }

  } else {

    if ( INTERSECTED ) {

      //INTERSECTED.hoverOut();
 
      var s = checkForIntersectedSong( INTERSECTED );
      var b = checkForIntersectedBall( INTERSECTED );
      if( s )
        s.onHoverOut();

      if( b )
        b.onHoverOut();


    }

    INTERSECTED = null;

    //container.style.cursor = 'auto';


  }
 

}

function checkForIntersectedSong( object ){

  for( var i = 0; i < SONGS.length; i++ ){

    var s = SONGS[i];
    if( object == s.fromMesh || object == s.titleMesh ){
      return s;
    }

    for( var j = 0; j < s.titleMandalaMeshes.length; j++ ){

      if( object == s.titleMandalaMeshes[j] ){
 
        return s;

      }


    }

  }

}

function checkForIntersectedBall( object ){

  for( var i = 0; i < BALLS.length; i++ ){

    var b = BALLS[i];
    if( object == b.mesh ){
      
      return b;
    }

  }

}

function onMouseDown( event ){

  //event.preventDefault();
 
  mouseIsDown = true;

  if( INTERSECTED ){

    controls.enabled = false;
    var b = checkForIntersectedBall( INTERSECTED );
    var s = checkForIntersectedSong( INTERSECTED );
    if( b ){

      mouseVec.set( mouse.x , mouse.y , .5 );
      projector.unprojectVector( mouseVec, camera );
      raycaster.set( camera.position , mouseVec.sub( camera.position).normalize() );

      /*var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
      projector.unprojectVector( vector, camera );

      raycast.er
      var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );*/
      var intersects = raycaster.intersectObject( movementPlane );
	  offset.copy( intersects[ 0 ].point ).sub( movementPlane.position );
      SELECTED = b;
      SELECTED.activate();
    }

    SELECTED_SONG = INTERSECTED;
    
  }

}

function onMouseUp( event ){
 // event.preventDefault();
 
  mouseIsDown = false;
  if( INTERSECTED ){

	movementPlane.position.copy( INTERSECTED.position );
   
    if( SELECTED_SONG == INTERSECTED ){

      var s = checkForIntersectedSong( INTERSECTED );
      var b = checkForIntersectedBall( INTERSECTED );
      
      if( s ){
        if( s.active ){
          s.deactivate();
        }else{
          s.activate();
        }
      }


    }

  }
  controls.enabled = true;
  if( SELECTED ){
    SELECTED.deactivate();
    SELECTED = undefined;
  }


}

function onClick( event ){

  //event.preventDefault();
  
  if( INTERSECTED ){

    var s = checkForIntersectedSong( INTERSECTED );
    var b = checkForIntersectedBall( INTERSECTED );
    
    if( s ){
      if( s.active ){
        s.deactivate();
      }else{
        s.activate();
      }
    }
  }

}



