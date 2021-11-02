declare namespace Script {
    import ƒ = FudgeCore;
    class CollisionDetector extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
        checkCollision(collider: ƒ.Node, obstacle: ƒ.Node): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
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
declare namespace Script {
}
