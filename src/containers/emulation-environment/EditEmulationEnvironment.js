import React, { useCallback, useState } from 'react';
import { shape, string } from 'prop-types';
import { Edit, SaveButton, Toolbar } from 'react-admin';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

import EmulationEnvironmentForm from './EmulationEnvironmentForm';
import { startEmulation, stopEmulation } from '../../providers/data/emulation-environments';

const redTheme = createMuiTheme({ palette: { primary: red } });
const greenTheme = createMuiTheme({ palette: { primary: green } });

const CustomButtons = ({ record: { _id } }) => {
  const [processing, setProcessing] = useState(false);

  const onStart = useCallback(() => {
    setProcessing(true);
    startEmulation({ _id })
      .then(() => setProcessing(false))
      .catch((error) => {
        console.error(error);
        setProcessing(false);
      });
  }, [_id]);

  const onStop = useCallback(() => {
    setProcessing(true);
    stopEmulation({ _id })
      .then(() => setProcessing(false))
      .catch((error) => {
        console.error(error);
        setProcessing(false);
      });
  }, [_id]);

  return (
    <>
      <MuiThemeProvider theme={greenTheme}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlayArrowIcon />}
          onClick={onStart}
          className="play-button"
          disabled={processing}
        >
          { 'Start' }
        </Button>
      </MuiThemeProvider>
      <MuiThemeProvider theme={redTheme}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<StopIcon />}
          onClick={onStop}
          disabled={processing}
        >
          { 'Stop' }
        </Button>
      </MuiThemeProvider>
    </>
  );
};

CustomButtons.propTypes = {
  record: shape({ _id: string }),
};

const EmulationEnvironmentToolbar = (props) => (
  <Toolbar {...props} >
    <SaveButton />
    <CustomButtons />
  </Toolbar>
);

const EditEmulationEnvironment = (props) => (
  <Edit
    {...props}
    title="Edit Emulation environment"
    undoable={false}
  >
    <EmulationEnvironmentForm
      toolbar={<EmulationEnvironmentToolbar />}
    />
  </Edit>
);

export default EditEmulationEnvironment;
