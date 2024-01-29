import PropTypes from 'prop-types';
import { Box, Card, Container, Grid, Skeleton, Stack } from '@mui/material';

SkeletonUser.propTypes = {
  count: PropTypes.number,
};
function SkeletonUser({ count }) {
  const skeleton = Array.from({ length: count }, (_, index) => (
    <Box item display="flex" flexDirection="row">
      <Card
        sx={{
          borderRadius: '8px',
          backgroundColor: '#FFF',
          boxShadow: '0px 4px 4px 2px rgba(0 0 0 0.05)',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          width: '359px',
          height: '82px',
          justifyContent: 'space-between',
        }}
      >
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
      </Card>
    </Box>
  ));
  return (
    // <Box item display="flex" flexDirection="row">
    //   <Card
    //     sx={{
    //       borderRadius: '8px',
    //       backgroundColor: '#FFF',
    //       boxShadow: '0px 4px 4px 2px rgba(0 0 0 0.05)',
    //       p: 2,
    //       display: 'flex',
    //       alignItems: 'center',
    //       width: '359px',
    //       height: '82px',
    //       justifyContent: 'space-between',
    //     }}
    //   >
    //     <Skeleton animation="wave" variant="circular" width={40} height={40} />

    //     <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />

    //     {/* <Skeleton   animation="wave" height={10} width="40%"   /> */}
    //   </Card>
    // </Box>
    <>{skeleton}</>
  );
}

export default SkeletonUser;
