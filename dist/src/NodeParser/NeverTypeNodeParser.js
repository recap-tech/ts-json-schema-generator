"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
class NeverTypeNodeParser {
    supportsNode(node) {
        return node.kind === ts.SyntaxKind.NeverKeyword;
    }
    createType(node, context) {
        return undefined;
    }
}
exports.NeverTypeNodeParser = NeverTypeNodeParser;
//# sourceMappingURL=NeverTypeNodeParser.js.map