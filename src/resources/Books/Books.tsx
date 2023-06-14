import { BulkDeleteAction } from "@/components/BulkDeleteAction";
import { Form } from "@/components/Form";
import { ListTable } from "@/components/ListTable";
import { useGetFormBooks } from "@/hooks/useGetFormBook";
import { IBook } from "@/types";
import {
  ReferenceField,
  TextField,
  useRecordContext,
  EditButton,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";

export const BooksList = () => {
  const bookFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="authorId" label="Author" reference="authors" >
      <AutocompleteInput optionText="name" optionValue="id"  />
    </ReferenceInput>,
  ];

  return (
    <ListTable listProps={{ filters: bookFilters }} datagridProps={{ bulkActionButtons: <BulkDeleteAction resource="books" /> }}>
      <TextField source="title" />
      <ReferenceField source="authorId" reference="authors">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="publicationDate" />
      <EditButton />
    </ListTable>
  );
};

export const BooksCreate = () => {
  const { fields, fillContent } = useGetFormBooks();

  return (
    <Form message="Book created" redirectPath="books">
      {fields.map((field) => fillContent(field))}
    </Form>
  );
};

const BookTitle = () => {
  const record = useRecordContext<IBook>();
  return <span>Book {record.title}</span>;
};

export const BooksEdit = () => {
  const { fields, fillContent } = useGetFormBooks();

  return (
    <Form
      title={<BookTitle />}
      message="Book updated"
      redirectPath="books"
      edit
    >
      {fields.map((field) => fillContent(field))}
    </Form>
  );
};
