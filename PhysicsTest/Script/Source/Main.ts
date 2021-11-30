namespace PhysicsTest {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let sceneGraph: ƒ.Node;

  // let ground: ƒ.Node;
  // let cart: ƒ.Node;
  // let cmpCart: ƒ.ComponentRigidbody;

  window.addEventListener("load", init);

  function init(_event: Event): void {
    let dialog: HTMLDialogElement = document.querySelector("dialog");
    dialog.querySelector("h1").textContent = document.title;
    dialog.addEventListener("click", (_event: Event) => {
        // @ts-ignore until HTMLDialog is implemented by all browsers and available in dom.d.ts
        dialog.close();
        start();
      });
    //@ts-ignore
    dialog.showModal();
}

  async function start(): Promise<void> {
    await ƒ.Project.loadResourcesFromHTML();
    sceneGraph = <ƒ.Graph>ƒ.Project.resources["Graph|2021-11-30T11:23:11.948Z|51069"];

    let cmpCamera: ƒ.ComponentCamera  = new ƒ.ComponentCamera();

    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", sceneGraph, cmpCamera, canvas);
    sceneGraph = viewport.getBranch();

    ƒ.Physics.adjustTransforms(sceneGraph);

    ƒ.AudioManager.default.listenTo(sceneGraph);
    ƒ.AudioManager.default.listenWith(sceneGraph.getComponent(ƒ.ComponentAudioListener));

    // ground = sceneGraph.getChildrenByName("Ground")[0];
    // cart = sceneGraph.getChildrenByName("Cart")[0];

    // ground.addComponent(new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.COLLISION_GROUP.GROUP_1));
    // ground.getComponent(ƒ.ComponentRigidbody).restitution = 0;
    // cmpCart = new ƒ.ComponentRigidbody(80, ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.CAPSULE, ƒ.COLLISION_GROUP.DEFAULT);
    // cmpCart.restitution = 0;
    // cart.addComponent(cmpCart); 

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    ƒ.Physics.world.simulate(Math.min(0.1, ƒ.Loop.timeFrameReal / 1000));  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}