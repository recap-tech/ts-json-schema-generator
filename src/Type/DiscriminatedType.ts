import { BaseType } from "./BaseType";

export class DiscriminatedType extends BaseType {
    public constructor(private type: BaseType, private discriminatorName: string, private discriminatorValue: string | number) {
        super();
    }

    public getId(): string {
        return this.type.getId() + this.discriminatorName;
    }

    public getType(): BaseType {
        return this.type;
    }

    public getDiscriminatorName(): string {
        return this.discriminatorName;
    }

    public getDiscriminatorValue(): string | number {
        return this.discriminatorValue;
    }
}
