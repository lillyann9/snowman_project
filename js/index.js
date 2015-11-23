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

//scane.add(camera);
scene.add(light);


  var PLANE_SIZE = 10000;

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
   var scoreboard = new Scoreboard();
  
  scoreboard.score();


var BODY_RADIUS = 13;
var BODY2_RADIUS = 8;
var HEAD_RADIUS = 6;
var BUTTON_COUNT = 6;
var BUTTON_RADIUS = 1;
var EYE_RADIUS = 0.6;
var HOUSE_HEIGHT = 3;

var bodyGeometry = new THREE.SphereGeometry(BODY_RADIUS, 30, 30);
var body2Geometry = new THREE.SphereGeometry(BODY2_RADIUS,30,30);
var headGeometry = new THREE.SphereGeometry(HEAD_RADIUS, 30, 30);
var eyeGeometry = new THREE.SphereGeometry(EYE_RADIUS, 30, 30);
var buttonGeometry = new THREE.SphereGeometry(BUTTON_RADIUS, 30, 30);

 var bodyMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    wireframe: false
  });
 var bodyMaterial2 = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    wireframe: false
  });

  var headMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
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
    color: 0xcc6600,
    linewidth: 5
  });


  var body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  var body2 = new THREE.Mesh(body2Geometry,bodyMaterial2);
  var head = new THREE.Mesh(headGeometry, headMaterial);

  var i;
  var j =0;
  for ( i = 0; i < BUTTON_COUNT; i++ ) {
    if(i < 3){
      buttons[i] = new THREE.Mesh(buttonGeometry,buttonMaterial);
      var buttonAngle = (i + 3) * Math.PI / 6;
      buttons[i].position.x = 0;
      buttons[i].position.y =  BODY_RADIUS * (1 - Math.cos(buttonAngle));
      buttons[i].position.z = BODY_RADIUS * Math.sin(buttonAngle) + BUTTON_RADIUS * 0.8;
      buttons[i].castShadow = true;

    }else{
      buttons[i] = new THREE.Mesh(buttonGeometry,buttonMaterial);
      var buttonAngle = (j + 3) * Math.PI / 6;
      buttons[i].position.x = 0;
      buttons[i].position.y =  BODY2_RADIUS * (1 - Math.cos(buttonAngle))+22;
      buttons[i].position.z = BODY2_RADIUS * Math.sin(buttonAngle) + BUTTON_RADIUS * 0.8;
      buttons[i].castShadow = true;
      j++;

    }

  }

  var eyeAngelZ;
  var eyeAngelXY;
  for ( i = 0; i < 2; i++ ) {
    eyes[i] = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeAngelZ = Math.PI * 3 / 8;
    eyeAngelXY = Math.PI * 5 / 8;
    //todo - the maths here isn't right.
    eyes[i].position.x =  (-1 + 2 * i) * HEAD_RADIUS * Math.cos((-1 + 2 * i) * eyeAngelZ) + EYE_RADIUS * (-1 + 2 * i) / 5;
    eyes[i].position.z = (HEAD_RADIUS + EYE_RADIUS + Math.cos(eyeAngelXY) * Math.sin(eyeAngelZ) * HEAD_RADIUS)+1;
    eyes[i].position.y = (BODY_RADIUS * 2 + HEAD_RADIUS + Math.sin(eyeAngelXY) * Math.cos(eyeAngelZ) * HEAD_RADIUS)+12;
  }

  var arm1Geometry = new THREE.Geometry();
  arm1Geometry.vertices.push(new THREE.Vector3(0, (BODY_RADIUS+BODY2_RADIUS)+13, 0));
  arm1Geometry.vertices.push(new THREE.Vector3(BODY_RADIUS * 1.2, BODY_RADIUS * 2, 0));
  arm1Geometry.vertices.push(new THREE.Vector3(BODY_RADIUS * 1.7, BODY_RADIUS * 2, 0));

  var arm2Geometry = new THREE.Geometry();
  arm2Geometry.vertices.push(new THREE.Vector3(0, (BODY_RADIUS+BODY2_RADIUS)+13, 0));
  arm2Geometry.vertices.push(new THREE.Vector3(-BODY_RADIUS * 1.2, BODY_RADIUS * 2, 0));
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
  nose.position.z = (HEAD_RADIUS + HOUSE_HEIGHT / 2)+1;
  nose.position.y = (BODY_RADIUS * 2 + HEAD_RADIUS)+12;

  body.castShadow = true;
  body.position.x = 0;
  body.position.y = BODY_RADIUS;
  body.position.z = 0;

  body2.castShadow = true;
  body2.position.x = 0;
  body2.position.y = (parseInt(BODY_RADIUS) * 2 + parseInt(HEAD_RADIUS));
  body2.position.z = 0;

  head.position.x = 0;
  head.position.y = (parseInt(BODY_RADIUS) * 2 + parseInt(HEAD_RADIUS))+13;
  head.position.z = 0;

  // Create snowman
  var snowmanMesh = new THREE.Group();
  snowmanMesh.add(body);
  snowmanMesh.add(body2);
  snowmanMesh.add(head);
  snowmanMesh.add(arm1);
  snowmanMesh.add(arm2);
  snowmanMesh.add(nose);

  for ( i = 0; i < buttons.length; i++ ) {
    snowmanMesh.add(buttons[i]);
  }

  for ( var j = 0; j < eyes.length; j++ ) {
    snowmanMesh.add(eyes[j]);
  }

  snowmanMesh.castShadow = true;

