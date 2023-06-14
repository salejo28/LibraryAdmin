import {
  Datagrid,
  DatagridProps,
  List,
  ListProps,
} from "react-admin";
import { Pagination } from "./Pagination";

type CustomListProps = Omit<ListProps, "children">;

interface IListTableProps {
  children: React.ReactNode;
  listProps?: CustomListProps;
  datagridProps?: DatagridProps;
}

export const ListTable = ({
  children,
  listProps,
  datagridProps,
}: IListTableProps) => {
  return (
    <List pagination={<Pagination />} {...listProps}>
      <Datagrid {...datagridProps}>{children}</Datagrid>
    </List>
  );
};
