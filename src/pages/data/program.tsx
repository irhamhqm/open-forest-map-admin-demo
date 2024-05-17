import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DataNavbar from "../../components/DataNavbar";
import { Program } from "../../types/api/data";
import { Link } from "react-router-dom";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import { useState } from "react";
import { useDeleteProgram, useGetProgramList } from "../../hooks/api/data";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
} from "@mui/material";

const columns: GridColDef[] = [
  { field: "program_id", headerName: "ID", width: 70, sortable: false },
  {
    field: "pilot_name",
    headerName: "Pilot Name",
    width: 120,
    valueGetter: (_: unknown, row: Program) =>
      row.spatial.pilot_name || "Super admin",
  },
  {
    field: "program_name",
    headerName: "Programme Name",
    width: 100,
    sortable: false,
  },
  {
    field: "program_size",
    headerName: "Programme Size",
    width: 120,
    type: "number",
  },

  {
    field: "program_description",
    headerName: "Programme Description",
    width: 120,
  },
  {
    field: "entity_name",
    headerName: "Entity Name",
    width: 120,
    valueGetter: (_: unknown, row: Program) => row.spatial.entity_name,
    sortable: false,
  },
  {
    field: "from_date",
    headerName: "Start Date(year-month-day)",
    width: 170,
    valueGetter: (_: unknown, row: Program) => row.temporal.from_date,
  },
  {
    field: "to_date",
    headerName: "End Date(year-month-day)",
    width: 170,
    valueGetter: (_: unknown, row: Program) => row.temporal.to_date,
  },
  {
    field: "program_file_path",
    headerName: "Programme File",
    width: 170,
    renderCell: (params) =>
      params.row.program_file_path ? (
        <a
          className="text-blue-700"
          href={`${params.row.program_file_path}`}
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
    field: "program_engfile_path",
    headerName: "Programme English File",
    width: 170,
    renderCell: (params) =>
      params.row.program_engfile_path ? (
        <a
          className="text-blue-700"
          href={`${params.row.program_engfile_path}`}
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
      <Link to={`/data/program/${params.row.program_id}`}>
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
    renderCell: (params) => <DeleteCell id={params.row.program_id} />,
    disableColumnMenu: true,
    disableReorder: true,
    disableExport: true,
    sortable: false,
  },
];

const DeleteCell = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  const { mutate, isSuccess, isError } = useDeleteProgram();

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

export default function ProgramPage() {
  const { data, isLoading, isError } = useGetProgramList();

  if (isLoading || isError) return <img src={"/spinner.svg"} />;

  return (
    <>
      <div style={{ padding: "2rem" }}>
        <DataNavbar />
        <h3>Programme</h3>
        <div style={{ height: 500 }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            getRowId={(row) => row.program_id}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
          />
        </div>
      </div>
    </>
  );
}
