// Asignando el Canvas a una variable
var canvas1 = document.getElementById('renderCanvas1');
var canvas2 = document.getElementById('renderCanvas2');

// Creando una instancia del motor de desarrollo de babylon
// posteriormente, pasamos el canvas al metodo del constructor
// asi le decimos al motor que renderice la escena en el elemento canvas

var engine1 = new BABYLON.Engine(canvas1);

var engine2 = new BABYLON.Engine(canvas2)

//Se crea una funcion 'createScene' que retorne la scena, la cual contendra 
//todo el contenido del mundo a crear

const createScene1 = function () {

  // Se crea una instancia de la escena, la cual sera retornada por la función
  var scene = new BABYLON.Scene(engine1);

  // Se agregar una camara de tipo ArcRotateCamera
  var camera = new BABYLON.ArcRotateCamera("Camera",
    Math.PI / 2, Math.PI / 2, 12, BABYLON.Vector3.Zero(), scene);

  // Esto setea la camara en el origen
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas1, true);

  var light = new BABYLON.HemisphericLight("light",
    new BABYLON.Vector3(0, 1, 0), scene);

  light.intensity = 0.7;
  

  // Agregando objetos animados .gltf 
  var folderPath = '/Object3D_Animated/Animals/glTF/';
  var objectName = 'Husky.gltf'
  BABYLON.SceneLoader.ImportMesh(
    '',
    folderPath,
    objectName,
    scene
  );

  return scene
}

const createScene2 = function () {

  // Se crea una instancia de la escena, la cual sera retornada por la función
  var scene = new BABYLON.Scene(engine2);

  var camera = new BABYLON.ArcRotateCamera("Camera",
    Math.PI / 2, Math.PI / 2, 12, BABYLON.Vector3.Zero(), scene);

  // This targets the camera to scene origin

  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas2, true);

  var light = new BABYLON.HemisphericLight("light",
    new BABYLON.Vector3(0, 1, 0), scene);

  light.intensity = 0.7;

  // Agregando objetos animados .gltf 
  var folderPath = '/Object3D_Animated/PMSM/';
  var objectName = 'pmsm.obj'

  var pmsm = BABYLON.SceneLoader.ImportMesh(
    '',
    folderPath,
    objectName,
    scene,
    function (meshes) {
      var mesh = meshes;
      
      var gizmoManager = new BABYLON.GizmoManager(scene);
      gizmoManager.positionGizmoEnabled = true;
      gizmoManager.attachToMesh(importedMesh);
      gizmoManager.gizmos.positionGizmo.scaleRatio = 1;
    }
  );
 pmsm.scaling = new BABYLON.Vector3(2, 2, 2); // Cambia los valores según la escala deseada

  

  // Se crea una variable "ground" que contiene un objeto contruido con la instancia MeshBuilder 
  // de la clase BABYLON

  // var ground = BABYLON.MeshBuilder.CreateGround('',{
  //   width: 10,
  //   height: 10,
  //   subdivisions: 10,
  //   subdivisionsX: 4,
  //   subdivisionsY: 2
  // });

  // Se cambia el tipo de material de un objeto asignado a una variable
  // ground.material = new BABYLON.StandardMaterial();
  // ground.material.wireframe = true;

  // Se puede crear un objeto tipo ground a partir de un mapa de calor "heighmap"

  // var groundHeightMap = new BABYLON.MeshBuilder.CreateGroundFromHeightMap('', '/images/heightmap.png',{
  //   width: 10,
  //   height: 10,
  //   subdivisions: 50,
  //   maxHeight:2
  // })

  // Se cambia el tipo de material de un objeto asignado a una variable
  // groundHeightMap.material = new BABYLON.StandardMaterial();
  // groundHeightMap.material.wireframe = true;

  // Se modifica la posicion de los objeto creador mediante vectores usando el metodo Vector3()
  // box.position = new BABYLON.Vector3(0,0,0);



  // Agregando objetos animados .gltf 
  return scene
}



// Se asigna la escena retornada la cual necesitaremos renderizar en una posterior 
// funcion de bucle

var scene1 = createScene1();
var scene2 = createScene2();

engine1.runRenderLoop(function () {
  scene1.render();
});
engine2.runRenderLoop(function () {
  scene2.render();
});

window.addEventListener('resize', function() {
  engine1.resize();
  engine2.resize();
});

//Inspector.Show(scene, {});






