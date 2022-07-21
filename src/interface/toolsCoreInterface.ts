export interface ToolsCoreContextCallback {
    isReady() : void
    throw(what : string) : void
    log(message : string) : void
    error(line: number, column: number, message : string, source: string) : void
}

export interface ToolsCoreInterface {
    analyzeComponent(componentDefinition: string, componentFilepath : string) : void
}
