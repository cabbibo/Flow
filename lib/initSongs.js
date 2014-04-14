function initSongs(){

  var geo = new THREE.IcosahedronGeometry( 100 , 3 );
  var geo = logoGeo;
  var geo = headGeo;

  var to = new THREE.Mesh( logoGeo , mainMaterial );
  geo.computeFaceNormals();
  geo.computeVertexNormals();
  //geo.computeF

  var pSize = 3000;
 // var to = new THREE.Mesh( logoGeo , mainMaterial );
  //to.position.set( -1500 , 0 , 0 );
  var from = new THREE.Mesh( geo , mainMaterial );
  from.position.set( -pSize , 0 , 0 );
  from.rotation.z = Math.PI / 2;

  var title = 'Lucifer'
  var file  = 'audio/lucifer.mp3'
  new Song( flow , title , file , from , to  ,
  new THREE.Vector3( 1.0 , .9 , 0.0 ),
  {
    curlSize:{type:"f"  , value:.005},
    dirPower:{type:"f"  , value:10.0},
    velPower:{type:"f"  , value:.3},
    curlPower:{type:"f"  , value:1.2},
    audioPower:{type:"f"  , value:.5},
    resetRadius:{type:"f"  , value:1.0}, 
  },

  {

    particleSize:{ type:"f" , value:900 },
    noiseSize:{ type:"f" , value:.001 },
    noisePower:{ type:"f" , value:5.5 },
    audioSizePower:{ type:"f" , value:4.1 },
    positionPower:{ type:"f" , value:5.4 },
    spritePower:{ type:"f" , value:.1 },
    audioPower:{ type:"v3" , value:new THREE.Vector3( 4.5 , 4 , 0 ) },
    colorPower:{ type:"f" , value:.6 },
    weirdPower:{ type:"f" , value:1 },
    finalDivision:{ type:"f" , value:2 },
    color:{ type:"v3" , value: new THREE.Vector3( 2.5 , .9 , 4. ) },

  },{
    noisePower:{ type:"f" , value:30},
    noiseSpeed:{ type:"f" , value:100},
    noiseSize:{ type:"f" , value:.001},
    colorPower:{ type:"f" , value: .9},
    displacementPower:{ type:"f" , value: 10},
  
  });



 // var to = new THREE.Mesh( logoGeo  , mainMaterial );
  //to.position.set( -1000 , 500 , 0 );
  var from = new THREE.Mesh( geo , mainMaterial );
  from.position.set( pSize , 0 , 0 );
  from.rotation.z = -Math.PI / 2;

  var title = 'Maze1'
  var file  = 'audio/maze1.mp3'
  new Song( flow , title , file , from , to  , 
   new THREE.Vector3( 1.0 , .3 , 1.0 ),
  {
    curlSize:{type:"f"  , value:.001},
    dirPower:{type:"f"  , value:1.0},
    velPower:{type:"f"  , value:.9},
    curlPower:{type:"f"  , value:.4},
    audioPower:{type:"f"  , value:.5},
    resetRadius:{type:"f"  , value:50.0}, 
  } ,
  
 {

    particleSize:{ type:"f" , value:10000 },
    noiseSize:{ type:"f" , value:.01 },
    noisePower:{ type:"f" , value:.1 },
    audioSizePower:{ type:"f" , value:1.3 },
    positionPower:{ type:"f" , value:.4 },
    spritePower:{ type:"f" , value:.1 },
    audioPower:{ type:"v3" , value:new THREE.Vector3( 1.5 , 4 , 10 ) },
    colorPower:{ type:"f" , value:1.6 },
    weirdPower:{ type:"f" , value:100 },
    finalDivision:{ type:"f" , value:1 },
    color:{ type:"v3" , value: new THREE.Vector3( 4.5 , .9 , 2. ) },

  },{
    noisePower:{ type:"f" , value:30},
    noiseSpeed:{ type:"f" , value:100},
    noiseSize:{ type:"f" , value:.01},
    colorPower:{ type:"f" , value: .9},
    displacementPower:{ type:"f" , value: 10},
  
  }
  );

 // var to = new THREE.Mesh( logoGeo  , mainMaterial );
  //to.position.set( -1000 , 200 , 0 );
  var from = new THREE.Mesh( geo , mainMaterial );
  from.position.set( 0 , -pSize , 0 );
  from.rotation.z = Math.PI;

  var title = 'Trails'
  var file  = 'audio/trails.mp3'
  new Song( flow , title , file , from , to  ,
   new THREE.Vector3( .3 , .9 , 1.0 ),    
  {
    curlSize:{type:"f"  , value:.002},
    dirPower:{type:"f"  , value:2.0},
    velPower:{type:"f"  , value:.9},
    curlPower:{type:"f"  , value:1.2},
    audioPower:{type:"f"  , value:.5},
    resetRadius:{type:"f"  , value:10.0},
  },

  {

    particleSize:{ type:"f" , value:30000 },
    noiseSize:{ type:"f" , value:.01 },
    noisePower:{ type:"f" , value:.1 },
    audioSizePower:{ type:"f" , value:.2 },
    positionPower:{ type:"f" , value:10. },
    spritePower:{ type:"f" , value:.1 },
    audioPower:{ type:"v3" , value:new THREE.Vector3( .4 , 4 , 4 ) },
    colorPower:{ type:"f" , value:1.6 },
    weirdPower:{ type:"f" , value:10 },
    finalDivision:{ type:"f" , value:1 },
    color:{ type:"v3" , value: new THREE.Vector3( 1.5 , 2.9 , 2. ) },

  }, {
    noisePower:{ type:"f" , value:10},
    noiseSpeed:{ type:"f" , value:200},
    noiseSize:{ type:"f" , value:.05},

    colorPower:{ type:"f" , value: .3},
    displacementPower:{ type:"f" , value: 10},
  
  }
  
  );

  // var to = new THREE.Mesh( logoGeo , mainMaterial );
  //to.position.set( -1000 , -200 , 0 );
  var from = new THREE.Mesh( geo , mainMaterial );
  from.position.set( 0 , pSize , 0 );
  //from.rotation.z = Math.PI;

  var title = 'Tree Torrent'
  var file  = 'audio/treeTorrent.mp3'
  new Song( flow , title , file , from , to  ,
  new THREE.Vector3( .3 , .9 , 1.0 ),
  {
    curlSize:{type:"f"  , value:.001},
    dirPower:{type:"f"  , value:4.0},
    velPower:{type:"f"  , value:.7},
    curlPower:{type:"f"  , value:2.2},
    audioPower:{type:"f"  , value:1.5},
    resetRadius:{type:"f"  , value:10.0},
  },
  {

    particleSize:{ type:"f" , value:10000 },
    noiseSize:{ type:"f" , value:.018 },
    noisePower:{ type:"f" , value:.00 },
    audioSizePower:{ type:"f" , value:.8 },
    positionPower:{ type:"f" , value:3. },
    spritePower:{ type:"f" , value:.1 },
    audioPower:{ type:"v3" , value:new THREE.Vector3( 1.5 , 10 , 1 ) },
    colorPower:{ type:"f" , value:1.6 },
    weirdPower:{ type:"f" , value:0 },
    finalDivision:{ type:"f" , value:1 },
    color:{ type:"v3" , value: new THREE.Vector3( 4.5 , .9 , 2. ) },

  }, 
  {
    noisePower:{ type:"f" , value:30},
    noiseSpeed:{ type:"f" , value:1000},
    noiseSize:{ type:"f" , value:.001},
    colorPower:{ type:"f" , value: .5},
    displacementPower:{ type:"f" , value: 10},
  
  });

}

