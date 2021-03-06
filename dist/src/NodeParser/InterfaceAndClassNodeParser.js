"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterfaceAndClassNodeParser = void 0;
const typescript_1 = __importDefault(require("typescript"));
const ArrayType_1 = require("../Type/ArrayType");
const ObjectType_1 = require("../Type/ObjectType");
const isHidden_1 = require("../Utils/isHidden");
const modifiers_1 = require("../Utils/modifiers");
const nodeKey_1 = require("../Utils/nodeKey");
const notUndefined_1 = require("../Utils/notUndefined");
class InterfaceAndClassNodeParser {
    constructor(typeChecker, childNodeParser, additionalProperties) {
        this.typeChecker = typeChecker;
        this.childNodeParser = childNodeParser;
        this.additionalProperties = additionalProperties;
    }
    supportsNode(node) {
        return node.kind === typescript_1.default.SyntaxKind.InterfaceDeclaration || node.kind === typescript_1.default.SyntaxKind.ClassDeclaration;
    }
    createType(node, context, reference) {
        var _a;
        if ((_a = node.typeParameters) === null || _a === void 0 ? void 0 : _a.length) {
            node.typeParameters.forEach((typeParam) => {
                const nameSymbol = this.typeChecker.getSymbolAtLocation(typeParam.name);
                context.pushParameter(nameSymbol.name);
                if (typeParam.default) {
                    const type = this.childNodeParser.createType(typeParam.default, context);
                    context.setDefault(nameSymbol.name, type);
                }
            });
        }
        const id = this.getTypeId(node, context);
        if (reference) {
            reference.setId(id);
            reference.setName(id);
        }
        const properties = this.getProperties(node, context);
        if (properties === undefined) {
            return undefined;
        }
        const additionalProperties = this.getAdditionalProperties(node, context);
        if (properties.length === 0 && additionalProperties === false) {
            const arrayItemType = this.getArrayItemType(node);
            if (arrayItemType) {
                const type = this.childNodeParser.createType(arrayItemType, context);
                if (type === undefined) {
                    return undefined;
                }
                return new ArrayType_1.ArrayType(type);
            }
        }
        return new ObjectType_1.ObjectType(id, this.getBaseTypes(node, context), properties, additionalProperties);
    }
    getArrayItemType(node) {
        if (node.heritageClauses && node.heritageClauses.length === 1) {
            const clause = node.heritageClauses[0];
            if (clause.types.length === 1) {
                const type = clause.types[0];
                const symbol = this.typeChecker.getSymbolAtLocation(type.expression);
                if (symbol && (symbol.name === "Array" || symbol.name === "ReadonlyArray")) {
                    const typeArguments = type.typeArguments;
                    if ((typeArguments === null || typeArguments === void 0 ? void 0 : typeArguments.length) === 1) {
                        return typeArguments[0];
                    }
                }
            }
        }
        return null;
    }
    getBaseTypes(node, context) {
        if (!node.heritageClauses) {
            return [];
        }
        return node.heritageClauses.reduce((result, baseType) => [
            ...result,
            ...baseType.types
                .map((expression) => this.childNodeParser.createType(expression, context))
                .filter(notUndefined_1.notUndefined),
        ], []);
    }
    getProperties(node, context) {
        let hasRequiredNever = false;
        const properties = node.members
            .reduce((members, member) => {
            if (typescript_1.default.isConstructorDeclaration(member)) {
                const params = member.parameters.filter((param) => typescript_1.default.isParameterPropertyDeclaration(param, param.parent));
                members.push(...params);
            }
            else if (typescript_1.default.isPropertySignature(member) || typescript_1.default.isPropertyDeclaration(member)) {
                members.push(member);
            }
            return members;
        }, [])
            .filter((member) => modifiers_1.isPublic(member) && !modifiers_1.isStatic(member) && member.type && !isHidden_1.isNodeHidden(member))
            .map((member) => new ObjectType_1.ObjectProperty(typescript_1.default.isComputedPropertyName(member.name)
            ? this.typeChecker.getSymbolAtLocation(member.name).getName()
            : member.name.getText(), this.childNodeParser.createType(member.type, context), !member.questionToken))
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
        const indexSignature = node.members.find(typescript_1.default.isIndexSignatureDeclaration);
        if (!indexSignature) {
            return this.additionalProperties;
        }
        return (_a = this.childNodeParser.createType(indexSignature.type, context)) !== null && _a !== void 0 ? _a : this.additionalProperties;
    }
    getTypeId(node, context) {
        const nodeType = typescript_1.default.isInterfaceDeclaration(node) ? "interface" : "class";
        return `${nodeType}-${nodeKey_1.getKey(node, context)}`;
    }
}
exports.InterfaceAndClassNodeParser = InterfaceAndClassNodeParser;
//# sourceMappingURL=InterfaceAndClassNodeParser.js.map