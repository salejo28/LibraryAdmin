import {
  EditButton,
  ReferenceField,
  TextField,
  TextInput,
  useCreate,
  useNotify,
  useRecordContext,
} from "react-admin";
import { IAuthor } from "../../types";
import { ListTable } from "@/components/ListTable";
import { Form } from "@/components/Form";
import { useGetFormAuthor } from "@/hooks/useGetFormAuthor";
import { BulkDeleteAction } from "@/components/BulkDeleteAction";

export const AuthorsList = () => {
  const authorFilters = [<TextInput source="q" label="Search" alwaysOn />];

  return (
    <ListTable listProps={{ filters: authorFilters }} datagridProps={{ bulkActionButtons: <BulkDeleteAction /> }}>
      <TextField source="name" />
      <TextField source="bornDate" />
      <ReferenceField source="nationalityId" reference="nationalities">
        <TextField source="nationality" />
      </ReferenceField>
      <EditButton />
    </ListTable>
  );
};

export const AuthorsCreate = () => {
  const { fields, fillContent } = useGetFormAuthor();
  return (
    <Form message="Author created" redirectPath="authors">
      {fields.map((field) => fillContent(field))}
    </Form>
  );
};

const AuthorTitle = () => {
  const record = useRecordContext<IAuthor>();
  return <span>Author {record.name}</span>;
};

export const AuthorsEdit = () => {
  const { fields, fillContent } = useGetFormAuthor();
  return (
    <Form
      title={<AuthorTitle />}
      message="Author updated"
      redirectPath="authors"
      edit
    >
      {fields.map((field) => fillContent(field))}
    </Form>
  );
};
