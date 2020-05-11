import { AliasType } from "../Type/AliasType";
import { AnnotatedType } from "../Type/AnnotatedType";
import { BaseType } from "../Type/BaseType";
import { DefinitionType } from "../Type/DefinitionType";
import { ReferenceType } from "../Type/ReferenceType";
import { DiscriminatedType } from "../Type/DiscriminatedType";

export function derefType(type: BaseType | undefined): BaseType | undefined {
    if (
        type instanceof ReferenceType ||
        type instanceof DefinitionType ||
        type instanceof AliasType ||
        type instanceof AnnotatedType ||
        type instanceof DiscriminatedType
    ) {
        return derefType(type.getType());
    }

    return type;
}

export function derefAnnotatedType(type: BaseType): BaseType {
    if (type instanceof AnnotatedType || type instanceof AliasType || type instanceof DiscriminatedType) {
        return derefAnnotatedType(type.getType());
    }

    return type;
}
