import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import axios from 'axios';
import Swal from 'sweetalert2';
// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  id,
  name,
  lastName,
  gender,
  dateOfBirth,
  deactivatedAt,
  isActive,
  handleClick,
}) {

  const router = useRouter()
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    router.push(`/patient/edit/${id}`)

  }

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to recover this patient!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });
  
      if (result.isConfirmed) {
        await axios.delete(`https://hospital-api-f6c5exhyheg3abfd.southeastasia-01.azurewebsites.net/api/patients/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
  
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The patient has been deleted.',
        });
  
        setTimeout(() => {
          router.reload();
        }, 3000);
  
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Cancelled',
          text: 'The patient is safe!',
        });
      }
  
    } catch (error) {
      console.error('Failed to delete patient', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to delete patient',
      });
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            
            <Typography variant="subtitle2" noWrap> 
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          
              {lastName}
            
        </TableCell>

        <TableCell>{gender}</TableCell>

        <TableCell>{dateOfBirth}</TableCell>

        <TableCell align="center">{deactivatedAt}</TableCell>

        <TableCell>
          <Label color={(isActive === false && 'error') || 'success'}>{isActive ? 'Active': 'Deactivate'}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  handleClick: PropTypes.func,
  gender: PropTypes.any,
  dateOfBirth: PropTypes.any,
  deactivatedAt: PropTypes.any,
  name: PropTypes.any,
  lastName: PropTypes.any,
  id: PropTypes.any,
  isActive: PropTypes.any,
  selected: PropTypes.any,
};
