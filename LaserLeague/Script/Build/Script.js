"use strict";
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    class Agent extends ƒ.Node {
        constructor() {
            super("Agent");
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
        static checkCollision = (collider, obstacle) => {
            let distance = ƒ.Vector3.TRANSFORMATION(collider.mtxWorld.translation, obstacle.mtxWorldInverse, true);
            let minX = obstacle.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.x / 2 + collider.radius;
            let minY = obstacle.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.y + collider.radius;
            if (distance.x <= (minX) && distance.x >= -(minX) && distance.y <= minY && distance.y >= 0) {
                //do something
                console.log("intersecting");
                //agent.getComponent(ƒ.ComponentTransform).mutate(agentoriginalpos);
            }
        };
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
            //this.agent = this.sceneGraph.getChildrenByName("Agents")[0].getChildrenByName("Agent_1")[0];
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        update = (_event) => {
            this.sceneGraph = FudgeCore.Project.resources["Graph|2021-10-13T12:42:15.134Z|58505"];
            this.deltaTime = ƒ.Loop.timeFrameReal / 1000;
            //CollisionDetector.checkCollision(this.node, this.agent);
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
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "GameManager added to ";
        static instance;
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
            //hier code einfuegen um agent zu generieren
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
            this.deltaTime = ƒ.Loop.timeFrameReal / 1000;
        };
        update = (_event) => {
            LaserLeague.CollisionDetector.checkCollision(this.node, this.agent);
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
        };
    }
    LaserLeague.LaserRotator = LaserRotator;
})(LaserLeague || (LaserLeague = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    //let lasertransforms: ƒ.Matrix4x4[];
    let agent;
    let copyLaser;
    //let gameManager: GameManager;
    //let beams: ƒ.Node[];
    let ctrlForward = new ƒ.Control("Forward", 1, 0 /* PROPORTIONAL */);
    ctrlForward.setDelay(200);
    let ctrlRotation = new ƒ.Control("Rotation", 1, 0 /* PROPORTIONAL */);
    ctrlRotation.setDelay(200);
    let agentMoveSpeedFactor = 10;
    let deltaTime;
    //let agentMoveDirection: number = 0;
    document.addEventListener("interactiveViewportStarted", start);
    async function start(_event) {
        viewport = _event.detail;
        let graph = viewport.getBranch();
        let graphLaser = FudgeCore.Project.resources["Graph|2021-11-02T13:37:28.823Z|56099"];
        console.log(FudgeCore.Project.resources);
        agent = graph.getChildrenByName("Agents")[0].getChildrenByName("Agent_1")[0];
        console.log("Copy", copyLaser);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {
                copyLaser = await ƒ.Project.createGraphInstance(graphLaser);
                graph.getChildrenByName("Lasers")[0].addChild(copyLaser);
                copyLaser.mtxLocal.translateX(-13.5 + i * 7.5);
                copyLaser.mtxLocal.translateY(-7.5 + j * 7.5);
                if (j >= 1) {
                    copyLaser.getComponent(LaserLeague.LaserRotator).rotationSpeed *= -1;
                }
            }
        }
        //gameManager = GameManager.getInstance();
        //gameManager.start();
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
    }
})(LaserLeague || (LaserLeague = {}));
//# sourceMappingURL=Script.js.map