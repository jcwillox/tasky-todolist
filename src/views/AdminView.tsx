import React, { useCallback, useEffect, useMemo, useState } from "react";
import { api, apiJSON } from "../utils/fetch";
import { User } from "../models/user";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAsyncError } from "../hooks/use-async";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId
} from "@mui/x-data-grid";

const AdminView = () => {
  const wrapAsync = useAsyncError();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wrapAsync(apiJSON("/users")).then(users => {
      setUsers(users);
      setLoading(false);
    });
  }, [wrapAsync]);

  const onDeleteRow = useCallback(
    (id: GridRowId) => {
      wrapAsync(api(`/user/${id}`, { method: "delete" })).then(() => {
        setUsers(users => users.filter(user => user.id !== id));
      });
    },
    [wrapAsync]
  );

  const columns: GridColumns = useMemo(
    () => [
      {
        field: "id",
        type: "string",
        headerName: "ID",
        flex: 0.5
      },
      {
        field: "username",
        type: "string",
        headerName: "Username",
        flex: 1
      },
      {
        field: "name",
        type: "string",
        headerName: "Name",
        flex: 1
      },
      {
        field: "group",
        type: "boolean",
        headerName: "Admin",
        valueGetter: params => {
          return params.value === "admin";
        }
      },
      {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: params => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => onDeleteRow(params.id)}
          />
        ]
      }
    ],
    [onDeleteRow]
  );

  return (
    <DataGrid rows={users} loading={loading} columns={columns} pagination />
  );
};

export default AdminView;
