import { BaseType } from "./BaseType";
export declare class DiscriminatedType extends BaseType {
    private type;
    private discriminatorName;
    private discriminatorValue;
    constructor(type: BaseType, discriminatorName: string, discriminatorValue: string | number);
    getId(): string;
    getType(): BaseType;
    getDiscriminatorName(): string;
    getDiscriminatorValue(): string | number;
}
