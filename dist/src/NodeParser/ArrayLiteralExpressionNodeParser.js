"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const notUndefined_1 = require("../Utils/notUndefined");
const ArrayType_1 = require("./../Type/ArrayType");
const UnionType_1 = require("./../Type/UnionType");
class ArrayLiteralExpressionNodeParser {
    constructor(childNodeParser) {
        this.childNodeParser = childNodeParser;
    }
    supportsNode(node) {
        return node.kind === ts.SyntaxKind.ArrayLiteralExpression;
    }
    createType(node, context) {
        if (node.elements) {
            const elements = node.elements.map((t) => this.childNodeParser.createType(t, context)).filter(notUndefined_1.notUndefined);
            return new ArrayType_1.ArrayType(new UnionType_1.UnionType(elements));
        }
        return undefined;
    }
}
exports.ArrayLiteralExpressionNodeParser = ArrayLiteralExpressionNodeParser;
//# sourceMappingURL=ArrayLiteralExpressionNodeParser.js.map