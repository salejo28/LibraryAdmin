import {
  BulkDeleteWithConfirmButton,
  PaginationPayload,
  SortPayload,
  useDataProvider,
  useDeleteWithConfirmController,
  useListContext,
  useNotify,
  useRefresh,
} from "react-admin";

interface IBulkDeleteActionProps {
  resource?: "authors" | "books";
}

export const BulkDeleteAction = ({
  resource = "authors",
}: IBulkDeleteActionProps) => {
  const { selectedIds, onUnselectItems } = useListContext();
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh()

  const pluralTextConfirm = `Are you sure you want to delete these 2 ${resource}? The referenced books will also be eliminated`;
  const singularTextConfirm = `Are you sure you want to delete this ${resource?.replace(
    "s",
    ""
  )}? The referenced books will also be eliminated`;

  const handleDelete = async () => {
    if (resource === "authors") {
      await Promise.all(
        selectedIds.map(async (selected_id) => {
          const { data } = await dataProvider.getList("books", {
            filter: { authorId: selected_id },
            pagination: undefined as unknown as PaginationPayload,
            sort: undefined as unknown as SortPayload,
          });

          const books_ids = data.map((d) => d.id);
          await dataProvider.deleteMany("books", {
            ids: books_ids,
          });
        })
      );
    }
  };

  const onSuccess = () => {
    if (resource === "authors")
      notify("Author and books deleted", { type: "info" });
    else notify("Book deleted", { type: "info" });
    onUnselectItems();
    refresh()
  };

  return (
    <BulkDeleteWithConfirmButton
      mutationMode="pessimistic"
      confirmContent={
        selectedIds.length > 1 ? pluralTextConfirm : singularTextConfirm
      }
      onClick={handleDelete}
      mutationOptions={{ onSuccess }}
    />
  );
};

// 1964-01-06 mario mendoza
