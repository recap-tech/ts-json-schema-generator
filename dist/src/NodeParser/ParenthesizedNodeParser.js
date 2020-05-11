"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
class ParenthesizedNodeParser {
    constructor(childNodeParser) {
        this.childNodeParser = childNodeParser;
    }
    supportsNode(node) {
        return node.kind === ts.SyntaxKind.ParenthesizedType;
    }
    createType(node, context) {
        const type = this.childNodeParser.createType(node.type, context);
        if (!type) {
            return undefined;
        }
        return type;
    }
}
exports.ParenthesizedNodeParser = ParenthesizedNodeParser;
//# sourceMappingURL=ParenthesizedNodeParser.js.map