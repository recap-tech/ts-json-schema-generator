import { NodeParser } from "./../NodeParser";
import ts from "typescript";
import { Context } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { BaseType } from "../Type/BaseType";
export declare class ObjectLiteralExpressionNodeParser implements SubNodeParser {
    private typeChecker;
    private childNodeParser;
    constructor(typeChecker: ts.TypeChecker, childNodeParser: NodeParser);
    supportsNode(node: ts.ObjectLiteralExpression): boolean;
    createType(node: ts.ObjectLiteralExpression, context: Context): BaseType | undefined;
}
