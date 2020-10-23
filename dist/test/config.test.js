"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const fs_1 = require("fs");
const path_1 = require("path");
const formatter_1 = require("../factory/formatter");
const parser_1 = require("../factory/parser");
const program_1 = require("../factory/program");
const Config_1 = require("../src/Config");
const SchemaGenerator_1 = require("../src/SchemaGenerator");
const basePath = "test/config";
function assertSchema(name, userConfig, tsconfig) {
    return () => {
        const config = {
            ...Config_1.DEFAULT_CONFIG,
            ...userConfig,
            skipTypeCheck: !!process.env.FAST_TEST,
        };
        if (tsconfig) {
            config.tsconfig = path_1.resolve(`${basePath}/${name}/tsconfig.json`);
        }
        else {
            config.path = path_1.resolve(`${basePath}/${name}/*.ts`);
        }
        const program = program_1.createProgram(config);
        const generator = new SchemaGenerator_1.SchemaGenerator(program, parser_1.createParser(program, config), formatter_1.createFormatter(config), config);
        const expected = JSON.parse(fs_1.readFileSync(path_1.resolve(`${basePath}/${name}/schema.json`), "utf8"));
        const actual = JSON.parse(JSON.stringify(generator.createSchema(config.type)));
        expect(typeof actual).toBe("object");
        expect(actual).toEqual(expected);
        const validator = new ajv_1.default({
            extendRefs: "fail",
            format: config.encodeRefs === false ? undefined : "full",
        });
        validator.validateSchema(actual);
        expect(validator.errors).toBeNull();
        validator.compile(actual);
    };
}
describe("config", () => {
    it("expose-all-topref-true", assertSchema("expose-all-topref-true", {
        type: "MyObject",
        expose: "all",
        topRef: true,
        jsDoc: "none",
    }));
    it("expose-all-topref-true-not-exported", assertSchema("expose-all-topref-true-not-exported", {
        type: "MyObject",
        expose: "all",
        topRef: true,
        jsDoc: "none",
    }));
    it("expose-all-topref-false", assertSchema("expose-all-topref-false", {
        type: "MyObject",
        expose: "all",
        topRef: false,
        jsDoc: "none",
    }));
    it("expose-all-topref-false-not-exported", assertSchema("expose-all-topref-false-not-exported", {
        type: "MyObject",
        expose: "all",
        topRef: false,
        jsDoc: "none",
    }));
    it("expose-none-topref-true", assertSchema("expose-none-topref-true", {
        type: "MyObject",
        expose: "none",
        topRef: true,
        jsDoc: "none",
    }));
    it("expose-none-topref-false", assertSchema("expose-none-topref-false", {
        type: "MyObject",
        expose: "none",
        topRef: false,
        jsDoc: "none",
    }));
    it("expose-export-topref-true", assertSchema("expose-export-topref-true", {
        type: "MyObject",
        expose: "export",
        topRef: true,
        jsDoc: "none",
    }));
    it("expose-export-topref-false", assertSchema("expose-export-topref-false", {
        type: "MyObject",
        expose: "export",
        topRef: false,
        jsDoc: "none",
    }));
    it("jsdoc-complex-none", assertSchema("jsdoc-complex-none", {
        type: "MyObject",
        expose: "export",
        topRef: true,
        jsDoc: "none",
    }));
    it("jsdoc-complex-basic", assertSchema("jsdoc-complex-basic", {
        type: "MyObject",
        expose: "export",
        topRef: true,
        jsDoc: "basic",
    }));
    it("jsdoc-complex-extended", assertSchema("jsdoc-complex-extended", {
        type: "MyObject",
        expose: "export",
        topRef: true,
        jsDoc: "extended",
    }));
    it("jsdoc-description-only", assertSchema("jsdoc-description-only", {
        type: "MyObject",
        expose: "export",
        topRef: true,
        jsDoc: "extended",
    }));
    it("jsdoc-hidden", assertSchema("jsdoc-hidden", {
        type: "MyObject",
        expose: "export",
        topRef: true,
        jsDoc: "extended",
    }));
    it("jsdoc-hidden-types", assertSchema("jsdoc-hidden", {
        type: "MyObject",
        expose: "export",
        topRef: true,
        jsDoc: "extended",
    }));
    it("jsdoc-inheritance", assertSchema("jsdoc-inheritance", {
        type: "MyObject",
        expose: "export",
        topRef: true,
        jsDoc: "extended",
    }));
    it("jsdoc-inheritance-exclude", assertSchema("jsdoc-inheritance-exclude", {
        type: "MyType",
        expose: "export",
        topRef: true,
        jsDoc: "extended",
    }));
    it("jsdoc-complex-extended", assertSchema("jsdoc-complex-extended", {
        type: "MyObject",
        expose: "export",
        topRef: true,
        jsDoc: "extended",
        skipTypeCheck: true,
    }));
    it("tsconfig-support", assertSchema("tsconfig-support", {
        type: "MyObject",
        expose: "all",
        topRef: false,
        jsDoc: "none",
    }, true));
    it("no-ref-encode", assertSchema("no-ref-encode", {
        type: "MyObject",
        expose: "all",
        encodeRefs: false,
        topRef: true,
        jsDoc: "none",
    }));
    it("additional-properties", assertSchema("additional-properties", {
        type: "MyObject",
        additionalProperties: true,
    }));
});
//# sourceMappingURL=config.test.js.map