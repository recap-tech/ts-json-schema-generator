import { BaseType } from "./BaseType";
export declare class ObjectProperty {
    private name;
    private type;
    private required;
    constructor(name: string, type: BaseType | undefined, required: boolean);
    getName(): string;
    getType(): BaseType | undefined;
    isRequired(): boolean;
}
export declare class ObjectType extends BaseType {
    private id;
    private baseTypes;
    private properties;
    private additionalProperties;
    constructor(id: string, baseTypes: readonly BaseType[], properties: readonly ObjectProperty[], additionalProperties: BaseType | boolean);
    getId(): string;
    getBaseTypes(): readonly BaseType[];
    getProperties(): readonly ObjectProperty[];
    getAdditionalProperties(): BaseType | boolean;
}
