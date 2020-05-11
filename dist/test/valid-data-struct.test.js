"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
describe("valid-data-struct", () => {
    it("simple-object", utils_1.assertValidSchema("simple-object", "SimpleObject"));
    it("object-literal-expression", utils_1.assertValidSchema("object-literal-expression", "MyType"));
    it("literal-object-type", utils_1.assertValidSchema("literal-object-type", "MyType"));
    it("literal-array-type", utils_1.assertValidSchema("literal-array-type", "MyType"));
    it("literal-index-type", utils_1.assertValidSchema("literal-index-type", "MyType"));
    it("interface-single", utils_1.assertValidSchema("interface-single", "MyObject"));
    it("interface-multi", utils_1.assertValidSchema("interface-multi", "MyObject"));
    it("interface-recursion", utils_1.assertValidSchema("interface-recursion", "MyObject"));
    it("interface-extra-props", utils_1.assertValidSchema("interface-extra-props", "MyObject"));
    it("interface-extended-extra-props", utils_1.assertValidSchema("interface-extended-extra-props", "MyObject"));
    it("interface-array", utils_1.assertValidSchema("interface-array", "TagArray"));
    it("interface-property-dash", utils_1.assertValidSchema("interface-property-dash", "MyObject"));
    it("class-single", utils_1.assertValidSchema("class-single", "MyObject"));
    it("class-multi", utils_1.assertValidSchema("class-multi", "MyObject"));
    it("class-recursion", utils_1.assertValidSchema("class-recursion", "MyObject"));
    it("class-extra-props", utils_1.assertValidSchema("class-extra-props", "MyObject"));
    it("class-inheritance", utils_1.assertValidSchema("class-inheritance", "MyObject"));
    it("class-generics", utils_1.assertValidSchema("class-generics", "MyObject"));
    it("class-jsdoc", utils_1.assertValidSchema("class-jsdoc", "MyObject", "extended"));
    it("structure-private", utils_1.assertValidSchema("structure-private", "MyObject"));
    it("structure-anonymous", utils_1.assertValidSchema("structure-anonymous", "MyObject"));
    it("structure-recursion", utils_1.assertValidSchema("structure-recursion", "MyObject"));
    it("structure-extra-props", utils_1.assertValidSchema("structure-extra-props", "MyObject"));
});
//# sourceMappingURL=valid-data-struct.test.js.map