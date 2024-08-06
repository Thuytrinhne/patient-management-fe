import { Helmet } from 'react-helmet-async';

import { EditPatientView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function AddPatient() {
  return (
    <>
      <Helmet>
        <title> Edit Patient  </title>
      </Helmet>

      <EditPatientView/>
    </>
  );
}
