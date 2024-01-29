import PropTypes from 'prop-types';
// @mui
import { Box, Link, Stack, Typography, Breadcrumbs, Grid, useMediaQuery } from '@mui/material';
//
import LinkItem from './LinkItem';
import SvgColor from '../svg-color/SvgColor';

// ----------------------------------------------------------------------

CustomBreadcrumbs.propTypes = {
  sx: PropTypes.object,
  action: PropTypes.node,
  links: PropTypes.array,
  heading: PropTypes.string,
  moreLink: PropTypes.array,
  activeLast: PropTypes.bool,
  iconName: PropTypes.string,
};

export default function CustomBreadcrumbs({
  links,
  iconName,
  action,
  heading,
  moreLink,
  activeLast,
  sx,
  ...other
}) {
  const lastLink = links[links.length - 1].name;
  const isMobileScreen = useMediaQuery('(max-width:475px)');
  console.log('isMobileScreen', isMobileScreen);

  console.log('icon', iconName);
  return (
    <Box
      sx={{
        height: '85px',
        marginTop: '20px',

        backgroundColor: '#BB3138',
        // marginInline: '0px',
        color: 'white',
        // paddingInline: '20px',
        // paddingTop: '9px',
        marginBottom: '5px !important',
        p: '10px 16px 5px 16px',
        // marginLeft: '15px',
        // justifyContent:"space-between",
        borderRadius: '10px',
        // display: 'flex',
        //  m:"20px"
      }}
    >
      <Box
      // sx={{display:"flex"}}
      >
        {/* <SvgColor
        sx={{
          width: '45px',
          height: '40px',
          marginTop: '11px',
          marginRight: '20px',
        }}
        alt="iconName"
        // src='/assets/icons/navbar/Dash_Vec.svg'
        src={iconName}
      /> */}

        <Box sx={{ mb: 1, ...sx }}>
          <Stack direction="row" alignItems="center">
            <SvgColor
              sx={{
                width: '45px',
                height: '40px',
                // marginTop: '11px',
                marginRight: '20px',
              }}
              alt="iconName"
              // src='/assets/icons/navbar/Dash_Vec.svg'
              src={iconName}
            />
            <Box sx={{ flexGrow: 1 }}>
              {/* HEADING */}
              {heading && <Typography variant="h4">{heading}</Typography>}

              {/* BREADCRUMBS */}
              {!isMobileScreen && (
                <Breadcrumbs separator={<Separator />} {...other}>
                  {links?.map((link) => (
                    <LinkItem
                      // sx={{marginBottom:"5px"}}
                      key={link.name || ''}
                      link={link}
                      activeLast={activeLast}
                      disabled={link.name === lastLink}
                    />
                  ))}
                </Breadcrumbs>
              )}
            </Box>
            {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
          </Stack>
        </Box>

        {/* MORE LINK */}
        {!!moreLink && (
          <Box sx={{ mt: 2 }}>
            {moreLink.map((href) => (
              <Link
                noWrap
                key={href}
                href={href}
                variant="body2"
                target="_blank"
                rel="noopener"
                sx={{ display: 'table' }}
              >
                {href}
              </Link>
            ))}
          </Box>
        )}
      </Box>
      {/* <Box
      sx={{
        display:"flex",
        alignItems:"center"
      }}> 
          {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
          </Box> */}
    </Box>
  );
}

// ----------------------------------------------------------------------

function Separator() {
  return (
    <Box component="span" sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'white' }} />
  );
}
