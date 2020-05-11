"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const TupleType_1 = require("../Type/TupleType");
const notUndefined_1 = require("../Utils/notUndefined");
class TupleNodeParser {
    constructor(typeChecker, childNodeParser) {
        this.typeChecker = typeChecker;
        this.childNodeParser = childNodeParser;
    }
    supportsNode(node) {
        return node.kind === ts.SyntaxKind.TupleType;
    }
    createType(node, context) {
        return new TupleType_1.TupleType(node.elementTypes
            .map((item) => {
            return this.childNodeParser.createType(item, context);
        })
            .filter(notUndefined_1.notUndefined));
    }
}
exports.TupleNodeParser = TupleNodeParser;
//# sourceMappingURL=TupleNodeParser.js.map