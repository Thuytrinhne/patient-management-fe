import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, MenuItem, IconButton } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';

// URL API
const provincesAPI = 'https://esgoo.net/api-tinhthanh/1/0.htm';
const wardsAPI = 'https://esgoo.net/api-tinhthanh/1/2.htm';
const baseURL = 'https://hospital-api-f6c5exhyheg3abfd.southeastasia-01.azurewebsites.net/api/patients';

// // Validation schema with yup
// const schema = yup.object().shape({
//   firstName: yup.string().required('First name is required'),
//   lastName: yup.string().required('Last name is required'),
//   gender: yup.string().required('Gender is required'),
//   dateOfBirth: yup.date().required('Date of birth is required').typeError('Invalid date'),
//   contactInfors: yup.array().of(
//     yup.object().shape({
//       type: yup.string().oneOf(['phone', 'email']).required('Type is required'),
//       value: yup.string().required('Value is required').when('type', {
//         is: 'phone',
//         then: yup.string().matches(/^(\+84|84|0)[1-9][0-9]{8,9}$/, 'Invalid Vietnamese phone number'),
//         otherwise: yup.string().email('Invalid email format'),
//       }),
//     })
//   ),
//   addresses: yup.array().of(
//     yup.object().shape({
//       province: yup.string().required('Province is required'),
//       district: yup.string().required('District is required'),
//       ward: yup.string().required('Ward is required'),
//       detailAddress: yup.string().required('Detail address is required'),
//       isDefault: yup.boolean().required(),
//     })
//   ).min(1, 'At least one address is required'),
// });

export default function AddPatient() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    contactInfors: [{ type: 'phone', value: '' }],
    addresses: [
      { province: '', district: '', ward: '', detailAddress: '', isDefault: true },
      { province: '', district: '', ward: '', detailAddress: '', isDefault: false },
    ],
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const fetchProvinces = async () => {
    try {
      const { data } = await axios.get(provincesAPI);
      setProvinces(data.data);
    } catch (error) {
      console.error('Failed to fetch provinces', error);
    }
  };

  const fetchDistricts = async (provinceCode) => {
    try {
      const { data } = await axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceCode}.htm`);
      setDistricts(data.data);
    } catch (error) {
      console.error('Failed to fetch districts', error);
    }
  };

  const fetchWards = async (districtCode) => {
    try {
      const { data } = await axios.get(`https://esgoo.net/api-tinhthanh/3/${districtCode}.htm`);
      setWards(data.data);
    } catch (error) {
      console.error('Failed to fetch wards', error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleProvinceChange = (provinceCode, index) => {
    setFormData(prevState => ({
      ...prevState,
      addresses: prevState.addresses.map((addr, i) =>
        i === index ? { ...addr, district: '', ward: '' } : addr
      ),
    }));
    fetchDistricts(provinceCode);
  };

  const handleDistrictChange = (districtCode, index) => {
    setFormData(prevState => ({
      ...prevState,
      addresses: prevState.addresses.map((addr, i) =>
        i === index ? { ...addr, ward: '' } : addr
      ),
    }));
    fetchWards(districtCode);
  };

  const handleSubmit = async () => {
    try {
      // Validate form data with yup
      //await schema.validate(formData, { abortEarly: false });
      console.log(formData)
      await axios.post(baseURL, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
      
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Add patient successfully!",
        footer: '<a href="/dashboard">Back home?</a>'
      });
      setFormData({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        contactInfors: [{ type: 'phone', value: '' }],
        addresses: [
          { province: '', district: '', ward: '', detailAddress: '', isDefault: true },
          { province: '', district: '', ward: '', detailAddress: '', isDefault: false },
        ],
      });
    } catch (error) {
      
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="/dashboard">Back home?</a>'
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Gender"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <MenuItem value="0">Male</MenuItem>
            <MenuItem value="1">Female</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          />
        </Grid>

        {formData.contactInfors.map((contact, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={5}>
              <TextField
                select
                fullWidth
                label="Contact Type"
                value={contact.type}
                onChange={(e) => {
                  const newContactInfors = [...formData.contactInfors];
                  newContactInfors[index].type = e.target.value;
                  setFormData({ ...formData, contactInfors: newContactInfors });
                }}
              >
                <MenuItem value="phone">Phone</MenuItem>
                <MenuItem value="email">Email</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Value"
                value={contact.value}
                onChange={(e) => {
                  const newContactInfors = [...formData.contactInfors];
                  newContactInfors[index].value = e.target.value;
                  setFormData({ ...formData, contactInfors: newContactInfors });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <IconButton
                color="error"
                onClick={() => {
                  const newContactInfors = formData.contactInfors.filter((_, i) => i !== index);
                  setFormData({ ...formData, contactInfors: newContactInfors });
                }}
                disabled={formData.contactInfors.length === 1}
              >
                <RemoveCircleOutline />
              </IconButton>
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={() => setFormData(prevState => ({
              ...prevState,
              contactInfors: [...prevState.contactInfors, { type: 'phone', value: '' }]
            }))}
            startIcon={<AddCircleOutline />}
          >
            Add Contact
          </Button>
        </Grid>

        {formData.addresses.map((address, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label={`Province ${index === 0 ? '(Primary)' : '(Secondary)'}`}
                value={address.province}
                onChange={(e) => {
                  const newAddress = { ...address, province: e.target.value, district: '', ward: '' };
                  setFormData(prevState => ({
                    ...prevState,
                    addresses: prevState.addresses.map((addr, i) => (i === index ? newAddress : addr)),
                  }));
                  fetchDistricts(e.target.value);
                }}
              >
                {provinces.map(province => (
                  <MenuItem key={province.id} value={province.id}>
                    {province.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="District"
                value={address.district}
                onChange={(e) => {
                  const newAddress = { ...address, district: e.target.value, ward: '' };
                  setFormData(prevState => ({
                    ...prevState,
                    addresses: prevState.addresses.map((addr, i) => (i === index ? newAddress : addr)),
                  }));
                  fetchWards(e.target.value);
                }}
              >
                {districts.map(district => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Ward"
                value={address.ward}
                onChange={(e) => {
                  const newAddresses = [...formData.addresses];
                  newAddresses[index].ward = e.target.value;
                  setFormData({ ...formData, addresses: newAddresses });
                }}
              >
                {wards.map(ward => (
                  <MenuItem key={ward.id} value={ward.id}>
                    {ward.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Detail Address"
                value={address.detailAddress}
                onChange={(e) => {
                  const newAddresses = [...formData.addresses];
                  newAddresses[index].detailAddress = e.target.value;
                  setFormData({ ...formData, addresses: newAddresses });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                label="Default Address"
                value={address.isDefault}
                onChange={(e) => {
                  const newAddresses = formData.addresses.map((addr, i) =>
                    i === index ? { ...addr, isDefault: e.target.value === 'true' } : addr
                  );
                  setFormData({ ...formData, addresses: newAddresses });
                }}
              >
                <MenuItem value={true}>Primary</MenuItem>
                <MenuItem value={false}>Secondary</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} />
          </React.Fragment>
        ))}
        
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={() => setFormData(prevState => ({
              ...prevState,
              addresses: [...prevState.addresses, { province: '', district: '', ward: '', detailAddress: '', isDefault: false }]
            }))}
            startIcon={<AddCircleOutline />}
          >
            Add Address
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="primary"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
