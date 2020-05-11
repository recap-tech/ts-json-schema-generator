"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbolAtNode_1 = require("./symbolAtNode");
function isHidden(symbol) {
    const jsDocTags = symbol.getJsDocTags();
    if (!jsDocTags || !jsDocTags.length) {
        return false;
    }
    const jsDocTag = jsDocTags.find((tag) => tag.name === "hidden");
    return !!jsDocTag;
}
exports.isHidden = isHidden;
function isNodeHidden(node) {
    const symbol = symbolAtNode_1.symbolAtNode(node);
    if (!symbol) {
        return null;
    }
    return isHidden(symbol);
}
exports.isNodeHidden = isNodeHidden;
//# sourceMappingURL=isHidden.js.map