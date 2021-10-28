"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CollisionDetector extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CollisionDetector);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CollisionDetector added to ";
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
    Script.CollisionDetector = CollisionDetector;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
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
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class LaserRotator extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(LaserRotator);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "LaserRotator added to ";
        viewport;
        rotationSpeed = 90;
        deltaTime;
        gameObject;
        rotationTransform;
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
    Script.LaserRotator = LaserRotator;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    //let lasertransforms: ƒ.Matrix4x4[];
    let agent;
    let agentoriginalpos;
    let graph;
    let lasers;
    let laserformations;
    //let beams: ƒ.Node[];
    let ctrlForward = new ƒ.Control("Forward", 1, 0 /* PROPORTIONAL */);
    ctrlForward.setDelay(200);
    let ctrlRotation = new ƒ.Control("Rotation", 1, 0 /* PROPORTIONAL */);
    ctrlRotation.setDelay(200);
    let agentMoveSpeedFactor = 10;
    let deltaTime;
    //let agentMoveDirection: number = 0;
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        viewport = _event.detail;
        graph = viewport.getBranch();
        laserformations = graph.getChildrenByName("Lasers")[0].getChildrenByName("Laserformation");
        lasers = laserformations[0].getChildrenByName("Laser");
        agent = graph.getChildrenByName("Agents")[0].getChildrenByName("Agent_1")[0];
        agentoriginalpos = agent.getComponent(ƒ.ComponentTransform);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
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
        let inputmovementvalue = (ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]))
            + (ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]));
        ctrlForward.setInput(inputmovementvalue);
        agent.mtxLocal.translateY(ctrlForward.getOutput() * deltaTime * agentMoveSpeedFactor);
        let inputrotationvalue = (ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            + (ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]));
        ctrlRotation.setInput(inputrotationvalue);
        agent.mtxLocal.rotateZ(ctrlRotation.getOutput() * deltaTime * 360);
        lasers.forEach(laser => {
            //laser.getComponent(ƒ.ComponentTransform).mtxLocal.rotateZ(90 * deltaTime);
            let laserBeams = laser.getChildrenByName("Beam");
            laserBeams.forEach(beam => {
                checkCollision(agent, beam);
            });
        });
    }
    function checkCollision(collider, obstacle) {
        let distance = ƒ.Vector3.TRANSFORMATION(collider.mtxWorld.translation, obstacle.mtxWorldInverse, true);
        let minX = obstacle.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.x / 2 + collider.radius;
        let minY = obstacle.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.y + collider.radius;
        if (distance.x <= (minX) && distance.x >= -(minX) && distance.y <= minY && distance.y >= 0) {
            //do something
            console.log("intersecting");
            agent.getComponent(ƒ.ComponentTransform).mutate(agentoriginalpos);
        }
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map