var scene = new THREE.Scene();
var buttons = [];
var eyes = [];
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
var movement=0;


var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0x042029));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
document.getElementById('canvas-view').appendChild(renderer.domElement);

var light = new THREE.DirectionalLight(0xdfebff, 1.1);
light.position.set(0, 800, 800);
light.position.multiplyScalar(1);
light.castShadow = true;
light.shadowCameraFar = 10;
light.shadowDarkness = 0.5;

scene.add(light);



  var PLANE_SIZE = 1000;

  //Geometries
  var planeGeometry = new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE, 32, 32);

  for (var i = 0, l = planeGeometry.vertices.length; i < l; i++) {
    planeGeometry.vertices[i].z = Math.random() * 5;
  }

  //Materials
  var planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xEAF4FE
  });

  //Create objects
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;
  plane.receiveShadow = true;
  plane.castShadow = true;

   scene.add(plane)   

var HAT_HEIGHT = 6;
var HAT_RIM_HEIGHT = 1;
var BODY_RADIUS = 9;
var HEAD_RADIUS = 4;
var BUTTON_COUNT = 3;
var BUTTON_RADIUS = 1;
var EYE_RADIUS = 0.5;
var HOUSE_HEIGHT = 3;

var bodyGeometry = new THREE.SphereGeometry(BODY_RADIUS, 30, 30);
var headGeometry = new THREE.SphereGeometry(HEAD_RADIUS, 30, 30);
var hatGeometry = new THREE.CylinderGeometry(3, 3, HAT_HEIGHT, 40);
var hatRimGeometry = new THREE.CylinderGeometry(4, 4, HAT_RIM_HEIGHT, 40);
var eyeGeometry = new THREE.SphereGeometry(EYE_RADIUS, 30, 30);
var buttonGeometry = new THREE.SphereGeometry(BUTTON_RADIUS, 30, 30);

 var bodyMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    wireframe: false
  });

  var headMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    wireframe: false
  });

  var hatMaterial = new THREE.MeshLambertMaterial({
    color: 0x333333,
    wireframe: false
  });

  var eyeMaterial = new THREE.MeshLambertMaterial({
    color: 0x666666,
    wireframe: false
  });

  var buttonMaterial = new THREE.MeshLambertMaterial({
    color: 0x000000,
    wireframe: false
  });

  var armMaterial = new THREE.LineBasicMaterial({
    color: 0xA52A2A
  });


  var body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  var head = new THREE.Mesh(headGeometry, headMaterial);
  var hat = new THREE.Mesh(hatGeometry, hatMaterial);
  var hatRim = new THREE.Mesh(hatRimGeometry, hatMaterial);

  var i;
  for ( i = 0; i < BUTTON_COUNT; i++ ) {
    buttons[i] = new THREE.Mesh(buttonGeometry,buttonMaterial);
    var buttonAngle = (i + 3) * Math.PI / 6;
    buttons[i].position.x = 0;
    buttons[i].position.y =  BODY_RADIUS * (1 - Math.cos(buttonAngle));
    buttons[i].position.z = BODY_RADIUS * Math.sin(buttonAngle) + BUTTON_RADIUS * 0.8;
    buttons[i].castShadow = true;
  }

  var eyeAngelZ;
  var eyeAngelXY;
  for ( i = 0; i < 2; i++ ) {
    eyes[i] = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeAngelZ = Math.PI * 3 / 8;
    eyeAngelXY = Math.PI * 5 / 8;
    //todo - the maths here isn't right.
    eyes[i].position.x =  (-1 + 2 * i) * HEAD_RADIUS * Math.cos((-1 + 2 * i) * eyeAngelZ) + EYE_RADIUS * (-1 + 2 * i) / 5;
    eyes[i].position.z = HEAD_RADIUS + EYE_RADIUS + Math.cos(eyeAngelXY) * Math.sin(eyeAngelZ) * HEAD_RADIUS;
    eyes[i].position.y = BODY_RADIUS * 2 + HEAD_RADIUS + Math.sin(eyeAngelXY) * Math.cos(eyeAngelZ) * HEAD_RADIUS;
  }

  var arm1Geometry = new THREE.Geometry();
  arm1Geometry.vertices.push(new THREE.Vector3(0, BODY_RADIUS, 0));
  arm1Geometry.vertices.push(new THREE.Vector3(BODY_RADIUS * 1.5, BODY_RADIUS * 1.5, 0));
  arm1Geometry.vertices.push(new THREE.Vector3(BODY_RADIUS * 1.7, BODY_RADIUS * 2, 0));

  var arm2Geometry = new THREE.Geometry();
  arm2Geometry.vertices.push(new THREE.Vector3(0, BODY_RADIUS, 0));
  arm2Geometry.vertices.push(new THREE.Vector3(-BODY_RADIUS * 1.5, BODY_RADIUS * 1.5, 0));
  arm2Geometry.vertices.push(new THREE.Vector3(-BODY_RADIUS * 1.7, BODY_RADIUS * 2, 0));

  var arm1 = new THREE.Line(arm1Geometry, armMaterial);
  var arm2 = new THREE.Line(arm2Geometry, armMaterial);
  var nose = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 0, HOUSE_HEIGHT, 40),
      new THREE.MeshLambertMaterial({
        color: 0xFFA500,
        wireframe: false
      })
  );

  nose.rotation.z =  Math.PI / 2;
  nose.rotation.y =  Math.PI * 1.5;
  nose.position.z = HEAD_RADIUS + HOUSE_HEIGHT / 2;
  nose.position.y = BODY_RADIUS * 2 + HEAD_RADIUS;

  hat.position.y =  BODY_RADIUS * 2  +  HEAD_RADIUS * 1.75 + HAT_HEIGHT / 2;
  hatRim.position.y = BODY_RADIUS * 2  +  HEAD_RADIUS * 1.75 + HAT_RIM_HEIGHT / 2;

  body.castShadow = true;
  body.position.x = 0; 
  body.position.y = BODY_RADIUS;
  body.position.z = 0;

  head.position.x = 0;
  head.position.y = (parseInt(BODY_RADIUS) * 2 + parseInt(HEAD_RADIUS));
  head.position.z = 0;

  // Create snowman
  var snowmanMesh = new THREE.Group();
  snowmanMesh.add(body);
  snowmanMesh.add(head);
  snowmanMesh.add(arm1);
  snowmanMesh.add(arm2);
  snowmanMesh.add(hat);
  snowmanMesh.add(hatRim);
  snowmanMesh.add(nose);

  for ( i = 0; i < buttons.length; i++ ) {
    snowmanMesh.add(buttons[i]);
  }

  for ( var j = 0; j < eyes.length; j++ ) {
    snowmanMesh.add(eyes[j]);
  }

  snowmanMesh.castShadow = true;

