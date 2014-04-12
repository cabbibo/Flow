
var mouse = {};
var INTERSECTED;

function initRaycaster(){


  renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
  renderer.domElement.addEventListener( 'click', onClick, false );
  projector = new THREE.Projector();

}

function onDocumentMouseMove( event ) {

  event.preventDefault();


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

  var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
  projector.unprojectVector( vector, camera );

  var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

  var objects = [];
  for( var i = 0; i < SONGS.length; i++ ){

    objects.push( SONGS[i].toMesh );
    objects.push( SONGS[i].fromMesh );
    objects.push( SONGS[i].titleMesh );

  }


  var intersects = raycaster.intersectObjects( objects , true );



  if ( intersects.length > 0 ) {

    if ( INTERSECTED != intersects[ 0 ].object ) {

    
      if ( INTERSECTED ){

        var b = checkForIntersectedBalls( INTERSECTED );
        var s = checkForIntersectedSong( INTERSECTED );
        if( s )
          s.onHoverOut();
        else
          console.log( 'NO SONG!' );
                //INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
        
      }

      INTERSECTED = intersects[ 0 ].object;

      var b = checkForIntersectedBalls( INTERSECTED );
      var s = checkForIntersectedSong( INTERSECTED );
      if( s )
        s.onHoverOver();
      else
        console.log( 'NO SONG!' );
      //INTERSECTED.hoverOver();

      //container.style.cursor = 'pointer';

    }

  } else {

    if ( INTERSECTED ) {

      //INTERSECTED.hoverOut();
 
      var s = checkForIntersectedSong( INTERSECTED );
      var b = checkForIntersectedBalls( INTERSECTED );
      if( s )
        s.onHoverOut();
      else
        console.log( 'NO SONG!' );


    }

    INTERSECTED = null;

    //container.style.cursor = 'auto';


  }
 

}

function checkForIntersectedSong( object ){

  for( var i = 0; i < SONGS.length; i++ ){

    var s = SONGS[i];
    if( object == s.toMesh || object == s.fromMesh || object == s.titleMesh ){
      
      return s;
    }

  }

}

function checkForIntersectedSong( object ){

  for( var i = 0; i < SONGS.length; i++ ){

    var s = SONGS[i];
    if( object == s.toMesh || object == s.fromMesh || object == s.titleMesh ){
      
      return s;
    }

  }

}


function onClick( event ){

  if( INTERSECTED ){

    var s = checkForIntersectedSong( INTERSECTED );
    
    if( s ){
      if( s.active ){
        s.deactivate();
      }else{
        s.activate();
      }
    }else{
      console.log( 'NO SONG!' );
    }



  }

}



