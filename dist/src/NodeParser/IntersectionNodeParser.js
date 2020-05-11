"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const IntersectionType_1 = require("../Type/IntersectionType");
const UnionType_1 = require("../Type/UnionType");
const derefType_1 = require("../Utils/derefType");
class IntersectionNodeParser {
    constructor(typeChecker, childNodeParser) {
        this.typeChecker = typeChecker;
        this.childNodeParser = childNodeParser;
    }
    supportsNode(node) {
        return node.kind === ts.SyntaxKind.IntersectionType;
    }
    createType(node, context) {
        const types = node.types.map((subnode) => this.childNodeParser.createType(subnode, context));
        if (types.filter((t) => t === undefined).length) {
            return undefined;
        }
        return this.translate(new IntersectionType_1.IntersectionType(types));
    }
    translate(intersection) {
        const unions = intersection.getTypes().map((type) => {
            const derefed = derefType_1.derefType(type);
            return derefed instanceof UnionType_1.UnionType ? derefed.getTypes() : [type];
        });
        const result = [];
        function process(i, types = []) {
            for (const type of unions[i]) {
                const currentTypes = [...types, type];
                if (i < unions.length - 1) {
                    process(i + 1, currentTypes);
                }
                else {
                    result.push(new IntersectionType_1.IntersectionType(currentTypes));
                }
            }
        }
        process(0);
        return result.length > 1 ? new UnionType_1.UnionType(result) : intersection;
    }
}
exports.IntersectionNodeParser = IntersectionNodeParser;
//# sourceMappingURL=IntersectionNodeParser.js.map