scene.add(snowmanMesh)

var xp=0, yp=40, zp=120;
cameraposition(0,0,0);
 

var counter = 0;
var scaleShrinkage = 20;
var slow = 5
 function render() {
     counter++;
    renderer.render(scene, camera);
    
    snowmanMesh.position.y = 3 *   Math.sin( counter / slow );

    snowmanMesh.scale.set(
      1 + Math.cos(counter /  slow) / scaleShrinkage,
      1 + Math.sin(counter / slow ) / scaleShrinkage,
      1 + Math.cos(counter / slow) / scaleShrinkage
    );
   // requestAnimationFrame( render ); 

   move();
 
}

 render()

$(document).keydown(function(event){    
    var key = event.which;                
            switch(key) {
              case 37:
                  // Key left.
                  xp=xp+5;
                 cameraposition();
                  break;
              case 38:
                  // Key up.
                  yp=yp+5;
                  cameraposition();
                  break;
              case 39:
                  // Key right.
                  xp=xp-5;
                  cameraposition();
                  break;
              case 40:
                  // Key down.
                  if(yp > 7){yp=yp-5;}
                   cameraposition();
                  break;
        }   
  });

$(window).keypress(function (e) {
  if (e.keyCode === 0 || e.keyCode === 32) 
  {
     if(movement ==1)
      {
        movement = 0; // GAME PAUSED
      }else
      {movement=1;}

     move();
  }
})

