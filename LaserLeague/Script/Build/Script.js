"use strict";
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    class Agent extends ƒ.Node {
        constructor() {
            super("Agent");
            this.addComponent(new ƒ.ComponentTransform);
            this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshQuad("MeshAgent")));
            this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1)))));
            //this.mtxLocal.scale(ƒ.Vector3.ONE(0.5));
        }
    }
    LaserLeague.Agent = Agent;
})(LaserLeague || (LaserLeague = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(LaserLeague); // Register the namespace to FUDGE for serialization
    class CollisionDetector extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CollisionDetector);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CollisionDetector added to ";
        viewport;
        deltaTime;
        agents;
        sceneGraph;
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
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        update = (_event) => {
            this.sceneGraph = FudgeCore.Project.resources["Graph|2021-10-13T12:42:15.134Z|58505"];
            this.deltaTime = ƒ.Loop.timeFrameReal / 1000;
            this.agents = this.sceneGraph.getChildrenByName("Agents")[0].getChildren();
            //console.log(this.agents.length);
            /*this.agents.forEach(agent => {
              this.checkCollision(agent);
            });*/
        };
        checkCollision = (collider) => {
            //let mesh: ƒ.ComponentMesh = this.node.getComponent(ƒ.ComponentMesh);
            let posLocal = ƒ.Vector3.TRANSFORMATION(collider.mtxWorld.translation, this.node.mtxWorldInverse, true);
            let x = this.node.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.x / 2 + collider.radius / 2;
            let y = this.node.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.y + collider.radius / 2;
            if (posLocal.x <= (x) && posLocal.x >= -(x) && posLocal.y <= y && posLocal.y >= 0) {
                //console.log("intersecting");
                this.node.dispatchEvent(new CustomEvent("collisionEvent", { bubbles: true }));
                return true;
                //_agent.getComponent(agentComponentScript).respawn();
            }
            else {
                return false;
            }
        };
    }
    LaserLeague.CollisionDetector = CollisionDetector;
})(LaserLeague || (LaserLeague = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(LaserLeague); // Register the namespace to FUDGE for serialization
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
    LaserLeague.CustomComponentScript = CustomComponentScript;
})(LaserLeague || (LaserLeague = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(LaserLeague); // Register the namespace to FUDGE for serialization
    class GameManager extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(GameManager);
        static instance;
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "GameManager added to ";
        deltaTime;
        agent;
        sceneGraph;
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
        }
        static getInstance() {
            if (!GameManager.instance) {
                GameManager.instance = new GameManager();
            }
            return GameManager.instance;
        }
        // Activate the functions of this component as response to events
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    this.sceneGraph = this.node;
                    this.start();
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
            }
        };
        start = () => {
            console.log("thats what you looking for: " + this.node);
            //this.sceneGraph = this.node; //<ƒ.Graph>FudgeCore.Project.resources["Graph|2021-10-13T12:42:15.134Z|58505"];
            //this.agent = this.sceneGraph.getChildrenByName("Agents")[0].getChildrenByName("Agent_1")[0];
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
            this.deltaTime = ƒ.Loop.timeFrameReal / 1000;
        };
        update = (_event) => {
            //CollisionDetector.checkCollision(this.node, this.agent);
        };
    }
    LaserLeague.GameManager = GameManager;
})(LaserLeague || (LaserLeague = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(LaserLeague); // Register the namespace to FUDGE for serialization
    class LaserRotator extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(LaserRotator);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "LaserRotator added to ";
        viewport;
        rotationSpeed = 90;
        deltaTime;
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
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        update = (_event) => {
            this.deltaTime = ƒ.Loop.timeFrameReal / 1000;
            this.node.mtxLocal.rotateZ(this.rotationSpeed * this.deltaTime);
            /*this.agents = this.sceneGraph.getChildrenByName("Agents")[0].getChildren();
            this.beams.forEach(beam => {
              this.agents.forEach(agent => {
                beam.getComponent(CollisionDetector).checkCollision(agent);
              });
            });*/
        };
        hndRotationChangeEvent(_event) {
            console.log("Rotation change event received by " + _event.currentTarget);
            //console.log(this.node.name);
        }
    }
    LaserLeague.LaserRotator = LaserRotator;
})(LaserLeague || (LaserLeague = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let agent;
    let copyLaser;
    let graph;
    let agents;
    let lasers;
    //const event = new CustomEvent('build', { detail: {graph, lasers} }); //Example event with custom data
    let ctrlForward = new ƒ.Control("Forward", 1, 0 /* PROPORTIONAL */);
    ctrlForward.setDelay(200);
    let ctrlRotation = new ƒ.Control("Rotation", 1, 0 /* PROPORTIONAL */);
    ctrlRotation.setDelay(200);
    let agentMoveSpeedFactor = 10;
    let deltaTime;
    window.addEventListener("load", init);
    function init(_event) {
        let dialog = document.querySelector("dialog");
        dialog.querySelector("h1").textContent = document.title;
        dialog.addEventListener("click", (_event) => {
            // @ts-ignore until HTMLDialog is implemented by all browsers and available in dom.d.ts
            dialog.close();
            start();
        });
        //@ts-ignore
        dialog.showModal();
    }
    async function start() {
        await ƒ.Project.loadResourcesFromHTML();
        graph = ƒ.Project.resources["Graph|2021-10-13T12:42:15.134Z|58505"];
        // setup Camera
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.rotateY(180);
        cmpCamera.mtxPivot.translateZ(-35);
        graph.addComponent(cmpCamera);
        let canvas = document.querySelector("canvas");
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", graph, cmpCamera, canvas);
        graph = viewport.getBranch();
        ƒ.AudioManager.default.listenTo(graph);
        ƒ.AudioManager.default.listenWith(graph.getComponent(ƒ.ComponentAudioListener));
        graph.addEventListener("collisionEvent", hndCollisionEvent, false);
        let graphLaser = FudgeCore.Project.resources["Graph|2021-11-15T14:16:57.937Z|42317"];
        console.log(FudgeCore.Project.resources);
        agent = graph.getChildrenByName("Agents")[0].getChildrenByName("Agent_1")[0];
        console.log("Copy", copyLaser);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {
                copyLaser = await ƒ.Project.createGraphInstance(graphLaser);
                graph.getChildrenByName("Lasers")[0].addChild(copyLaser);
                copyLaser.mtxLocal.translateX(-10 + i * 10);
                copyLaser.mtxLocal.translateY(-4 + j * 8);
                copyLaser.addEventListener("rotationChangeEvent", copyLaser.getComponent(LaserLeague.LaserRotator).hndRotationChangeEvent, true);
                if (j >= 1) {
                    copyLaser.getComponent(LaserLeague.LaserRotator).rotationSpeed *= -1;
                }
            }
        }
        agent = new LaserLeague.Agent();
        graph.getChildrenByName("Agents")[0].addChild(agent);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.world.simulate();  // if physics is included and used
        viewport.draw();
        deltaTime = ƒ.Loop.timeFrameReal / 1000; //equivalent to unity deltaTime
        ƒ.AudioManager.default.update();
        //movementcontrol
        let inputmovementvalue = (ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]))
            + (ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]));
        ctrlForward.setInput(inputmovementvalue);
        agent.mtxLocal.translateY(ctrlForward.getOutput() * deltaTime * agentMoveSpeedFactor);
        let inputrotationvalue = (ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            + (ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]));
        ctrlRotation.setInput(inputrotationvalue);
        agent.mtxLocal.rotateZ(ctrlRotation.getOutput() * deltaTime * 360);
        agents = graph.getChildrenByName("Agents")[0].getChildren();
        lasers = graph.getChildrenByName("Lasers")[0].getChildren();
        //console.log(lasers.length);
        let beams;
        lasers.forEach(laser => {
            beams = laser.getChildrenByName("Beam");
            beams.forEach(beam => {
                agents.forEach(agent => {
                    if (beam.getComponent(LaserLeague.CollisionDetector).checkCollision(agent)) {
                        console.log(agent.name + " you dead!");
                        agent.mtxLocal.translation = new ƒ.Vector3(0, 0, 1);
                        let dieSound = graph.getComponents(ƒ.ComponentAudio)[1];
                        dieSound.play(true);
                    }
                });
            });
        });
        //console.log(agents.length);
        /*let lasercounter: number = 0;
        graph.getChildrenByName("Lasers")[0].getChildren().forEach(laser => {
          let beamcounter: number = 0;
          laser.getChildrenByName("Beam").forEach(beam => {
            console.log("Scanning beam _" + beamcounter + " of Laser _" + lasercounter)
            agents.forEach(_agent => {
              if (beam.getComponent(CollisionDetector).checkCollision(_agent)) {
                console.log(_agent.name + " you dead!");
                _agent.mtxLocal.translation = new ƒ.Vector3(0, 0, 1);
              }
              beamcounter ++;
            });
            lasercounter ++;
          });
        });
        
        
      }*/
    }
    function hndCollisionEvent(_event) {
        console.log("Collision event received by", _event.currentTarget);
        graph.broadcastEvent(new CustomEvent("rotationChangeEvent"));
    }
})(LaserLeague || (LaserLeague = {}));
//# sourceMappingURL=Script.js.map