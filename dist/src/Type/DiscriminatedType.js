"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseType_1 = require("./BaseType");
class DiscriminatedType extends BaseType_1.BaseType {
    constructor(type, discriminatorName, discriminatorValue) {
        super();
        this.type = type;
        this.discriminatorName = discriminatorName;
        this.discriminatorValue = discriminatorValue;
    }
    getId() {
        return this.type.getId() + this.discriminatorName;
    }
    getType() {
        return this.type;
    }
    getDiscriminatorName() {
        return this.discriminatorName;
    }
    getDiscriminatorValue() {
        return this.discriminatorValue;
    }
}
exports.DiscriminatedType = DiscriminatedType;
//# sourceMappingURL=DiscriminatedType.js.map