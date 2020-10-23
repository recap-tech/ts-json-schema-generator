"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiscriminator = void 0;
function getDiscriminator(symbol) {
    const jsDocTags = symbol.getJsDocTags();
    if (!jsDocTags || !jsDocTags.length) {
        return;
    }
    const jsDocTag = jsDocTags.find((tag) => tag.name === "discriminator");
    if (!jsDocTag || !jsDocTag.text) {
        return;
    }
    return jsDocTag.text;
}
exports.getDiscriminator = getDiscriminator;
//# sourceMappingURL=getDiscriminator.js.map