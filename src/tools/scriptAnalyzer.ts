import {ToolsCore, ToolsCoreCallback} from './toolsCore'
import {MessageObject} from '../interface/toolsCoreInterface'
import * as fs from 'fs';

const contextCallback : ToolsCoreCallback = {
    isReady: () => {},
    throw: (what : string) => console.log("exception: " + what),
    log: (_ : string) => {},
    error: (line: number, column: number, message : string, source: string) => {},
    message: (messageObject: MessageObject) => 
        console.log(messageObject.fileName + ":" + messageObject.line + ":" + messageObject.column + ": " + messageObject.type + " - " + messageObject.message + "\n"),
}

const loadComponentAndAnalyze = async (componentFilepath: string, useWasm: boolean) => {
    const toolsCore: ToolsCore = await ToolsCore.newToolsCore(contextCallback, !useWasm)
    const serializedComponentDefinition : string = await fs.promises.readFile(componentFilepath, 'utf8')
    await toolsCore.analyzeComponent(serializedComponentDefinition, componentFilepath);
}

const option: string = process.argv[2]
const useJsAssembly: boolean = option == "js"
const componentFilepath: string = process.argv[3]
console.log("analyze " + (useJsAssembly ? "ASM.js" : "WASM") + ": " + componentFilepath + "\n")
loadComponentAndAnalyze(componentFilepath, !useJsAssembly)
