"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const OptionalType_1 = require("../Type/OptionalType");
class OptionalTypeNodeParser {
    constructor(childNodeParser) {
        this.childNodeParser = childNodeParser;
    }
    supportsNode(node) {
        return node.kind === ts.SyntaxKind.OptionalType;
    }
    createType(node, context) {
        const type = this.childNodeParser.createType(node.type, context);
        if (!type) {
            return undefined;
        }
        return new OptionalType_1.OptionalType(type);
    }
}
exports.OptionalTypeNodeParser = OptionalTypeNodeParser;
//# sourceMappingURL=OptionalTypeNodeParser.js.map