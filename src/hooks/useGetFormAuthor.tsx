import { ICommonFormField, ICommonHookForm, INodesAuthors, INodesBooks } from "@/types";
import { AutocompleteInput, DateInput, ReferenceInput, TextInput, minLength, required } from "react-admin";

export const useGetFormAuthor = (): ICommonHookForm => {
  const fields: ICommonFormField[] = [
    {
      source: "name",
      validate: [required("Name is required"), minLength(2)],
    },
    {
      source: "bornDate",
      validate: [required("Born date is required"), minLength(4)]
    },
    {
      source: "nationalityId",
      validate: [required("Nationality is required"), minLength(1)],
      reference: "nationalities",
      child: {
        optionText: "nationality",
        optionValue: "id"
      }
    }
  ];

  const nodes: INodesAuthors = {
    name: TextInput,
    bornDate: DateInput,
    nationalityId: {
      parent: ReferenceInput,
      child: AutocompleteInput
    }
  }

  const fillContent = (field: ICommonFormField) => {
    const node = nodes[field.source as keyof typeof nodes];
    if (typeof node === "object") {
      const ParentComponent = node.parent;
      const ChildComponent = node.child;
      return (
        <ParentComponent key={field.source} source={field.source} reference={field.reference!}>
          <ChildComponent
            validate={field.validate}
            optionText={field.child!.optionText}
            optionValue={field.child!.optionValue}
          />
        </ParentComponent>
      );
    }
    const Component = node;
    return <Component key={field.source} {...field} />;
  };

  return { fields, fillContent }
};
