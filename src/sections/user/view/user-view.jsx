import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients } from 'src/features/patient/patientSlice';
import axios from 'axios';

import { Link, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import debounce from 'lodash.debounce';

const baseURL = 'https://hospital-api-f6c5exhyheg3abfd.southeastasia-01.azurewebsites.net/api/patients';

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterValue, setFilterValue] = useState('');
  const [filterField, setFilterField] = useState('firstName'); // Trường tìm kiếm mặc định
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filteredPatients, setFilteredPatients] = useState([]);

  const dispatch = useDispatch();
  const { patients, loading, error } = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  console.log("Patient", patients);

  useEffect(() => {
    const debouncedFilter = debounce(async () => {
      try {
        const encodedFilterValue = encodeURIComponent(filterValue);
        const authToken = localStorage.getItem('authToken');
        
        const url = `${baseURL}?${filterField}=${encodedFilterValue}`;
        console.log('Fetching URL:', url); // In ra URL để kiểm tra
    
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            accept: 'application/json',
          },
        });
        
        setFilteredPatients(response.data?.result.data || []);
        console.log("CON", response.data?.result.data);
      } catch (err) {
        console.log('Error fetching filtered data:', err);
      }
    }, 500);

    debouncedFilter();

    return () => debouncedFilter.cancel();
  }, [filterValue, filterField]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredPatients.map((n) => n.firstName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const dataToDisplay = filteredPatients.length > 0 ? filteredPatients : patients;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Patients</Typography>
        <Link href='/patient/add'>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Patient
          </Button>
        </Link>
      </Stack>

      <Card>
        <Stack direction="row" alignItems="center" spacing={2} mb={2} mt={2}>
          <TextField
            label="Search"
            variant="outlined"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <ToggleButtonGroup
            value={filterField}
            exclusive
            onChange={(e, newField) => setFilterField(newField)}
            aria-label="search field"
          >
            <ToggleButton value="firstName">First Name</ToggleButton>
            <ToggleButton value="lastName">Last Name</ToggleButton>
            <ToggleButton value="phone">Phone</ToggleButton>
            <ToggleButton value="dateOfBirth">Date of Birth</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={dataToDisplay.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'firstName', label: 'First Name' },
                  { id: 'lastName', label: 'Last Name' },
                  { id: 'gender', label: 'Gender' },
                  { id: 'dateOfBirth', label: 'Date of Birth' },
                  { id: 'deactivatedAt', label: 'Deactivated At', align: 'center' },
                  { id: 'isActive', label: 'Active' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataToDisplay
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      id={row.id}
                      name={row.firstName}
                      lastName={row.lastName}
                      gender={row.gender}
                      dateOfBirth={row.dateOfBirth}
                      deactivatedAt={row.deactivatedAt}
                      isActive={row.isActive}
                      selected={selected.indexOf(row.firstName) !== -1}
                      handleClick={(event) => handleClick(event, row.firstName)}
                    />
                  ))}
                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, dataToDisplay.length)}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={dataToDisplay.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
