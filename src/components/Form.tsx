import { Create, Edit, SaveButton, SimpleForm, Toolbar, ToolbarProps, useNotify, useRedirect } from "react-admin";

interface IFormProps {
  children: React.ReactNode;
  edit?: boolean;
  title?:
    | string
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
  message?: string;
  redirectPath?: string
}

const FormEditToolbar = (props: ToolbarProps) => {
  return (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  )
}

export const Form = ({ edit, children, title, message = "Data saved", redirectPath = "authors" }: IFormProps) => {
  const notify = useNotify();
  const redirect = useRedirect()

  const onSuccess = () => {
    notify(message, { type: "info" });
    redirect(`/${redirectPath}`)
  };

  if (edit)
    return (
      <Edit title={title} redirect="list" mutationOptions={{ onSuccess }}>
        <SimpleForm toolbar={<FormEditToolbar />}>{children}</SimpleForm>
      </Edit>
    );

  return (
    <Create redirect="list" mutationOptions={{ onSuccess }}>
      <SimpleForm>{children}</SimpleForm>
    </Create>
  );
};
