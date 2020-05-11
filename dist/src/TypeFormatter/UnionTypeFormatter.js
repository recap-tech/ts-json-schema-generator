"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnionType_1 = require("../Type/UnionType");
const uniqueArray_1 = require("../Utils/uniqueArray");
const DiscriminatedType_1 = require("../Type/DiscriminatedType");
class UnionTypeFormatter {
    constructor(childTypeFormatter) {
        this.childTypeFormatter = childTypeFormatter;
    }
    supportsType(type) {
        return type instanceof UnionType_1.UnionType;
    }
    getDefinition(type) {
        const definitions = type.getTypes().map((item) => this.childTypeFormatter.getDefinition(item));
        if (type.getTypes().some((childType) => childType instanceof DiscriminatedType_1.DiscriminatedType)) {
            const discriminatedTypes = type.getTypes();
            const discriminatorPropertyName = discriminatedTypes[0].getDiscriminatorName();
            return {
                allOf: [
                    {
                        type: "object",
                        properties: {
                            [discriminatorPropertyName]: {
                                type: "string",
                                enum: discriminatedTypes.map((discriminatedType) => discriminatedType.getDiscriminatorValue()),
                            },
                        },
                        required: [discriminatorPropertyName],
                    },
                    ...discriminatedTypes.map((childType) => this.childTypeFormatter.getDefinition(childType)),
                ],
            };
        }
        let stringType = true;
        let oneNotEnum = false;
        for (const def of definitions) {
            if (def.type !== "string") {
                stringType = false;
                break;
            }
            if (def.enum === undefined) {
                oneNotEnum = true;
            }
        }
        if (stringType && oneNotEnum) {
            return {
                type: "string",
            };
        }
        const flattenedDefinitions = [];
        for (const def of definitions) {
            if (Object.keys(def) === ["anyOf"]) {
                flattenedDefinitions.push(...def.anyOf);
            }
            else {
                flattenedDefinitions.push(def);
            }
        }
        return flattenedDefinitions.length > 1
            ? {
                anyOf: flattenedDefinitions,
            }
            : flattenedDefinitions[0];
    }
    getChildren(type) {
        return uniqueArray_1.uniqueArray(type
            .getTypes()
            .reduce((result, item) => [...result, ...this.childTypeFormatter.getChildren(item)], []));
    }
}
exports.UnionTypeFormatter = UnionTypeFormatter;
//# sourceMappingURL=UnionTypeFormatter.js.map