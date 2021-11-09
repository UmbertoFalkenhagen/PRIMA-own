namespace LaserLeague {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  //let lasertransforms: ƒ.Matrix4x4[];
  
  let agent: Agent;
  let copyLaser: ƒ.GraphInstance;
  let graph: ƒ.Node;
  let agents: Agent[];
  //let gameManager: GameManager;

  //let beams: ƒ.Node[];

  let ctrlForward: ƒ.Control = new ƒ.Control("Forward", 1, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrlForward.setDelay(200);
  let ctrlRotation: ƒ.Control = new ƒ.Control("Rotation", 1, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrlRotation.setDelay(200);
  let agentMoveSpeedFactor: number = 10;
  let deltaTime: number;
  //let agentMoveDirection: number = 0;
  document.addEventListener("interactiveViewportStarted",  <EventListener><unknown>start);
  

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;
    graph = viewport.getBranch();

    let graphLaser: ƒ.Graph = <ƒ.Graph>FudgeCore.Project.resources["Graph|2021-11-02T13:37:28.823Z|56099"];
    console.log(FudgeCore.Project.resources);
    agent = graph.getChildrenByName("Agents")[0].getChildrenByName("Agent_1")[0];
    
    console.log("Copy", copyLaser);
    for (let i: number = 0; i < 3; i++) {
      for (let j: number = 0; j < 2; j++) {
        copyLaser = await ƒ.Project.createGraphInstance(graphLaser);
        graph.getChildrenByName("Lasers")[0].addChild(copyLaser);
        copyLaser.mtxLocal.translateX(-13.5 + i * 7.5);
        copyLaser.mtxLocal.translateY(-7.5 + j * 7.5);
        if (j>=1) {
          copyLaser.getComponent(LaserRotator).rotationSpeed *= -1;
        }
      }
    }
    
    agent = new Agent();
    graph.getChildrenByName("Agents")[0].addChild(agent);
    //gameManager = GameManager.getInstance();
    //gameManager.start();
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    
    
  }

  function update(_event: Event): void {
    // ƒ.Physics.world.simulate();  // if physics is included and used
    viewport.draw();
    deltaTime = ƒ.Loop.timeFrameReal / 1000; //equivalent to unity deltaTime
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

    agents = graph.getChildrenByName("Agents")[0].getChildren();
    //console.log(agents.length);
    
    graph.getChildrenByName("Lasers")[0].getChildren().forEach(laser => {
        laser.getChildrenByName("Beam").forEach(beam => {
          agents.forEach(_agent => {
            if (beam.getComponent(CollisionDetector).checkCollision(_agent)) {
              console.log(_agent.name + " you dead!");
            }
          });
        });
    });
    
    
  }
    
}
