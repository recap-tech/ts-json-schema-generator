"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicAnnotationsReader = void 0;
const symbolAtNode_1 = require("../Utils/symbolAtNode");
class BasicAnnotationsReader {
    constructor(extraTags) {
        this.extraTags = extraTags;
    }
    getAnnotations(node) {
        const symbol = symbolAtNode_1.symbolAtNode(node);
        if (!symbol) {
            return undefined;
        }
        const jsDocTags = symbol.getJsDocTags();
        if (!jsDocTags || !jsDocTags.length) {
            return undefined;
        }
        const annotations = jsDocTags.reduce((result, jsDocTag) => {
            const value = this.parseJsDocTag(jsDocTag);
            if (value !== undefined) {
                result[jsDocTag.name] = value;
            }
            return result;
        }, {});
        return Object.keys(annotations).length ? annotations : undefined;
    }
    parseJsDocTag(jsDocTag) {
        var _a, _b;
        if (!jsDocTag.text) {
            return undefined;
        }
        if (BasicAnnotationsReader.textTags.has(jsDocTag.name)) {
            return jsDocTag.text;
        }
        else if (BasicAnnotationsReader.jsonTags.has(jsDocTag.name)) {
            return this.parseJson(jsDocTag.text);
        }
        else if ((_a = this.extraTags) === null || _a === void 0 ? void 0 : _a.has(jsDocTag.name)) {
            return (_b = this.parseJson(jsDocTag.text)) !== null && _b !== void 0 ? _b : jsDocTag.text;
        }
        else {
            return undefined;
        }
    }
    parseJson(value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return undefined;
        }
    }
}
exports.BasicAnnotationsReader = BasicAnnotationsReader;
BasicAnnotationsReader.textTags = new Set([
    "title",
    "description",
    "format",
    "pattern",
    "$comment",
    "contentMediaType",
    "contentEncoding",
]);
BasicAnnotationsReader.jsonTags = new Set([
    "minimum",
    "exclusiveMinimum",
    "maximum",
    "exclusiveMaximum",
    "multipleOf",
    "minLength",
    "maxLength",
    "minProperties",
    "maxProperties",
    "minItems",
    "maxItems",
    "uniqueItems",
    "propertyNames",
    "contains",
    "const",
    "examples",
    "default",
    "if",
    "then",
    "else",
    "readOnly",
    "writeOnly",
]);
//# sourceMappingURL=BasicAnnotationsReader.js.map