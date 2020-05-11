"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const intersectionOfArrays_1 = require("./intersectionOfArrays");
function deepMerge(a, b) {
    const output = Object.assign(Object.assign({}, a), b);
    for (const key in a) {
        if (b.hasOwnProperty(key)) {
            const elementA = a[key];
            const elementB = b[key];
            if (elementA != null &&
                elementB != null &&
                typeof elementA === "object" &&
                typeof elementB === "object" &&
                "type" in elementA &&
                "type" in elementB) {
                if (elementA.type == elementB.type) {
                    if (elementA.enum == null && elementB.enum != null) {
                        output[key].enum = elementB.enum;
                    }
                    else if (elementA.enum != null && elementB.enum == null) {
                        output[key].enum = elementA.enum;
                    }
                    else if (elementA.enum != null && elementB.enum != null) {
                        output[key].enum = intersectionOfArrays_1.intersectionOfArrays(elementA.enum, elementB.enum);
                    }
                }
            }
        }
    }
    return output;
}
exports.deepMerge = deepMerge;
//# sourceMappingURL=deepMerge.js.map