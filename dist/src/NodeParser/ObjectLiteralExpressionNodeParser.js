"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectLiteralExpressionNodeParser = void 0;
const typescript_1 = __importDefault(require("typescript"));
const nodeKey_1 = require("../Utils/nodeKey");
const ObjectType_1 = require("./../Type/ObjectType");
class ObjectLiteralExpressionNodeParser {
    constructor(typeChecker, childNodeParser) {
        this.typeChecker = typeChecker;
        this.childNodeParser = childNodeParser;
    }
    supportsNode(node) {
        return node.kind === typescript_1.default.SyntaxKind.ObjectLiteralExpression;
    }
    createType(node, context) {
        if (node.properties) {
            const properties = node.properties.map((t) => {
                return new ObjectType_1.ObjectProperty(typescript_1.default.isComputedPropertyName(t.name)
                    ? this.typeChecker.getSymbolAtLocation(t.name).getName()
                    : t.name.getText(), this.childNodeParser.createType(t.initializer, context), !t.questionToken);
            });
            return new ObjectType_1.ObjectType(`object-${nodeKey_1.getKey(node, context)}`, [], properties, false);
        }
        return undefined;
    }
}
exports.ObjectLiteralExpressionNodeParser = ObjectLiteralExpressionNodeParser;
//# sourceMappingURL=ObjectLiteralExpressionNodeParser.js.map