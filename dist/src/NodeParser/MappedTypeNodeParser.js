"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const LogicError_1 = require("../Error/LogicError");
const NodeParser_1 = require("../NodeParser");
const ArrayType_1 = require("../Type/ArrayType");
const EnumType_1 = require("../Type/EnumType");
const LiteralType_1 = require("../Type/LiteralType");
const NumberType_1 = require("../Type/NumberType");
const ObjectType_1 = require("../Type/ObjectType");
const StringType_1 = require("../Type/StringType");
const UnionType_1 = require("../Type/UnionType");
const derefType_1 = require("../Utils/derefType");
const nodeKey_1 = require("../Utils/nodeKey");
const preserveAnnotation_1 = require("../Utils/preserveAnnotation");
const removeUndefined_1 = require("../Utils/removeUndefined");
const notUndefined_1 = require("../Utils/notUndefined");
class MappedTypeNodeParser {
    constructor(childNodeParser) {
        this.childNodeParser = childNodeParser;
    }
    supportsNode(node) {
        return node.kind === ts.SyntaxKind.MappedType;
    }
    createType(node, context) {
        const constraintType = this.childNodeParser.createType(node.typeParameter.constraint, context);
        const keyListType = derefType_1.derefType(constraintType);
        const id = `indexed-type-${nodeKey_1.getKey(node, context)}`;
        if (keyListType instanceof UnionType_1.UnionType) {
            return new ObjectType_1.ObjectType(id, [], this.getProperties(node, keyListType, context), this.getAdditionalProperties(node, keyListType, context));
        }
        else if (keyListType instanceof LiteralType_1.LiteralType) {
            return new ObjectType_1.ObjectType(id, [], this.getProperties(node, new UnionType_1.UnionType([keyListType]), context), false);
        }
        else if (keyListType instanceof StringType_1.StringType) {
            const type = this.childNodeParser.createType(node.type, context);
            return type === undefined ? undefined : new ObjectType_1.ObjectType(id, [], [], type);
        }
        else if (keyListType instanceof NumberType_1.NumberType) {
            const type = this.childNodeParser.createType(node.type, this.createSubContext(node, keyListType, context));
            return type === undefined ? undefined : new ArrayType_1.ArrayType(type);
        }
        else if (keyListType instanceof EnumType_1.EnumType) {
            return new ObjectType_1.ObjectType(id, [], this.getValues(node, keyListType, context), false);
        }
        else {
            throw new LogicError_1.LogicError(`Unexpected key type "${constraintType ? constraintType.getId() : constraintType}" for type "${node.getText()}" (expected "UnionType" or "StringType")`);
        }
    }
    getProperties(node, keyListType, context) {
        return keyListType
            .getTypes()
            .filter((type) => type instanceof LiteralType_1.LiteralType)
            .reduce((result, key) => {
            const propertyType = this.childNodeParser.createType(node.type, this.createSubContext(node, key, context));
            if (propertyType === undefined) {
                return result;
            }
            let newType = derefType_1.derefAnnotatedType(propertyType);
            let hasUndefined = false;
            if (newType instanceof UnionType_1.UnionType) {
                const { newType: newType_, numRemoved } = removeUndefined_1.removeUndefined(newType);
                hasUndefined = numRemoved > 0;
                newType = newType_;
            }
            const objectProperty = new ObjectType_1.ObjectProperty(key.getValue().toString(), preserveAnnotation_1.preserveAnnotation(propertyType, newType), !node.questionToken && !hasUndefined);
            result.push(objectProperty);
            return result;
        }, []);
    }
    getValues(node, keyListType, context) {
        return keyListType
            .getValues()
            .filter((value) => !!value)
            .map((value) => {
            const type = this.childNodeParser.createType(node.type, this.createSubContext(node, new LiteralType_1.LiteralType(value), context));
            if (type === undefined) {
                return undefined;
            }
            return new ObjectType_1.ObjectProperty(value.toString(), type, !node.questionToken);
        })
            .filter(notUndefined_1.notUndefined);
    }
    getAdditionalProperties(node, keyListType, context) {
        var _a;
        const key = keyListType.getTypes().filter((type) => !(type instanceof LiteralType_1.LiteralType))[0];
        if (key) {
            return (_a = this.childNodeParser.createType(node.type, this.createSubContext(node, key, context))) !== null && _a !== void 0 ? _a : false;
        }
        else {
            return false;
        }
    }
    createSubContext(node, key, parentContext) {
        const subContext = new NodeParser_1.Context(node);
        parentContext.getParameters().forEach((parentParameter) => {
            subContext.pushParameter(parentParameter);
            subContext.pushArgument(parentContext.getArgument(parentParameter));
        });
        subContext.pushParameter(node.typeParameter.name.text);
        subContext.pushArgument(key);
        return subContext;
    }
}
exports.MappedTypeNodeParser = MappedTypeNodeParser;
//# sourceMappingURL=MappedTypeNodeParser.js.map