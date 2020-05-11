"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const ObjectType_1 = require("../Type/ObjectType");
const isHidden_1 = require("../Utils/isHidden");
const nodeKey_1 = require("../Utils/nodeKey");
class TypeLiteralNodeParser {
    constructor(childNodeParser) {
        this.childNodeParser = childNodeParser;
    }
    supportsNode(node) {
        return node.kind === ts.SyntaxKind.TypeLiteral;
    }
    createType(node, context, reference) {
        const id = this.getTypeId(node, context);
        if (reference) {
            reference.setId(id);
            reference.setName(id);
        }
        const properties = this.getProperties(node, context);
        if (properties === undefined) {
            return undefined;
        }
        return new ObjectType_1.ObjectType(id, [], properties, this.getAdditionalProperties(node, context));
    }
    getProperties(node, context) {
        let hasRequiredNever = false;
        const properties = node.members
            .filter(ts.isPropertySignature)
            .filter((propertyNode) => !isHidden_1.isNodeHidden(propertyNode))
            .map((propertyNode) => {
            const propertySymbol = propertyNode.symbol;
            const type = this.childNodeParser.createType(propertyNode.type, context);
            const objectProperty = new ObjectType_1.ObjectProperty(propertySymbol.getName(), type, !propertyNode.questionToken);
            return objectProperty;
        })
            .filter((prop) => {
            if (prop.isRequired() && prop.getType() === undefined) {
                hasRequiredNever = true;
            }
            return prop.getType() !== undefined;
        });
        if (hasRequiredNever) {
            return undefined;
        }
        return properties;
    }
    getAdditionalProperties(node, context) {
        var _a;
        const indexSignature = node.members.find(ts.isIndexSignatureDeclaration);
        if (!indexSignature) {
            return false;
        }
        return (_a = this.childNodeParser.createType(indexSignature.type, context)) !== null && _a !== void 0 ? _a : false;
    }
    getTypeId(node, context) {
        return `structure-${nodeKey_1.getKey(node, context)}`;
    }
}
exports.TypeLiteralNodeParser = TypeLiteralNodeParser;
//# sourceMappingURL=TypeLiteralNodeParser.js.map