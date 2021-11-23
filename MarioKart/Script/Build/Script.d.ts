declare namespace MarioKart {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace MarioKart {
    import ƒ = FudgeCore;
    class HeightMapGenerator extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        heightMapSource: ƒ.TextureImage;
        reliefMesh: ƒ.MeshTerrain;
        constructor();
        hndEvent: (_event: Event) => void;
        start(): void;
        generateTerrain(): Promise<void>;
    }
}
declare namespace MarioKart {
}
