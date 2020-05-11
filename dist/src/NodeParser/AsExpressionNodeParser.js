"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
class AsExpressionNodeParser {
    constructor(childNodeParser) {
        this.childNodeParser = childNodeParser;
    }
    supportsNode(node) {
        return node.kind === ts.SyntaxKind.AsExpression;
    }
    createType(node, context) {
        return this.childNodeParser.createType(node.expression, context);
    }
}
exports.AsExpressionNodeParser = AsExpressionNodeParser;
//# sourceMappingURL=AsExpressionNodeParser.js.map