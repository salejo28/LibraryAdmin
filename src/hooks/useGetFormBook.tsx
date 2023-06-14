import { ICommonFormField, ICommonHookForm, INodesBooks } from "@/types";
import { formatDate } from "@/utils/date";
import { AutocompleteInput, DateInput, ReferenceInput, TextInput, maxValue, minLength, required } from "react-admin";

export const useGetFormBooks = (): ICommonHookForm => {
  const fields: ICommonFormField[] = [
    {
      source: "title",
      validate: [required("Title is required"), minLength(2)],
    },
    {
      source: "publicationDate",
      validate: [required("Publication date is required"), minLength(4), maxValue(formatDate())]
    },
    {
      source: "authorId",
      validate: [required("Author is required"), minLength(1)],
      reference: "authors",
      child: {
        optionText: "name",
        optionValue: "id"
      }
    }
  ];

  const nodes: INodesBooks = {
    title: TextInput,
    publicationDate: DateInput,
    authorId: {
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
