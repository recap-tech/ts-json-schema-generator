"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = exports.IntersectionNodeParser = void 0;
const typescript_1 = __importDefault(require("typescript"));
const IntersectionType_1 = require("../Type/IntersectionType");
const PrimitiveType_1 = require("../Type/PrimitiveType");
const UnionType_1 = require("../Type/UnionType");
const derefType_1 = require("../Utils/derefType");
const uniqueTypeArray_1 = require("../Utils/uniqueTypeArray");
const UndefinedType_1 = require("./../Type/UndefinedType");
class IntersectionNodeParser {
    constructor(typeChecker, childNodeParser) {
        this.typeChecker = typeChecker;
        this.childNodeParser = childNodeParser;
    }
    supportsNode(node) {
        return node.kind === typescript_1.default.SyntaxKind.IntersectionType;
    }
    createType(node, context) {
        const types = node.types.map((subnode) => this.childNodeParser.createType(subnode, context));
        if (types.filter((t) => t === undefined).length) {
            return undefined;
        }
        return translate(types);
    }
}
exports.IntersectionNodeParser = IntersectionNodeParser;
function translate(types) {
    types = uniqueTypeArray_1.uniqueTypeArray(types);
    if (types.length == 1) {
        return types[0];
    }
    const unions = types.map((type) => {
        const derefed = derefType_1.derefType(type);
        return derefed instanceof UnionType_1.UnionType ? derefed.getTypes() : [type];
    });
    const result = [];
    function process(i, t = []) {
        for (const type of unions[i]) {
            let currentTypes = [...t, type];
            if (i < unions.length - 1) {
                process(i + 1, currentTypes);
            }
            else {
                currentTypes = uniqueTypeArray_1.uniqueTypeArray(currentTypes);
                if (currentTypes.some((c) => c instanceof UndefinedType_1.UndefinedType)) {
                    result.push(new UndefinedType_1.UndefinedType());
                }
                else {
                    const primitives = currentTypes.filter((c) => c instanceof PrimitiveType_1.PrimitiveType);
                    if (primitives.length === 1) {
                        result.push(primitives[0]);
                    }
                    else if (primitives.length > 1) {
                    }
                    else if (currentTypes.length === 1) {
                        result.push(currentTypes[0]);
                    }
                    else {
                        result.push(new IntersectionType_1.IntersectionType(currentTypes));
                    }
                }
            }
        }
    }
    process(0);
    if (result.length === 1) {
        return result[0];
    }
    else if (result.length > 1) {
        return new UnionType_1.UnionType(result);
    }
    return undefined;
}
exports.translate = translate;
//# sourceMappingURL=IntersectionNodeParser.js.map