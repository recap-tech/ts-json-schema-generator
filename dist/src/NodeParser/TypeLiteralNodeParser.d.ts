import ts from "typescript";
import { Context, NodeParser } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { BaseType } from "../Type/BaseType";
import { ReferenceType } from "../Type/ReferenceType";
export declare class TypeLiteralNodeParser implements SubNodeParser {
    private typeChecker;
    private childNodeParser;
    private readonly additionalProperties;
    constructor(typeChecker: ts.TypeChecker, childNodeParser: NodeParser, additionalProperties: boolean);
    supportsNode(node: ts.TypeLiteralNode): boolean;
    createType(node: ts.TypeLiteralNode, context: Context, reference?: ReferenceType): BaseType | undefined;
    private getProperties;
    private getAdditionalProperties;
    private getTypeId;
}
