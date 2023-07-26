import {ToolsCoreInstance, ToolsCoreCallback} from 'roomle-core-hsc/src/embind/toolsCore'
import {MessageObject} from 'roomle-core-hsc/src/embind/toolsCoreInterface'

const contextCallback : ToolsCoreCallback = {
    isReady: () => {},
    throw: (what : string) => console.log("exception: " + what),
    log: (message : string) => console.log(message),
    error: (line: number, column: number, message : string, source: string) => {},
    message: (messageObject: MessageObject) => 
    console.log(messageObject.fileName + ":" + messageObject.line + ":" + messageObject.column + ": " + messageObject.type + " - " + messageObject.message + "\n"),
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

const componentDefinitionWithWarning: string = `
{
    "id": "catalogId:validChildren",
    "validChildren": [ "child1" ]
}`

const analyzeTestComponents = async () => {
    const toolsCore: ToolsCoreInstance = await ToolsCoreInstance.newToolsCore(contextCallback, true, true)
    console.log("Analyze component with no error (WASM)\n")
    toolsCore.analyzeComponent(componentDefinitionNoError, "");
    console.log("\nAnalyze component with 1 error (WASM)\n")
    toolsCore.analyzeComponent(componentDefinitionWithError, "");
    console.log("\nAnalyze component with 1 warning (WASM)\n")
    toolsCore.analyzeComponent(componentDefinitionWithWarning, "");
    console.log("\n")

    const toolsCoreJS: ToolsCoreInstance = await ToolsCoreInstance.newToolsCore(contextCallback, false, false)
    console.log("Analyze component with no error (ASM.js)\n")
    toolsCoreJS.analyzeComponent(componentDefinitionNoError, "");
    console.log("\nAnalyze component with 1 error (ASM.js)\n")
    toolsCoreJS.analyzeComponent(componentDefinitionWithError, "");
    console.log("\nAnalyze component with 1 warning (ASM.js)\n")
    toolsCoreJS.analyzeComponent(componentDefinitionWithWarning, "");
    console.log("\n")
}

analyzeTestComponents()