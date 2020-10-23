"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const fs_1 = require("fs");
const json_stable_stringify_1 = __importDefault(require("json-stable-stringify"));
const generator_1 = require("./factory/generator");
const Config_1 = require("./src/Config");
const BaseError_1 = require("./src/Error/BaseError");
const formatError_1 = require("./src/Utils/formatError");
const args = commander_1.default
    .option("-p, --path <path>", "Source file path")
    .option("-t, --type <name>", "Type name")
    .option("-f, --tsconfig <path>", "Custom tsconfig.json path")
    .option("-e, --expose <expose>", "Type exposing", /^(all|none|export)$/, "export")
    .option("-j, --jsDoc <extended>", "Read JsDoc annotations", /^(none|basic|extended)$/, "extended")
    .option("--unstable", "Do not sort properties")
    .option("--strict-tuples", "Do not allow additional items on tuples")
    .option("--no-top-ref", "Do not create a top-level $ref definition")
    .option("--no-type-check", "Skip type checks to improve performance")
    .option("--no-ref-encode", "Do not encode references")
    .option("-o, --out <file>", "Set the output file (default: stdout)")
    .option("--validationKeywords [value]", "Provide additional validation keywords to include", (value, list) => list.concat(value), [])
    .option("--additional-properties", "Allow additional properties for objects with no index signature (default: false)", false)
    .parse(process.argv);
const config = {
    ...Config_1.DEFAULT_CONFIG,
    path: args.path,
    tsconfig: args.tsconfig,
    type: args.type,
    expose: args.expose,
    topRef: args.topRef,
    jsDoc: args.jsDoc,
    sortProps: !args.unstable,
    strictTuples: args.strictTuples,
    skipTypeCheck: !args.typeCheck,
    encodeRefs: args.refEncode,
    extraTags: args.validationKeywords,
    additionalProperties: args.additionalProperties,
};
try {
    const schema = generator_1.createGenerator(config).createSchema(args.type);
    const schemaString = config.sortProps ? json_stable_stringify_1.default(schema, { space: 2 }) : JSON.stringify(schema, null, 2);
    if (args.out) {
        fs_1.writeFile(args.out, schemaString, (err) => {
            if (err)
                throw err;
        });
    }
    else {
        process.stdout.write(schemaString);
    }
}
catch (error) {
    if (error instanceof BaseError_1.BaseError) {
        process.stderr.write(formatError_1.formatError(error));
        process.exit(1);
    }
    else {
        throw error;
    }
}
//# sourceMappingURL=ts-json-schema-generator.js.map