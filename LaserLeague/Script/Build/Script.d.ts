declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class Agent extends ƒ.Node {
        constructor();
    }
}
declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class CollisionDetector extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        viewport: ƒ.Viewport;
        deltaTime: number;
        agent: ƒ.Node;
        sceneGraph: ƒ.Graph;
        constructor();
        static checkCollision: (collider: ƒ.Node, obstacle: ƒ.Node) => void;
        hndEvent: (_event: Event) => void;
        start(): void;
        update: (_event: Event) => void;
    }
}
declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class GameManager extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        private static instance;
        deltaTime: number;
        agent: ƒ.Node;
        sceneGraph: ƒ.Node;
        constructor();
        static getInstance(): GameManager;
        hndEvent: (_event: Event) => void;
        start: () => void;
        update: (_event: Event) => void;
    }
}
declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class LaserRotator extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        viewport: ƒ.Viewport;
        rotationSpeed: number;
        deltaTime: number;
        constructor();
        hndEvent: (_event: Event) => void;
        start(): void;
        update: (_event: Event) => void;
    }
}
declare namespace LaserLeague {
}
