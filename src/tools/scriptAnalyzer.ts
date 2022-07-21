import {ToolsCore, ToolsCoreCallback} from './toolsCore'
import * as fs from 'fs';

const contextCallback : ToolsCoreCallback = {
    isReady: () => {},
    throw: (what : string) => console.log("exception: " + what),
    log: (_ : string) => {},
    error: (line: number, column: number, message : string, source: string) => 
        console.log(source + ":" + line + ":" + column + ":" + message + "\n"),
}

const loadComponentAndAnalyze = async (componentFilepath: string) => {
    const toolsCore: ToolsCore = await ToolsCore.newToolsCore(contextCallback, true)
    const serializedComponentDefinition : string = await fs.promises.readFile(componentFilepath, 'utf8')
    await toolsCore.analyzeComponent(serializedComponentDefinition, componentFilepath);
}

const componentFilepath: string = process.argv[2]
console.log("analyze: " + componentFilepath + "\n")
loadComponentAndAnalyze(componentFilepath)
