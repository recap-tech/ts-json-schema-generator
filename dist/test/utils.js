"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ajv = require("ajv");
const fs_1 = require("fs");
const path_1 = require("path");
const formatter_1 = require("../factory/formatter");
const parser_1 = require("../factory/parser");
const program_1 = require("../factory/program");
const SchemaGenerator_1 = require("../src/SchemaGenerator");
const validator = new Ajv({
    extendRefs: "fail",
    format: "full",
});
const basePath = "test/valid-data";
function assertValidSchema(relativePath, type, jsDoc = "none", extraTags) {
    return () => {
        const config = {
            path: path_1.resolve(`${basePath}/${relativePath}/*.ts`),
            type,
            jsDoc,
            extraTags,
            skipTypeCheck: !!process.env.FAST_TEST,
        };
        const program = program_1.createProgram(config);
        const generator = new SchemaGenerator_1.SchemaGenerator(program, parser_1.createParser(program, config), formatter_1.createFormatter(config));
        const schema = generator.createSchema(type);
        const expected = JSON.parse(fs_1.readFileSync(path_1.resolve(`${basePath}/${relativePath}/schema.json`), "utf8"));
        const actual = JSON.parse(JSON.stringify(schema));
        expect(typeof actual).toBe("object");
        expect(actual).toEqual(expected);
        validator.validateSchema(actual);
        expect(validator.errors).toBeNull();
        validator.compile(actual);
    };
}
exports.assertValidSchema = assertValidSchema;
//# sourceMappingURL=utils.js.map