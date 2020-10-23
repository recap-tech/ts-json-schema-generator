"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnionNodeParser = void 0;
const typescript_1 = __importDefault(require("typescript"));
const UnionType_1 = require("../Type/UnionType");
const notUndefined_1 = require("../Utils/notUndefined");
const symbolAtNode_1 = require("../Utils/symbolAtNode");
const DiscriminatedType_1 = require("../Type/DiscriminatedType");
const getDiscriminator_1 = require("../Utils/getDiscriminator");
class UnionNodeParser {
    constructor(typeChecker, childNodeParser) {
        this.typeChecker = typeChecker;
        this.childNodeParser = childNodeParser;
    }
    supportsNode(node) {
        return node.kind === typescript_1.default.SyntaxKind.UnionType;
    }
    createType(node, context) {
        if (node.parent.kind === typescript_1.default.SyntaxKind.TypeAliasDeclaration) {
            const parentSymbol = symbolAtNode_1.symbolAtNode(node.parent);
            if (parentSymbol) {
                const discriminator = getDiscriminator_1.getDiscriminator(parentSymbol);
                if (discriminator) {
                    const discriminatedTypes = node.types.map((subNode) => {
                        var _a;
                        const subType = this.typeChecker.getTypeFromTypeNode(subNode);
                        const resolvedType = this.typeChecker.getTypeOfSymbolAtLocation(subType.getProperty(discriminator), node);
                        if (!resolvedType.isStringLiteral() && !resolvedType.isNumberLiteral()) {
                            throw new Error(`Union "${parentSymbol.name}" does not have a direct string or number property "${discriminator}" for union member ` +
                                `"${(_a = subType.aliasSymbol) === null || _a === void 0 ? void 0 : _a.name}"`);
                        }
                        return new DiscriminatedType_1.DiscriminatedType(this.childNodeParser.createType(subNode, context), discriminator, resolvedType.value);
                    });
                    return new UnionType_1.UnionType(discriminatedTypes);
                }
            }
        }
        const types = node.types
            .map((subnode) => {
            return this.childNodeParser.createType(subnode, context);
        })
            .filter(notUndefined_1.notUndefined);
        if (types.length === 1) {
            return types[0];
        }
        else if (types.length === 0) {
            return undefined;
        }
        return new UnionType_1.UnionType(types);
    }
}
exports.UnionNodeParser = UnionNodeParser;
//# sourceMappingURL=UnionNodeParser.js.map