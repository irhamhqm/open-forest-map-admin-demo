import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DataNavbar from "../../components/DataNavbar";
import { Regulation } from "../../types/api/data";
import { Link } from "react-router-dom";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import { useState } from "react";
import {
  useDeleteRegulation,
  useGetRegulationList,
} from "../../hooks/api/data";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  // Snackbar,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "regulation_id", headerName: "ID", width: 70, sortable: false },
  {
    field: "pilot_name",
    headerName: "Pilot Name",
    width: 120,
    valueGetter: (_: unknown, row: Regulation) => row.spatial.pilot_name,
  },
  {
    field: "regulation_name",
    headerName: "Regulation Name",
    width: 100,
    sortable: false,
  },
  {
    field: "regulation_description",
    headerName: "Regulation Description",
    width: 200,
    sortable: false,
  },
  {
    field: "entity_name",
    headerName: "Entity Name",
    width: 120,
    valueGetter: (_: unknown, row: Regulation) => row.spatial.entity_name,
    sortable: false,
  },
  {
    field: "acquired_date",
    headerName: "Start Date(year-month-day)",
    width: 170,
    valueGetter: (_: unknown, row: Regulation) => row.temporal.acquired_date,
  },
  {
    field: "regulation_file_path",
    headerName: "Regulation File",
    width: 170,
    renderCell: (params) =>
      params.row.regulation_file_path ? (
        <a
          className="text-blue-700"
          href={`${params.row.regulation_file_path}`}
          target="_blank"
          download
        >
          Download
        </a>
      ) : (
        <></>
      ),
  },
  {
    field: "regulation_engfile_path",
    headerName: "Regulation English File",
    width: 170,
    renderCell: (params) =>
      params.row.regulation_engfile_path ? (
        <a
          className="text-blue-700"
          href={`${params.row.regulation_engfile_path}`}
          target="_blank"
          download
        >
          Download
        </a>
      ) : (
        <></>
      ),
  },
  {
    field: "details",
    headerName: "Details",
    renderCell: (params) => (
      <Link to={`/data/regulation/${params.row.regulation_id}`}>
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
    renderCell: (params) => <DeleteCell id={params.row.regulation_id} />,
    disableColumnMenu: true,
    disableReorder: true,
    disableExport: true,
    sortable: false,
  },
];

const DeleteCell = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const client = useQueryClient();

  const { mutate } = useDeleteRegulation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        setOpen(false);
        client.invalidateQueries();
      },
    });
    // location.reload();
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
      {/* <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        message="Succesfully deleted new data."
      />
      <Snackbar
        open={isError}
        autoHideDuration={3000}
        message="An error occured."
      /> */}
    </>
  );
};

export default function RegulationPage() {
  const { data, isLoading, isError } = useGetRegulationList();

  if (isLoading || isError) return <img src={"/spinner.svg"} />;

  return (
    <>
      <div style={{ padding: "2rem" }}>
        <DataNavbar />
        <h3>Regulation</h3>
        <div style={{ height: 500 }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            getRowId={(row) => row.regulation_id}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
          />
        </div>
      </div>
    </>
  );
}
