import * as ts from "typescript";

export function getDiscriminator(symbol: ts.Symbol): string | undefined {
    const jsDocTags: ts.JSDocTagInfo[] = symbol.getJsDocTags();
    if (!jsDocTags || !jsDocTags.length) {
        return;
    }

    const jsDocTag: ts.JSDocTagInfo | undefined = jsDocTags.find(
        (tag: ts.JSDocTagInfo) => tag.name === "discriminator"
    );
    if (!jsDocTag || !jsDocTag.text) {
        return;
    }
    return jsDocTag.text;
}
