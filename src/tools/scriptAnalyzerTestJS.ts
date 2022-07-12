import ToolsCoreInterface from '../interface/toolsCore'

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

const componentDefinitionNoError: string = `
{
    "id": "error_test",
    "geometry": "AddPlainCube(Vector3f{100, 100, 100}); SetObjSurface('isdt:yellow');"
}`

const componentDefinitionWithError: string = `
{
    "id": "error_test",
    "geometry": "this is an error"
}`

const analyzeTestComponents = async () => {
    const toolsCore: ToolsCoreInterface = await loadToolsCore();
    console.log("Analyze component with no error\n")
    toolsCore.analyzeComponent(componentDefinitionNoError, "");
    console.log("\nAnalyze component with 1 error\n")
    toolsCore.analyzeComponent(componentDefinitionWithError, "");
    console.log("\n")
}

analyzeTestComponents()