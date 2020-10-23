"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.derefAnnotatedType = exports.derefType = void 0;
const AliasType_1 = require("../Type/AliasType");
const AnnotatedType_1 = require("../Type/AnnotatedType");
const DefinitionType_1 = require("../Type/DefinitionType");
const ReferenceType_1 = require("../Type/ReferenceType");
const DiscriminatedType_1 = require("../Type/DiscriminatedType");
function derefType(type) {
    if (type instanceof ReferenceType_1.ReferenceType ||
        type instanceof DefinitionType_1.DefinitionType ||
        type instanceof AliasType_1.AliasType ||
        type instanceof AnnotatedType_1.AnnotatedType ||
        type instanceof DiscriminatedType_1.DiscriminatedType) {
        return derefType(type.getType());
    }
    return type;
}
exports.derefType = derefType;
function derefAnnotatedType(type) {
    if (type instanceof AnnotatedType_1.AnnotatedType || type instanceof AliasType_1.AliasType || type instanceof DiscriminatedType_1.DiscriminatedType) {
        return derefAnnotatedType(type.getType());
    }
    return type;
}
exports.derefAnnotatedType = derefAnnotatedType;
//# sourceMappingURL=derefType.js.map