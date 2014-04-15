function initSongs(){

  var geo = new THREE.IcosahedronGeometry( 100 , 3 );
  var geo = logoGeo;
  var geo = headGeo;

  var colors = [

    //new THREE.Vector3( 32 , 255 , 146 ).multiplScalar( 1 / 256 ),
    new THREE.Vector3( 160 , 165 , 232 ).multiplyScalar( 1 / 256 ),
    new THREE.Vector3( 200 , 20 , 156).multiplyScalar( 1 / 256 ),
    new THREE.Vector3( 100 , 2 , 262).multiplyScalar( 1 / 256 ),
    new THREE.Vector3( 5 , 100  , 250).multiplyScalar( 1 / 256 ),

  ] 

  var positions = [

    new THREE.Vector3( -2000 , 0 , 2000 ), 
    new THREE.Vector3( 2000 , 0 , 2000 ), 
    new THREE.Vector3( 2000 , 0 , -2000 ), 
    new THREE.Vector3( -2000 , 0 , -2000 ), 

  ];
  
  var rotations= [

    new THREE.Euler(0 ,-Math.PI / 4 , 0 ), 
    new THREE.Euler( 0, Math.PI / 4 ,0), 
    new THREE.Euler(  0 ,( 3/4) * Math.PI , 0 ), 
    new THREE.Euler( 0 , (-3/4) * Math.PI , 0), 

  ]

  var rotations= [

  new THREE.Euler(  0 ,( 3/4) * Math.PI , 0 ), 
    new THREE.Euler( 0 , (-3/4) * Math.PI , 0), 

    new THREE.Euler(0 ,-Math.PI / 4 , 0 ), 
    new THREE.Euler( 0, Math.PI / 4 ,0), 
   // new THREE.Euler(  0 ,( 3/4) * Math.PI , 0 ), 
   // new THREE.Euler( 0 , (-3/4) * Math.PI , 0), 

  ]

  console.log( logoGeo );
  var to = new THREE.Mesh( logoGeo , mainMaterial );
  to.position.z = 000;
  to.rotation = new THREE.Euler(0 ,-Math.PI / 4 , 0 ), 
  geo.computeFaceNormals();
  geo.computeVertexNormals();
  //geo.computeF

  var pSize = 3000;
 // var to = new THREE.Mesh( logoGeo , mainMaterial );
  //to.position.set( -1500 , 0 , 0 );
  var from = new THREE.Mesh( geo , mainMaterial );
  from.position = positions[0];
  from.rotation = rotations[0];


  var title = 'Trails'
  var file  = 'audio/trails.mp3'
  new Song( flow , title , file , from , to  ,
  colors[0],   
  {
    curlSize:{type:"f"  , value:.001},
    dirPower:{type:"f"  , value:5.0},
    velPower:{type:"f"  , value:.9},
    curlPower:{type:"f"  , value:3.2},
    audioPower:{type:"f"  , value:.5},
    resetRadius:{type:"f"  , value:10.0},
  },

  {

    particleSize:{ type:"f" , value:30000 },
    noiseSize:{ type:"f" , value:.001 },
    noisePower:{ type:"f" , value:.1 },
    audioSizePower:{ type:"f" , value:.2 },
    positionPower:{ type:"f" , value:10. },
    spritePower:{ type:"f" , value:.1 },
    audioPower:{ type:"v3" , value:new THREE.Vector3( .1 , 4 , 4 ) },
    colorPower:{ type:"f" , value:1.6 },
    weirdPower:{ type:"f" , value:10 },
    finalDivision:{ type:"f" , value:1 },
    color:{ type:"v3" , value: new THREE.Vector3( .5 , 2.9 , 2. ) },

  }, {
    noisePower:{ type:"f" , value:10},
    noiseSpeed:{ type:"f" , value:50},
    noiseSize:{ type:"f" , value:.05},

    colorPower:{ type:"f" , value: .3},
    displacementPower:{ type:"f" , value: 10},
  
  }
  
  );


 // var to = new THREE.Mesh( logoGeo  , mainMaterial );
  //to.position.set( -1000 , 500 , 0 );
  var from = new THREE.Mesh( geo , mainMaterial );
  from.position = positions[1];
  from.rotation = rotations[1];

  var title = 'Maze1'
  var file  = 'audio/maze1.mp3'
  new Song( flow , title , file , from , to  , 
  colors[1],
  {
    curlSize:{type:"f"  , value:.001},
    dirPower:{type:"f"  , value:3.0},

    velPower:{type:"f"  , value:.9},
    curlPower:{type:"f"  , value:.8},
    audioPower:{type:"f"  , value:2.0},

    resetRadius:{type:"f"  , value:100.0}, 
  } ,
  
 {

    particleSize:{ type:"f" , value:3000 },
    noiseSize:{ type:"f" , value:.01 },
    noisePower:{ type:"f" , value:.1 },
    audioSizePower:{ type:"f" , value:1.3 },
    positionPower:{ type:"f" , value:.4 },
    spritePower:{ type:"f" , value:.1 },
    audioPower:{ type:"v3" , value:new THREE.Vector3( 1.0 , 1.0 , .1 ) },
    colorPower:{ type:"f" , value:1.6 },
    weirdPower:{ type:"f" , value:0 },

    finalDivision:{ type:"f" , value:1 },
    color:{ type:"v3" , value: colors[1]},

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
  from.position = positions[2];
  from.rotation = rotations[2];


    var title = 'Lucifer'
  var file  = 'audio/lucifer.mp3'
  new Song( flow , title , file , from , to  ,
  colors[2],
  {
    curlSize:{type:"f"  , value:.0003},
    dirPower:{type:"f"  , value:10.0},
    velPower:{type:"f"  , value:.3},
    curlPower:{type:"f"  , value:2.2},
    audioPower:{type:"f"  , value:1.4},

    resetRadius:{type:"f"  , value:20.0}, 
  },

  {

    particleSize:{ type:"f" , value:900 },
    noiseSize:{ type:"f" , value:.001 },
    noisePower:{ type:"f" , value:5.5 },
    audioSizePower:{ type:"f" , value:4.1 },
    positionPower:{ type:"f" , value:5.4 },
    spritePower:{ type:"f" , value:.1 },
    audioPower:{ type:"v3" , value:new THREE.Vector3( 1 , 1 , 1 ) },
    colorPower:{ type:"f" , value:.6 },
    weirdPower:{ type:"f" , value:1 },
    finalDivision:{ type:"f" , value:2 },
    color:{ type:"v3" , value: colors[2] },

  },{
    noisePower:{ type:"f" , value:30},
    noiseSpeed:{ type:"f" , value:100},
    noiseSize:{ type:"f" , value:.004},
    colorPower:{ type:"f" , value: 4.9},
    displacementPower:{ type:"f" , value: 10},
  
  });

  // var to = new THREE.Mesh( logoGeo , mainMaterial );
  //to.position.set( -1000 , -200 , 0 );
  var from = new THREE.Mesh( geo , mainMaterial );
  from.position = positions[3];
  from.rotation = rotations[3];

  var title = 'Tree Torrent'
  var file  = 'audio/treeTorrent.mp3'
  new Song( flow , title , file , from , to  ,
  colors[3],
  {
    curlSize:{type:"f"  , value:.0001},
    dirPower:{type:"f"  , value:10.0},
    velPower:{type:"f"  , value:.7},
    curlPower:{type:"f"  , value:5.2},
    audioPower:{type:"f"  , value:2.05},
    resetRadius:{type:"f"  , value:10.0},
  },
  {

    particleSize:{ type:"f" , value:10000 },
    noiseSize:{ type:"f" , value:.018 },
    noisePower:{ type:"f" , value:.00 },
    audioSizePower:{ type:"f" , value:.8 },
    positionPower:{ type:"f" , value:3. },
    spritePower:{ type:"f" , value:.1 },
    audioPower:{ type:"v3" , value:new THREE.Vector3( 1.5 , 2 , 1 ) },
    colorPower:{ type:"f" , value:1.6 },
    weirdPower:{ type:"f" , value:0 },
    finalDivision:{ type:"f" , value:1 },
    color:{ type:"v3" , value: colors[3] },

  }, 
  {
    noisePower:{ type:"f" , value:30},
    noiseSpeed:{ type:"f" , value:100},
    noiseSize:{ type:"f" , value:.01},
    colorPower:{ type:"f" , value: 2.5},
    displacementPower:{ type:"f" , value: .5},
  
  });

}

