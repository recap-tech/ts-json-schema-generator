import { Definition } from "../Schema/Definition";
import { SubTypeFormatter } from "../SubTypeFormatter";
import { BaseType } from "../Type/BaseType";
import { TypeFormatter } from "../TypeFormatter";
import { DiscriminatedType } from "../Type/DiscriminatedType";
export declare class DiscriminatedTypeFormatter implements SubTypeFormatter {
    private childTypeFormatter;
    constructor(childTypeFormatter: TypeFormatter);
    supportsType(type: DiscriminatedType): boolean;
    getDefinition(type: DiscriminatedType): Definition;
    getChildren(type: DiscriminatedType): BaseType[];
}