function move()
{
    if(movement == 1)
    {
       requestAnimationFrame( render ); 
    }
}

function cameraposition()
{

camera.position.x = xp;
camera.position.y = yp;
camera.position.z = zp;
camera.lookAt(snowmanMesh.position)

}

// nieve

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var container;

var particle;

var camera;
var scene;
var renderer;

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var particles = []; 
var particleImage = new Image(); //THREE.ImageUtils.loadTexture( "http://i.imgur.com/cTALZ.png" );
particleImage.src = 'http://i.imgur.com/cTALZ.png'; 

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.add(camera);
        
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );
        
    for (var i = 0; i < 500; i++) {

        particle = new Particle3D( material);
        particle.position.x = Math.random() * 2000 - 1000;
        particle.position.y = Math.random() * 2000 - 1000;
        particle.position.z = Math.random() * 2000 - 1000;
        particle.scale.x = particle.scale.y =  1;
        scene.add( particle );
        
        particles.push(particle); 
    }

    container.appendChild( renderer.domElement );
    setInterval(loop, 1000 / 60);    
}


function loop() 
{

for(var i = 0; i<particles.length; i++) 
{
        var particle = particles[i]; 
        particle.updatePhysics(); 

        with(particle.position) 
        {
            if(y<-1000) y+=2000; 
            if(x>1000) x-=2000; 
            else if(x<-1000) x+=2000; 
            if(z>1000) z-=2000; 
            else if(z<-1000) z+=2000; 
        }                
    }
}

var TO_RADIANS = Math.PI / 180;

Particle3D = function(material) 
{
    THREE.Particle.call(this, material);

    //this.material = material instanceof Array ? material : [ material ];
    // define properties
    this.velocity = new THREE.Vector3(0, -8, 0);
    this.velocity.rotateX(randomRange(-45, 45));
    this.velocity.rotateY(randomRange(0, 360));
    this.gravity = new THREE.Vector3(0, 0, 0);
    this.drag = 1;
    
};

Particle3D.prototype = new THREE.Particle();
Particle3D.prototype.constructor = Particle3D;

Particle3D.prototype.updatePhysics = function() {
    this.velocity.multiplyScalar(this.drag);
    this.velocity.addSelf(this.gravity);
    this.position.addSelf(this.velocity);
}

THREE.Vector3.prototype.rotateY = function(angle) {
    cosRY = Math.cos(angle * TO_RADIANS);
    sinRY = Math.sin(angle * TO_RADIANS);

    var tempz = this.z;
    var tempx = this.x;

    this.x = (tempx * cosRY) + (tempz * sinRY);
    this.z = (tempx * -sinRY) + (tempz * cosRY);
}

THREE.Vector3.prototype.rotateX = function(angle) {
    cosRY = Math.cos(angle * TO_RADIANS);
    sinRY = Math.sin(angle * TO_RADIANS);

    var tempz = this.z;
    var tempy = this.y;

    this.y = (tempy * cosRY) + (tempz * sinRY);
    this.z = (tempy * -sinRY) + (tempz * cosRY);
}

THREE.Vector3.prototype.rotateZ = function(angle) {
    cosRY = Math.cos(angle * TO_RADIANS);
    sinRY = Math.sin(angle * TO_RADIANS);

    var tempx = this.x;
    var tempy = this.y;

    this.y = (tempy * cosRY) + (tempx * sinRY);
    this.x = (tempy * -sinRY) + (tempx * cosRY);
}

// returns a random number between the two limits provided 

function randomRange(min, max) {
    return ((Math.random() * (max - min)) + min);
}

