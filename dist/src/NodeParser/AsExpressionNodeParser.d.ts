import { NodeParser } from "./../NodeParser";
import * as ts from "typescript";
import { Context } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { BaseType } from "../Type/BaseType";
export declare class AsExpressionNodeParser implements SubNodeParser {
    private childNodeParser;
    constructor(childNodeParser: NodeParser);
    supportsNode(node: ts.AsExpression): boolean;
    createType(node: ts.AsExpression, context: Context): BaseType | undefined;
}
