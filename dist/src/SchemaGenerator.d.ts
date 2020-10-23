import ts from "typescript";
import { NodeParser } from "./NodeParser";
import { Schema } from "./Schema/Schema";
import { TypeFormatter } from "./TypeFormatter";
import { Config } from "./Config";
export declare class SchemaGenerator {
    private readonly program;
    private readonly nodeParser;
    private readonly typeFormatter;
    private readonly config?;
    constructor(program: ts.Program, nodeParser: NodeParser, typeFormatter: TypeFormatter, config?: Config | undefined);
    createSchema(fullName?: string): Schema;
    createSchemaFromNodes(rootNodes: ts.Node[]): Schema;
    private getRootNodes;
    private findNamedNode;
    private getRootTypeDefinition;
    private appendRootChildDefinitions;
    private partitionFiles;
    private appendTypes;
    private inspectNode;
    private isExportType;
    private isGenericType;
    private getFullName;
}
