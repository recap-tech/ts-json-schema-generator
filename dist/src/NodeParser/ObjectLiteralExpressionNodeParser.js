"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const nodeKey_1 = require("../Utils/nodeKey");
const ObjectType_1 = require("./../Type/ObjectType");
class ObjectLiteralExpressionNodeParser {
    constructor(childNodeParser) {
        this.childNodeParser = childNodeParser;
    }
    supportsNode(node) {
        return node.kind === ts.SyntaxKind.ObjectLiteralExpression;
    }
    createType(node, context) {
        if (node.properties) {
            const properties = node.properties.map((t) => new ObjectType_1.ObjectProperty(t.name.getText(), this.childNodeParser.createType(t.initializer, context), !t.questionToken));
            return new ObjectType_1.ObjectType(`object-${nodeKey_1.getKey(node, context)}`, [], properties, false);
        }
        return undefined;
    }
}
exports.ObjectLiteralExpressionNodeParser = ObjectLiteralExpressionNodeParser;
//# sourceMappingURL=ObjectLiteralExpressionNodeParser.js.map