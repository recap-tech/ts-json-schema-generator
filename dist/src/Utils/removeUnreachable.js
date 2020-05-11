"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
function addReachable(definition, definitions, reachable) {
    if (util_1.isBoolean(definition)) {
        return;
    }
    if (definition.$ref) {
        const typeName = decodeURIComponent(definition.$ref.slice(14));
        if (reachable.has(typeName)) {
            return;
        }
        reachable.add(typeName);
        addReachable(definitions[typeName], definitions, reachable);
    }
    else if (definition.anyOf) {
        for (const def of definition.anyOf) {
            addReachable(def, definitions, reachable);
        }
    }
    else if (definition.allOf) {
        for (const def of definition.allOf) {
            addReachable(def, definitions, reachable);
        }
    }
    else if (definition.oneOf) {
        for (const def of definition.oneOf) {
            addReachable(def, definitions, reachable);
        }
    }
    else if (definition.not) {
        addReachable(definition.not, definitions, reachable);
    }
    else if (definition.if) {
        addReachable(definition.if, definitions, reachable);
        if (definition.then) {
            addReachable(definition.then, definitions, reachable);
        }
        if (definition.else) {
            addReachable(definition.else, definitions, reachable);
        }
    }
    else if (definition.type === "object") {
        for (const prop in definition.properties || {}) {
            const propDefinition = definition.properties[prop];
            addReachable(propDefinition, definitions, reachable);
        }
        const additionalProperties = definition.additionalProperties;
        if (additionalProperties) {
            addReachable(additionalProperties, definitions, reachable);
        }
    }
    else if (definition.type === "array") {
        const items = definition.items;
        if (util_1.isArray(items)) {
            for (const item of items) {
                addReachable(item, definitions, reachable);
            }
        }
        else if (items) {
            addReachable(items, definitions, reachable);
        }
    }
}
function removeUnreachable(rootTypeDefinition, definitions) {
    if (!rootTypeDefinition) {
        return definitions;
    }
    const reachable = new Set();
    addReachable(rootTypeDefinition, definitions, reachable);
    const out = {};
    for (const def of reachable) {
        out[def] = definitions[def];
    }
    return out;
}
exports.removeUnreachable = removeUnreachable;
//# sourceMappingURL=removeUnreachable.js.map