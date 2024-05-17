import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DataNavbar from "../../components/DataNavbar";
import { SoilType } from "../../types/api/data";
import { Link } from "react-router-dom";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import { useState } from "react";
import { useDeleteSoilType, useGetSoilTypeList } from "../../hooks/api/data";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
} from "@mui/material";

const columns: GridColDef[] = [
  { field: "soil_type_id", headerName: "ID", width: 70, sortable: false },
  {
    field: "pilot_name",
    headerName: "Pilot Name",
    width: 120,
    valueGetter: (_: unknown, row: SoilType) => row.spatial.pilot_name,
  },
  {
    field: "soil_type",
    headerName: "Soil Type",
    width: 100,
    sortable: false,
  },
  {
    field: "soil_texture",
    headerName: "Soil Texture",
    width: 120,
    sortable: false,
  },
  {
    field: "entity_name",
    headerName: "Entity Name",
    width: 120,
    valueGetter: (_: unknown, row: SoilType) => row.spatial.entity_name,
    sortable: false,
  },
  {
    field: "acquired_date",
    headerName: "Acquired Date(year-month-day)",
    width: 170,
    valueGetter: (_: unknown, row: SoilType) => row.temporal.acquired_date,
  },
  {
    field: "details",
    headerName: "Details",
    renderCell: (params) => (
      <Link to={`/data/soil-type/${params.row.soil_type_id}`}>
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
    renderCell: (params) => <DeleteCell id={params.row.soil_type_id} />,
    disableColumnMenu: true,
    disableReorder: true,
    disableExport: true,
    sortable: false,
  },
];

const DeleteCell = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  const { mutate, isSuccess, isError } = useDeleteSoilType();

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

export default function SoilTypePage() {
  const { data, isLoading, isError } = useGetSoilTypeList();

  if (isLoading || isError) return <img src={"/spinner.svg"} />;

  return (
    <>
      <div style={{ padding: "2rem" }}>
        <DataNavbar />
        <h3>Soil Types</h3>
        <div style={{ height: 500 }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            getRowId={(row) => row.soil_type_id}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
          />
        </div>
      </div>
    </>
  );
}
