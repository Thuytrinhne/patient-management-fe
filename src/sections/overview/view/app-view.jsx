import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientStatisticsToday, fetchPatientTotal } from 'src/features/static/static';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function AppView() {
  const dispatch = useDispatch();
  const { data, total, loading, loadingTotal, error, errorTotal } = useSelector((state) => state.patientStatistics);

  useEffect(() => {
    dispatch(fetchPatientStatisticsToday());
    dispatch(fetchPatientTotal())
  }, [dispatch]);
  
  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  console.log(data)
  console.log(total)
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Patient"
            total={total?.totalPatient || 0}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Actived Total"
            total={total?.activedTotal || 0}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Deactived Total"
            total={total?.deactivedTotal || 0}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Today New Patient"
            total={data?.todayNewPatient || 0}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Status"
            chart={{
              series: [
                { label: 'Actived Total', value: total?.activedTotal || 0 },
                { label: 'Deactived Total', value: total?.deactivedTotal || 0 },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
