"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isHidden_1 = require("../Utils/isHidden");
const symbolAtNode_1 = require("../Utils/symbolAtNode");
class HiddenNodeParser {
    constructor(typeChecker) {
        this.typeChecker = typeChecker;
    }
    supportsNode(node) {
        const symbol = symbolAtNode_1.symbolAtNode(node);
        if (symbol) {
            return isHidden_1.isHidden(symbol);
        }
        return false;
    }
    createType(node, context) {
        return undefined;
    }
}
exports.HiddenNodeParser = HiddenNodeParser;
//# sourceMappingURL=HiddenTypeNodeParser.js.map