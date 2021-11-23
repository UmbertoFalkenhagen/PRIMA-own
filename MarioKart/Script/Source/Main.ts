namespace MarioKart {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let sceneGraph: ƒ.Node;
  window.addEventListener("load", init);

  function init(_event: Event): void {
    let dialog: HTMLDialogElement = document.querySelector("dialog");
    dialog.querySelector("h1").textContent = document.title;
    dialog.addEventListener("click", function (_event: Event) {
        // @ts-ignore until HTMLDialog is implemented by all browsers and available in dom.d.ts
        dialog.close();
        start();
    });
    //@ts-ignore
    dialog.showModal();
}

  async function start(): Promise<void> {
    await ƒ.Project.loadResourcesFromHTML();
    sceneGraph = <ƒ.Graph>ƒ.Project.resources["Graph|2021-11-18T14:33:59.117Z|18376"];
    // setup Camera
    let cmpCamera: ƒ.ComponentCamera  = new ƒ.ComponentCamera();

    

    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", sceneGraph, cmpCamera, canvas);
    sceneGraph = viewport.getBranch();

    console.log(sceneGraph);
    sceneGraph.addComponent(cmpCamera);

    ƒ.AudioManager.default.listenTo(sceneGraph);
    ƒ.AudioManager.default.listenWith(sceneGraph.getComponent(ƒ.ComponentAudioListener));

    ƒ.AudioManager.default.listenTo(sceneGraph);
    ƒ.AudioManager.default.listenWith(sceneGraph.getComponent(ƒ.ComponentAudioListener));

    let kart: ƒ.Node = <ƒ.Graph>ƒ.Project.resources["Graph|2021-11-22T11:02:19.072Z|64411"];
    //kart.mtxLocal.translateX(5);
    sceneGraph.appendChild(kart);

    cmpCamera.mtxPivot.translateZ(100);
    cmpCamera.mtxPivot.translateY(100);
    cmpCamera.mtxPivot.rotateY(180);
    cmpCamera.mtxPivot.rotateX(45);
    
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    
  }

  function update(_event: Event): void {
    // ƒ.Physics.world.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}