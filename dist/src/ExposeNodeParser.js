"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const DefinitionType_1 = require("./Type/DefinitionType");
const symbolAtNode_1 = require("./Utils/symbolAtNode");
class ExposeNodeParser {
    constructor(typeChecker, subNodeParser, expose) {
        this.typeChecker = typeChecker;
        this.subNodeParser = subNodeParser;
        this.expose = expose;
    }
    supportsNode(node) {
        return this.subNodeParser.supportsNode(node);
    }
    createType(node, context, reference) {
        const baseType = this.subNodeParser.createType(node, context, reference);
        if (baseType === undefined) {
            return undefined;
        }
        if (!this.isExportNode(node)) {
            return baseType;
        }
        return new DefinitionType_1.DefinitionType(this.getDefinitionName(node, context), baseType);
    }
    isExportNode(node) {
        if (this.expose === "all") {
            return node.kind !== ts.SyntaxKind.TypeLiteral;
        }
        else if (this.expose === "none") {
            return false;
        }
        const localSymbol = node.localSymbol;
        return localSymbol ? "exportSymbol" in localSymbol : false;
    }
    getDefinitionName(node, context) {
        const symbol = symbolAtNode_1.symbolAtNode(node);
        const fullName = this.typeChecker.getFullyQualifiedName(symbol).replace(/^".*"\./, "");
        const argumentIds = context.getArguments().map((arg) => arg === null || arg === void 0 ? void 0 : arg.getName());
        return argumentIds.length ? `${fullName}<${argumentIds.join(",")}>` : fullName;
    }
}
exports.ExposeNodeParser = ExposeNodeParser;
//# sourceMappingURL=ExposeNodeParser.js.map