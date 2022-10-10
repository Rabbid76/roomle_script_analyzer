import {ToolsCoreContextCallback, ToolsCoreInterface} from '../../node_modules/roomle-core-hsc/src/toolsCoreInterface'

export type ToolsCoreCallback = ToolsCoreContextCallback

export class ToolsCore {
    private _context: ToolsCoreCallback
    private _useWasm: boolean
    private _toolsCoreInstance: ToolsCoreInterface
    
    constructor(context : ToolsCoreCallback, useWasm : boolean) {
        this._context = context
        this._useWasm = useWasm
    }

    private async init() : Promise<void> {
        if (!this._toolsCoreInstance) {
            const module = this._useWasm
                ? "../../../node_modules/roomle-core-hsc/wasm/RoomleToolsCore.js"
                : "../../../node_modules/roomle-core-hsc/RoomleToolsCoreJs.js";
            // @ts-ignore
            const ToolsCoreCore = await require(module);   
            const toolsCoreModule = await ToolsCoreCore()
            toolsCoreModule.setContext(this._context)
            this._toolsCoreInstance = new toolsCoreModule.ToolsCoreInterface()
        }
    }

    public static async newToolsCore(context : ToolsCoreCallback, useWasm : boolean) : Promise<ToolsCore> {
        const toolsCore : ToolsCore = new ToolsCore(context, useWasm)
        await toolsCore.init()
        return toolsCore
    }

    public analyzeComponent(componentDefinition: string, source : string) : void {
        this._toolsCoreInstance.analyzeComponent(componentDefinition, source)
    }
}