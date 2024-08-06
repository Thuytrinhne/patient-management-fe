import { Helmet } from 'react-helmet-async';

import { AddPatientView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function AddPatient() {
  return (
    <>
      <Helmet>
        <title> Add Patient  </title>
      </Helmet>

      <AddPatientView/>
    </>
  );
}
