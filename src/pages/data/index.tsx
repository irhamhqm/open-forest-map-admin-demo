import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDeleteFireEvent, useGetFireEventList } from "../../hooks/api/data";
import { FireEvent } from "../../types/api/data";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import DataNavbar from "../../components/DataNavbar";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "fire_event_id", headerName: "ID", width: 70, sortable: false },
  {
    field: "pilot_name",
    headerName: "Pilot Name",
    width: 120,
    valueGetter: (_: unknown, row: FireEvent) =>
      row.spatial.pilot_name || "Super admin",
  },
  {
    field: "fire_intensity",
    headerName: "Fire Intensity",
    width: 100,
    sortable: false,
  },
  {
    field: "fire_size",
    headerName: "Fire Size (km²)",
    width: 120,
    type: "number",
  },
  {
    field: "fire_type",
    headerName: "Fire Type",
    width: 120,
    sortable: false,
  },
  {
    field: "entity_name",
    headerName: "Entity Name",
    width: 120,
    valueGetter: (_: unknown, row: FireEvent) => row.spatial.entity_name,
    sortable: false,
  },
  {
    field: "from_date",
    headerName: "Start(year-month-day)",
    width: 170,
    valueGetter: (_: unknown, row: FireEvent) => row.temporal.from_date,
  },
  {
    field: "to_date",
    headerName: "End(year-month-day)",
    width: 170,
    valueGetter: (_: unknown, row: FireEvent) => row.temporal.to_date,
  },
  {
    field: "details",
    headerName: "Details",
    renderCell: (params) => (
      <Link to={`/data/fire-event/${params.row.fire_event_id}`}>
        <RemoveRedEye />
      </Link>
    ),
    disableColumnMenu: true,
    disableReorder: true,
    disableExport: true,
    sortable: false,
  },
  {
    field: "delete",
    headerName: "Delete",
    renderCell: (params) => <DeleteCell id={params.row.fire_event_id} />,
    disableColumnMenu: true,
    disableReorder: true,
    disableExport: true,
    sortable: false,
  },
];

const DeleteCell = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  const { mutate, isSuccess, isError } = useDeleteFireEvent();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
    location.reload();
  };

  return (
    <>
      <div>
        <Delete
          onClick={() => {
            setOpen(true);
          }}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle> */}
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this data?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleDelete}>Yes</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        message="Succesfully added new data."
      />
      <Snackbar
        open={isError}
        autoHideDuration={3000}
        message="An error occured."
      />
    </>
  );
};

export default function DataPage() {
  const { data, isLoading, isError } = useGetFireEventList();

  if (isLoading || isError) return <img src={"/spinner.svg"} />;

  return (
    <>
      <div style={{ padding: "2rem" }}>
        <DataNavbar />
        <h3>Fire Events</h3>
        <div style={{ height: 500 }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            getRowId={(row) => row.fire_event_id}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
          />
        </div>
      </div>
    </>
  );
}
