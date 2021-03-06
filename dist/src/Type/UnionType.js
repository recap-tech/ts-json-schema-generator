"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnionType = void 0;
const BaseType_1 = require("./BaseType");
const uniqueTypeArray_1 = require("../Utils/uniqueTypeArray");
class UnionType extends BaseType_1.BaseType {
    constructor(types) {
        super();
        this.types = uniqueTypeArray_1.uniqueTypeArray(types.reduce((flatTypes, type) => {
            if (type instanceof UnionType) {
                flatTypes.push(...type.getTypes());
            }
            else if (type !== undefined) {
                flatTypes.push(type);
            }
            return flatTypes;
        }, []));
    }
    getId() {
        return "(" + this.types.map((type) => type.getId()).join("|") + ")";
    }
    getName() {
        return "(" + this.types.map((type) => type.getName()).join("|") + ")";
    }
    getTypes() {
        return this.types;
    }
    normalize() {
        if (this.types.length === 0) {
            return undefined;
        }
        else if (this.types.length === 1) {
            return this.types[0];
        }
        else {
            return this;
        }
    }
}
exports.UnionType = UnionType;
//# sourceMappingURL=UnionType.js.map