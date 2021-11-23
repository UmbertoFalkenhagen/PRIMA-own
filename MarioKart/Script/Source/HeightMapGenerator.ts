namespace MarioKart {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(MarioKart);  // Register the namespace to FUDGE for serialization

  export class HeightMapGenerator extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(HeightMapGenerator);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "HeightMapGenerator added to ";
    public heightMapSource: ƒ.TextureImage;
    public reliefMesh: ƒ.MeshTerrain;


    constructor() {
      super();

      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR)
        return;

      // Listen to this component being added to or removed from a node
      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
    }

    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          ƒ.Debug.log(this.message, this.node);
          this.start();
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
      }
    }

    public start (): void  {
      //this.reliefMesh = this.node.getComponent(ƒ.MeshRelief);
      this.generateTerrain();
      //ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
      
      
    }

    //public update = (_event: Event): void => {

    //}

    public async generateTerrain(): Promise<void> {
      this.heightMapSource = new ƒ.TextureImage();
      this.heightMapSource = <ƒ.TextureImage>FudgeCore.Project.resources["TextureImage|2021-11-23T10:35:25.413Z|13750"];
      //await this.heightMapSource.load("../Textures/heightmap_3.png");

      /*for (let x = 0; x < this.heightMapSource.; index++) {
        const element = array[index];
        
      }*/
  
      this.reliefMesh = new ƒ.MeshRelief("HeightMap", this.heightMapSource);
    }

    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  }
}