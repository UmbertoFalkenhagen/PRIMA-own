namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!")

  let viewport: ƒ.Viewport;
  //let lasertransforms: ƒ.Matrix4x4[];
  
  let agent: ƒ.Node;
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

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a

    checkCollision();
  }

  function update(_event: Event): void {
    // ƒ.Physics.world.simulate();  // if physics is included and used
    viewport.draw();
    deltaTime = ƒ.Loop.timeFrameReal / 1000;
    laserformations.forEach(element => {
      lasers = element.getChildren();
      lasers.forEach(element => {
        element.mtxLocal.rotateZ(90 * deltaTime);
      });
    }); //equivalent to unity deltaTime
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
    
    
    
  }

  function checkCollision(): void {
    lasers.forEach(element => {
      let beams: ƒ.Node[] = element.getChildren();
      beams.forEach(element => {
        let posLocal: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(agent.mtxWorld.translation, element.mtxWorldInverse, true);
        console.log(posLocal);
      });
    });
    
  }

}