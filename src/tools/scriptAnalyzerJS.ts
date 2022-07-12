import ToolsCoreInterface from '../interface/toolsCore'
import * as fs from 'fs';

const loadToolsCore = async () => {
    // @ts-ignore
    const ToolsCoreCore = await require("../../node_modules/roomle-core-hsc/RoomleToolsCoreJs.js");    
    const toolsCoreModule = await ToolsCoreCore();
    toolsCoreModule.setContext({
        isReady: () => {},
        throw: (what : string) => console.log("exception: " + what),
        log: (message : string) => console.log(message),
    })
    let toolsCore: ToolsCoreInterface = new toolsCoreModule.ToolsCore()
    return toolsCore;
}

const loadComponentAndAnalyze = async (componentFilepath: string) => {
    const toolsCore: ToolsCoreInterface = await loadToolsCore()
    const serializedComponentDefinition : string = await fs.promises.readFile(componentFilepath, 'utf8');
    toolsCore.analyzeComponent(serializedComponentDefinition, componentFilepath);
}

const componentFilepath: string = process.argv[2]
console.log("analyze: " + componentFilepath)
loadComponentAndAnalyze(componentFilepath)