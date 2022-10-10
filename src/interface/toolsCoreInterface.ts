export interface ToolsCoreContextCallback {
    isReady() : void;
    throw(what : string) : void;
    log(message : string) : void;
    error(line: number, column: number, message : string, source: string) : void;
    message(messageObject: MessageObject) : void;
}

export interface MessageObject {
    column?: number;
    fileName: string;
    line?: number;
    message: string;
    type: string;
}

export interface ToolsCoreInterface {
    getVersion() : string;
    analyzeComponent(componentDefinition: string, componentFilepath: string) : void;
}

