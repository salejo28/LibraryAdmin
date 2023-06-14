import {
  BulkDeleteWithConfirmButton,
  useGetMany,
  useListContext,
} from "react-admin";

export const BulkDeleteAction = () => {
  const { selectedIds } = useListContext();
  console.log(selectedIds);

  return <BulkDeleteWithConfirmButton mutationMode="pessimistic" confirmContent="" />;
};
