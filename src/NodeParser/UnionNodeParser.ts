import ts from "typescript";
import { Context, NodeParser } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { UnionType } from "../Type/UnionType";
import { BaseType } from "../Type/BaseType";
import { notUndefined } from "../Utils/notUndefined";
import { symbolAtNode } from "../Utils/symbolAtNode";
import { DiscriminatedType } from "../Type/DiscriminatedType";
import { getDiscriminator } from "../Utils/getDiscriminator";

export class UnionNodeParser implements SubNodeParser {
    public constructor(private typeChecker: ts.TypeChecker, private childNodeParser: NodeParser) {}

    public supportsNode(node: ts.UnionTypeNode): boolean {
        return node.kind === ts.SyntaxKind.UnionType;
    }

    public createType(node: ts.UnionTypeNode, context: Context): BaseType | undefined {
        if (node.parent.kind === ts.SyntaxKind.TypeAliasDeclaration) {
            const parentSymbol = symbolAtNode(node.parent);
            if (parentSymbol) {
                const discriminator = getDiscriminator(parentSymbol);
                if (discriminator) {
                    const discriminatedTypes = node.types.map((subNode) => {
                        const subType = this.typeChecker.getTypeFromTypeNode(subNode);
                        const resolvedType = this.typeChecker.getTypeOfSymbolAtLocation(
                            subType.getProperty(discriminator)!,
                            node
                        );
                        if (!resolvedType.isStringLiteral() && !resolvedType.isNumberLiteral()) {
                            throw new Error(
                                `Union "${parentSymbol.name}" does not have a direct string or number property "${discriminator}" for union member ` +
                                    `"${subType.aliasSymbol?.name}"`
                            );
                        }
                        return new DiscriminatedType(
                            this.childNodeParser.createType(subNode, context)!,
                            discriminator,
                            resolvedType.value
                        );
                    });

                    return new UnionType(discriminatedTypes);
                }
            }
        }

        const types = node.types
            .map((subnode) => {
                return this.childNodeParser.createType(subnode, context);
            })
            .filter(notUndefined);

        if (types.length === 1) {
            return types[0];
        } else if (types.length === 0) {
            return undefined;
        }

        return new UnionType(types);
    }
}
