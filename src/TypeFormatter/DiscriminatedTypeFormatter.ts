import { Definition } from "../Schema/Definition";
import { SubTypeFormatter } from "../SubTypeFormatter";
import { BaseType } from "../Type/BaseType";
import { TypeFormatter } from "../TypeFormatter";
import { DiscriminatedType } from "../Type/DiscriminatedType";

export class DiscriminatedTypeFormatter implements SubTypeFormatter {
    public constructor(private childTypeFormatter: TypeFormatter) {}

    public supportsType(type: DiscriminatedType): boolean {
        return type instanceof DiscriminatedType;
    }
    public getDefinition(type: DiscriminatedType): Definition {
        return {
            if: {
                properties: {
                    [type.getDiscriminatorName()]: {
                        const: type.getDiscriminatorValue(),
                    },
                },
            },
            then: this.childTypeFormatter.getDefinition(type.getType()),
        };
    }
    public getChildren(type: DiscriminatedType): BaseType[] {
        return this.childTypeFormatter.getChildren(type.getType());
    }
}
