namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  //let lasertransforms: ƒ.Matrix4x4[];
  
  let agent: ƒ.Node;
  let agentoriginalpos: ƒ.Mutator;
  let graph: ƒ.Node;

  let lasers: ƒ.Node[];
  let laserformations: ƒ.Node[];
  //let beams: ƒ.Node[];

  let ctrlForward: ƒ.Control = new ƒ.Control("Forward", 1, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrlForward.setDelay(200);
  let ctrlRotation: ƒ.Control = new ƒ.Control("Rotation", 1, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrlRotation.setDelay(200);
  let agentMoveSpeedFactor: number = 10;
  let deltaTime: number;
  //let agentMoveDirection: number = 0;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    graph = viewport.getBranch();
    laserformations = graph.getChildrenByName("Lasers")[0].getChildrenByName("Laserformation");
    lasers = laserformations[0].getChildrenByName("Laser");
    agent = graph.getChildrenByName("Agents")[0].getChildrenByName("Agent_1")[0];
    agentoriginalpos = agent.getComponent(ƒ.ComponentTransform);
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a

    
  }

  function update(_event: Event): void {
    // ƒ.Physics.world.simulate();  // if physics is included and used
    viewport.draw();
    deltaTime = ƒ.Loop.timeFrameReal / 1000; //equivalent to unity deltaTime
    laserformations.forEach(element => {
      lasers = element.getChildren();
      //lasers.forEach(element => {
        //element.mtxLocal.rotateZ(90 * deltaTime);
      //});
    });
    ƒ.AudioManager.default.update();

    //movementcontrol
    let inputmovementvalue: number = (ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])) 
    + (ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]));

    ctrlForward.setInput(inputmovementvalue);
    agent.mtxLocal.translateY(ctrlForward.getOutput() * deltaTime * agentMoveSpeedFactor);

    let inputrotationvalue: number = (ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
    + (ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]));

    ctrlRotation.setInput(inputrotationvalue);
    agent.mtxLocal.rotateZ(ctrlRotation.getOutput() * deltaTime * 360);
    
    lasers.forEach(laser => {
      //laser.getComponent(ƒ.ComponentTransform).mtxLocal.rotateZ(90 * deltaTime);
      let laserBeams: ƒ.Node[] = laser.getChildrenByName("Beam");
      laserBeams.forEach(beam => {
        checkCollision(agent , beam);
      });
    });

    
  }

  
  function checkCollision (collider: ƒ.Node, obstacle: ƒ.Node) {
      let distance: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(collider.mtxWorld.translation, obstacle.mtxWorldInverse, true);   
      let minX = obstacle.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.x / 2 + collider.radius;
      let minY = obstacle.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.y + collider.radius;
      if (distance.x <= (minX) && distance.x >= -(minX) && distance.y <= minY && distance.y >= 0) {
        //do something
        console.log("intersecting");
        agent.getComponent(ƒ.ComponentTransform).mutate(agentoriginalpos);
      }
    }
    
  }
