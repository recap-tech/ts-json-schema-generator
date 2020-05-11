"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
describe("valid-data-other", () => {
    it("enums-string", utils_1.assertValidSchema("enums-string", "Enum"));
    it("enums-number", utils_1.assertValidSchema("enums-number", "Enum"));
    it("enums-initialized", utils_1.assertValidSchema("enums-initialized", "Enum"));
    it("enums-compute", utils_1.assertValidSchema("enums-compute", "Enum"));
    it("enums-mixed", utils_1.assertValidSchema("enums-mixed", "Enum"));
    it("enums-member", utils_1.assertValidSchema("enums-member", "MyObject"));
    it("string-literals", utils_1.assertValidSchema("string-literals", "MyObject"));
    it("string-literals-inline", utils_1.assertValidSchema("string-literals-inline", "MyObject"));
    it("string-literals-null", utils_1.assertValidSchema("string-literals-null", "MyObject"));
    it("namespace-deep-1", utils_1.assertValidSchema("namespace-deep-1", "RootNamespace.Def"));
    it("namespace-deep-2", utils_1.assertValidSchema("namespace-deep-2", "RootNamespace.SubNamespace.HelperA"));
    it("namespace-deep-3", utils_1.assertValidSchema("namespace-deep-3", "RootNamespace.SubNamespace.HelperB"));
    it("import-simple", utils_1.assertValidSchema("import-simple", "MyObject"));
    it("import-exposed", utils_1.assertValidSchema("import-exposed", "MyObject"));
    it("import-anonymous", utils_1.assertValidSchema("import-anonymous", "MyObject"));
    it("generic-simple", utils_1.assertValidSchema("generic-simple", "MyObject"));
    it("generic-arrays", utils_1.assertValidSchema("generic-arrays", "MyObject"));
    it("generic-multiple", utils_1.assertValidSchema("generic-multiple", "MyObject"));
    it("generic-multiargs", utils_1.assertValidSchema("generic-multiargs", "MyObject"));
    it("generic-anonymous", utils_1.assertValidSchema("generic-anonymous", "MyObject"));
    it("generic-recursive", utils_1.assertValidSchema("generic-recursive", "MyObject"));
    it("generic-hell", utils_1.assertValidSchema("generic-hell", "MyObject"));
    it("generic-default", utils_1.assertValidSchema("generic-default", "MyObject"));
    it("generic-nested", utils_1.assertValidSchema("generic-nested", "MyObject"));
    it("generic-prefixed-number", utils_1.assertValidSchema("generic-prefixed-number", "MyObject"));
    it("generic-void", utils_1.assertValidSchema("generic-void", "MyObject"));
    it("annotation-custom", utils_1.assertValidSchema("annotation-custom", "MyObject", "basic", [
        "customNumberProperty",
        "customStringProperty",
        "customComplexProperty",
        "customMultilineProperty",
        "customUnquotedProperty",
    ]));
    it("nullable-null", utils_1.assertValidSchema("nullable-null", "MyObject"));
    it("undefined-alias", utils_1.assertValidSchema("undefined-alias", "MyType"));
    it("undefined-union", utils_1.assertValidSchema("undefined-union", "MyType"));
    it("undefined-property", utils_1.assertValidSchema("undefined-property", "MyType"));
    it("any-unknown", utils_1.assertValidSchema("any-unknown", "MyObject"));
    it("multiple-roots1", utils_1.assertValidSchema("multiple-roots1"));
    it("multiple-roots1-star", utils_1.assertValidSchema("multiple-roots1", "*"));
    it("multiple-roots2", utils_1.assertValidSchema("multiple-roots2/schema"));
    it("keyof-typeof-enum", utils_1.assertValidSchema("keyof-typeof-enum", "MyObject"));
});
//# sourceMappingURL=valid-data-other.test.js.map