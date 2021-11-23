"use strict";
var MarioKart;
(function (MarioKart) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(MarioKart); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
            }
        };
    }
    MarioKart.CustomComponentScript = CustomComponentScript;
})(MarioKart || (MarioKart = {}));
var MarioKart;
(function (MarioKart) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(MarioKart); // Register the namespace to FUDGE for serialization
    class HeightMapGenerator extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(HeightMapGenerator);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "HeightMapGenerator added to ";
        heightMapSource;
        reliefMesh;
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    this.start();
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
            }
        };
        start() {
            //this.reliefMesh = this.node.getComponent(ƒ.MeshRelief);
            this.generateTerrain();
            //ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
        }
        //public update = (_event: Event): void => {
        //}
        async generateTerrain() {
            this.heightMapSource = new ƒ.TextureImage();
            this.heightMapSource = FudgeCore.Project.resources["TextureImage|2021-11-23T10:35:25.413Z|13750"];
            //await this.heightMapSource.load("../Textures/heightmap_3.png");
            /*for (let x = 0; x < this.heightMapSource.; index++) {
              const element = array[index];
              
            }*/
            this.reliefMesh = new ƒ.MeshRelief("HeightMap", this.heightMapSource);
        }
    }
    MarioKart.HeightMapGenerator = HeightMapGenerator;
})(MarioKart || (MarioKart = {}));
var MarioKart;
(function (MarioKart) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let sceneGraph;
    window.addEventListener("load", init);
    function init(_event) {
        let dialog = document.querySelector("dialog");
        dialog.querySelector("h1").textContent = document.title;
        dialog.addEventListener("click", function (_event) {
            // @ts-ignore until HTMLDialog is implemented by all browsers and available in dom.d.ts
            dialog.close();
            start();
        });
        //@ts-ignore
        dialog.showModal();
    }
    async function start() {
        await ƒ.Project.loadResourcesFromHTML();
        sceneGraph = ƒ.Project.resources["Graph|2021-11-18T14:33:59.117Z|18376"];
        // setup Camera
        let cmpCamera = new ƒ.ComponentCamera();
        let canvas = document.querySelector("canvas");
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", sceneGraph, cmpCamera, canvas);
        sceneGraph = viewport.getBranch();
        console.log(sceneGraph);
        sceneGraph.addComponent(cmpCamera);
        ƒ.AudioManager.default.listenTo(sceneGraph);
        ƒ.AudioManager.default.listenWith(sceneGraph.getComponent(ƒ.ComponentAudioListener));
        ƒ.AudioManager.default.listenTo(sceneGraph);
        ƒ.AudioManager.default.listenWith(sceneGraph.getComponent(ƒ.ComponentAudioListener));
        let kart = ƒ.Project.resources["Graph|2021-11-22T11:02:19.072Z|64411"];
        //kart.mtxLocal.translateX(5);
        sceneGraph.appendChild(kart);
        cmpCamera.mtxPivot.translateZ(100);
        cmpCamera.mtxPivot.translateY(100);
        cmpCamera.mtxPivot.rotateY(180);
        cmpCamera.mtxPivot.rotateX(45);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.world.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(MarioKart || (MarioKart = {}));
//# sourceMappingURL=Script.js.map