scene.add(snowmanMesh);

var xp=0, yp=40, zp=120;
cameraposition(0,0,0);


var counter = 0;
var scaleShrinkage = 20;
var slow = 5
 function render() {
     counter++;
    renderer.render(scene, camera);
   //  container.appendChild( renderer.domElement );

    snowmanMesh.position.y = 3 *   Math.sin( counter / slow );

    snowmanMesh.scale.set(
      1 + Math.cos(counter /  slow) / scaleShrinkage,
      1 + Math.sin(counter / slow ) / scaleShrinkage,
      1 + Math.cos(counter / slow) / scaleShrinkage
    );
   move();

}

 render();

function checkCollisions(snowball) {
    position1 = snowball.position,
    position2 = snowmanMesh.position;

    var distance = Math.sqrt(
      (position1.x - position2.x)*(position1.x - position2.x) +
      (position1.z - position2.z)*(position1.z - position2.z)
    );
    if (distance < 10) {
      console.log("Collision");
      return true;
    }
}

function throwSnowballs() {

    var snowball = new THREE.Mesh(
        new THREE.SphereGeometry(5, 150, 150),
        new THREE.MeshBasicMaterial({color: 0xFFFFFF})
    );

    snowball.position.set(Math.floor(Math.random() * 201) - 100, 30, 50);

    scene.add(snowball);

    new TWEEN
    .Tween({
        height: 30,
        movement: 50
    })
    .to({
        height: 0,
        movement: -150
    }, 500)
    .onUpdate(function () {
        snowball.position.y = this.height;
        snowball.position.z = this.movement;
        if (checkCollisions(snowball)) {
            scene.remove(snowball);
            // Funcion de vidas o puntos
        }
    })
    .onComplete(function() {
        scene.remove(snowball);
    })
    .start();
}

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

$(window).keypress(function (e)
{
  if (e.keyCode === 0 || e.keyCode === 32)
  {
    scoreboard.timer();
     if(movement ==1)
      {
        movement = 0; // GAME PAUSED
        scoreboard.stopTimer();

      }else
      {movement=1;
        scoreboard.startTimer();}

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


// NIEVE MIL...!


function initCanvas()
{
  var ctx = document.getElementById('canvas1').getContext('2d');
  var cW = ctx.canvas.width, cH = ctx.canvas.height;
  var flakes = [];

  function addFlake()
  {
    var x = Math.floor(Math.random() * cW) + 1;
    var y = 0;
    var s = Math.floor(Math.random() * 3) + 1;
    flakes.push({"x":x,"y":y,"s":s});
  }

  function snow()
  {
    addFlake();
    addFlake();
    for(var i = 0; i < flakes.length; i++)
    {
      ctx.fillStyle = "rgba(255,255,255,.75)";
      ctx.beginPath();
      ctx.arc(flakes[i].x, flakes[i].y+=flakes[i].s*.5, flakes[i].s*.5, 0, Math.PI*2, false);
      ctx.fill();
      if(flakes[i].y > cH)
      {
        flakes.splice(i,1);
      }
    }
  }

  function animate()
  {
    ctx.save();
    ctx.clearRect(0, 0, cW, cH);

    snow();
    ctx.restore();
    TWEEN.update();
  }

  var animateInterval = setInterval(animate, 30);
  var snowballInterval = setInterval(throwSnowballs, 1200);
}

window.addEventListener('load', function(event)
{
  initCanvas();
});
