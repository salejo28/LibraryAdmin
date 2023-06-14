import { ComponentType, ReactNode, Validator } from "react";
import {
  AutocompleteInputProps,
  DateInputProps,
  ReferenceInputProps,
  TextInputProps,
} from "react-admin";

export interface IAuthor {
  id: number;
  name: string;
  bornDate: string;
  nationalityId: number;
}

export interface IBook {
  id: number;
  title: string;
  publicationDate: string;
  authorId: number;
}

export interface ICommonFormField {
  source: string;
  validate: any;
  reference?: string
  child?: {
    optionText: string;
    optionValue: string;
  };
}

export interface INodesBooks {
  title: (props: TextInputProps) => ReactNode;
  publicationDate: (props: DateInputProps) => ReactNode;
  authorId: {
    parent: (props: ReferenceInputProps) => ReactNode;
    child: (props: AutocompleteInputProps) => ReactNode;
  };
}

export interface INodesAuthors {
  name: (props: TextInputProps) => ReactNode,
  bornDate: (props: DateInputProps) => ReactNode,
  nationalityId: {
    parent: (props: ReferenceInputProps) => ReactNode;
    child: (props: AutocompleteInputProps) => ReactNode;
  }
}

export interface ICommonHookForm {
  fields: ICommonFormField[];
  fillContent: (field: ICommonFormField) => ReactNode
}
