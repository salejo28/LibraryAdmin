import { ICommonFormField, ICommonHookForm, INodesAuthors, INodesBooks } from "@/types";
import { formatDate } from "@/utils/date";
import { AutocompleteInput, DateInput, ReferenceInput, TextInput, maxValue, minLength, required } from "react-admin";

export const useGetFormAuthor = (): ICommonHookForm => {
  const fields: ICommonFormField[] = [
    {
      source: "name",
      validate: [required("Name is required"), minLength(2)],
    },
    {
      source: "bornDate",
      validate: [required("Born date is required"), minLength(4), maxValue(formatDate())]
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
      const propsChild = field.child
      return (
        <ParentComponent key={field.source} source={field.source} reference={field.reference!}>
          <ChildComponent
            validate={field.validate}
            {...propsChild}
          />
        </ParentComponent>
      );
    }
    const Component = node;
    return <Component key={field.source} {...field} />;
  };

  return { fields, fillContent }
};
