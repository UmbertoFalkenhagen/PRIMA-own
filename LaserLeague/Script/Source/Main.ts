namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!")

  let viewport: ƒ.Viewport;
  let transform: ƒ.Matrix4x4;
  let laser: ƒ.Node;
  let agent: ƒ.Node;
  let graph: ƒ.Node;
  let agentMoveSpeed: number = 0;
  let deltaTime: number;
  let agentMoveDirection: number = 0;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    graph = viewport.getBranch();
    laser = graph.getChildrenByName("Lasers")[0].getChildrenByName("Laserformation_1")[0].getChildrenByName("Laser")[0];
    transform = laser.getComponent(ƒ.ComponentTransform).mtxLocal;
    console.log("laser: " + laser);
    agent = graph.getChildrenByName("Agents")[0].getChildrenByName("Agent_1")[0];

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a


  }

  function update(_event: Event): void {
    // ƒ.Physics.world.simulate();  // if physics is included and used
    viewport.draw();
    deltaTime = ƒ.Loop.timeFrameReal / 1000; //equivalent to unity deltaTime
    transform.rotateZ(90 * deltaTime);
    ƒ.AudioManager.default.update();
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])) {
      agentMoveDirection = 1;
      agent.mtxLocal.translateY(agentMoveDirection * agentMoveSpeed * deltaTime);
      
      accelerateAgent(10, 10);
    } else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
      agentMoveDirection = -1;
      agent.mtxLocal.translateY(agentMoveDirection * agentMoveSpeed * deltaTime);
      
      accelerateAgent(10, 10);
    } else {
      decelerateAgent(20);
      agent.mtxLocal.translateY(agentMoveDirection * agentMoveSpeed * deltaTime);

    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
      agent.mtxLocal.rotateZ(-250 * deltaTime);
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
      agent.mtxLocal.rotateZ(250 * deltaTime);
    }
    
    
  }

  function accelerateAgent(_accelerationSpeed: number, _speedLimit: number) : void {
    if (agentMoveSpeed < _speedLimit) {
      agentMoveSpeed += _accelerationSpeed * deltaTime;
    } else {
      agentMoveSpeed = _speedLimit;
    }
  }

  function decelerateAgent(_decelerationSpeed: number): void {
    if (agentMoveSpeed > 0) {
      agentMoveSpeed -= _decelerationSpeed * deltaTime;
    } else {
      agentMoveDirection = 0;
      agentMoveSpeed = 0;
    }
  }

}