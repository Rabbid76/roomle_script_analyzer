import {ToolsCore, ToolsCoreCallback} from './toolsCore'

const contextCallback : ToolsCoreCallback = {
    isReady: () => {},
    throw: (what : string) => console.log("exception: " + what),
    log: (_ : string) => {},
    error: (line: number, column: number, message : string, source: string) => 
        console.log(source + ":" + line + ":" + column + ": error: " + message + "\n"),
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
    const toolsCore: ToolsCore = await ToolsCore.newToolsCore(contextCallback, false)
    console.log("Analyze component with no error\n")
    toolsCore.analyzeComponent(componentDefinitionNoError, "");
    console.log("\nAnalyze component with 1 error\n")
    toolsCore.analyzeComponent(componentDefinitionWithError, "");
    console.log("\n")
}

analyzeTestComponents()