"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscriminatedTypeFormatter = void 0;
const DiscriminatedType_1 = require("../Type/DiscriminatedType");
class DiscriminatedTypeFormatter {
    constructor(childTypeFormatter) {
        this.childTypeFormatter = childTypeFormatter;
    }
    supportsType(type) {
        return type instanceof DiscriminatedType_1.DiscriminatedType;
    }
    getDefinition(type) {
        return {
            if: {
                properties: {
                    [type.getDiscriminatorName()]: {
                        const: type.getDiscriminatorValue(),
                    },
                },
            },
            then: this.childTypeFormatter.getDefinition(type.getType()),
        };
    }
    getChildren(type) {
        return this.childTypeFormatter.getChildren(type.getType());
    }
}
exports.DiscriminatedTypeFormatter = DiscriminatedTypeFormatter;
//# sourceMappingURL=DiscriminatedTypeFormatter.js.map