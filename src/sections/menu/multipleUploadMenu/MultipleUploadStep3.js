import PropTypes from 'prop-types';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';

MultipleUploadStep3.propTypes = {
  menuData: PropTypes.array,
};

export default function MultipleUploadStep3({ menuData }) {
  const [expanded, setExpanded] = React.useState([]);

  const handleAccordionChange = (panel) => (event, newExpanded) => {
    // setExpanded(!expanded);
    if (!expanded.includes(panel)) {
      setExpanded((prev) => [...prev, panel]);
    } else {
      console.log('else', panel);
      // expanded.splice(panel
      const filtered = expanded.filter((val) => val !== panel);
      console.log('filtered', filtered);
      setExpanded(filtered);
    }
  };
  const groupedMenu = menuData.reduce((acc, item) => {
    if (!acc[item.categoryName]) {
      acc[item.categoryName] = [];
    }
    acc[item.categoryName].push(item);
    return acc;
  }, {});

  console.log('groupedMenu', groupedMenu);
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', columnGap: 2 }}>
        <Typography>Take a moment to verify that the items are correctly identified.</Typography>
        <Typography>
          Food items have default images, and you have to upload the actual images later.
        </Typography>
      </Box>
      <Box
        sx={{
          maxHeight: '250px',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '5px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#BB3138',
            borderRadius: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
          },
        }}
      >
        {Object.entries(groupedMenu).map(([category, items], index) => (
          <Accordion
            expanded={expanded.includes(`panel${index}`)}
            onChange={handleAccordionChange(`panel${index}`)}
            key={category}
            sx={{
              borderRadius: '4px',
              border: '1px solid #F3F3F4',
              background: '#FFF',
              boxShadow: expanded ? '0px 2px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
              marginBottom: '5px',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                borderRadius: ' 8px',
                background: '#FFF',
                boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Typography>{category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {items.map((item) => (
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <img
                    src="/assets/images/home/menulisticonAccordian.svg"
                    alt="defaultimg"
                    style={{ width: '10px', height: '10px' }}
                  />
                  <Typography key={item.name}>{item.name}</Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </div>
  );
}
