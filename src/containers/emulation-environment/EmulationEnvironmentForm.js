import React from 'react';
import {
  any, bool, func, object,
} from 'prop-types';
import {
  SimpleForm, TextInput, SelectInput, FormDataConsumer,
  required, ArrayInput, SimpleFormIterator, ReferenceInput, NumberInput,
} from 'react-admin';
import { useForm } from 'react-final-form';
import { FormLabel, FormGroup } from '@material-ui/core';

import EnvironmentCanvas from './EnvironmentCanvas';
import {
  COMMANDS,
  ENVIRONMENT_HEIGHT, ENVIRONMENT_WIDTH, EVENT_TRIGGERS, ITERATION_TRIGERS, TRIGGERS,
} from '../../config';

const requiredValidator = required();

const triggers = Object.entries(TRIGGERS).reduce((options, [id, name]) => ([
  ...options,
  { id, name },
]), []);

const commands = Object.entries(COMMANDS).reduce((options, [id, name]) => ([
  ...options,
  { id, name },
]), []);


const PlaceHeaterForm = ({ getSource, ...rest }) => (
  <div>
    <div>
      <TextInput
        source={getSource('params.id')}
        validate={requiredValidator}
        {...rest}
        label="ID"
      />
      <NumberInput
        source={getSource('params.temperature')}
        validate={requiredValidator}
        {...rest}
        label="Temperature"
      />
    </div>
    <div>
      <NumberInput
        source={getSource('params.x')}
        validate={requiredValidator}
        {...rest}
        label="X Coordinate"
      />
      <NumberInput
        source={getSource('params.y')}
        validate={requiredValidator}
        {...rest}
        label="Y Coordinate"
      />
    </div>
  </div>
);

PlaceHeaterForm.propTypes = {
  getSource: func,
};

const RemoveHeaterForm = ({ getSource, ...rest }) => (
  <div>
    <TextInput
      source={getSource('params.id')}
      validate={requiredValidator}
      {...rest}
      label="ID"
    />
  </div>
);

RemoveHeaterForm.propTypes = {
  getSource: func,
};

const SetTemperatureForm = ({ getSource, ...rest }) => (
  <div>
    <div>
      <NumberInput
        source={getSource('params.value')}
        validate={requiredValidator}
        {...rest}
        label="Temperature"
      />
    </div>
    <FormLabel component="legend">{ 'Coordinates of upper left corner' }</FormLabel>
    <FormGroup row>
      <NumberInput
        source={getSource('params.from.x')}
        validate={requiredValidator}
        {...rest}
        label="X Coordinate"
      />
      <NumberInput
        source={getSource('params.from.y')}
        validate={requiredValidator}
        {...rest}
        label="Y Coordinate"
      />
    </FormGroup>
    <FormLabel component="legend">{ 'Coordinates of bottom right corner' }</FormLabel>
    <FormGroup row>
      <NumberInput
        source={getSource('params.to.x')}
        validate={requiredValidator}
        {...rest}
        label="X Coordinate"
      />
      <NumberInput
        source={getSource('params.to.y')}
        validate={requiredValidator}
        {...rest}
        label="Y Coordinate"
      />
    </FormGroup>
  </div>
);

SetTemperatureForm.propTypes = {
  getSource: func,
};

const SetHumidityForm = ({ getSource, ...rest }) => (
  <div>
    <div>
      <NumberInput
        source={getSource('params.value')}
        validate={requiredValidator}
        {...rest}
        label="Humidity"
      />
    </div>

    <FormLabel component="legend">{ 'Coordinates of upper left corner' }</FormLabel>
    <FormGroup row>
      <NumberInput
        source={getSource('params.from.x')}
        validate={requiredValidator}
        {...rest}
        label="X Coordinate"
      />
      <NumberInput
        source={getSource('params.from.y')}
        validate={requiredValidator}
        {...rest}
        label="Y Coordinate"
      />
    </FormGroup>
    <FormLabel component="legend">{ 'Coordinates of bottom right corner' }</FormLabel>
    <FormGroup row>
      <NumberInput
        source={getSource('params.to.x')}
        validate={requiredValidator}
        {...rest}
        label="X Coordinate"
      />
      <NumberInput
        source={getSource('params.to.y')}
        validate={requiredValidator}
        {...rest}
        label="Y Coordinate"
      />
    </FormGroup>
  </div>
);

SetHumidityForm.propTypes = {
  getSource: func,
};

const SetPressureForm = ({ getSource, ...rest }) => (
  <div>
    <div>
      <NumberInput
        source={getSource('params.value')}
        validate={requiredValidator}
        {...rest}
        label="Pressure"
      />
    </div>
  </div>
);

SetPressureForm.propTypes = {
  getSource: func,
};

const CommandParamsForm = ({ scopedFormData, getSource, ...rest }) => {
  if (!scopedFormData) {
    return null;
  }

  switch (scopedFormData.command) {
  case COMMANDS.PLACE_HEATER:
    return (
      <PlaceHeaterForm
        getSource={getSource}
        {...rest}
      />
    );
  case COMMANDS.REMOVE_HEATER:
    return (
      <RemoveHeaterForm
        getSource={getSource}
        {...rest }
      />
    );
  case COMMANDS.SET_HUMIDITY:
    return (
      <SetHumidityForm
        getSource={getSource}
        {...rest}
      />
    );
  case COMMANDS.SET_TEMPERATURE:
    return (
      <SetTemperatureForm
        getSource={getSource}
        {...rest}
      />
    );
  case COMMANDS.SET_PRESSURE:
    return (
      <SetPressureForm
        getSource={getSource}
        {...rest}
      />
    );
  default:
    return null;
  }
};

CommandParamsForm.propTypes = {
  getSource: func,
  scopedFormData: object,
};

const CommandForm = ({ scopedFormData, getSource, ...rest }) => {
  const form = useForm();

  const triggerSource = getSource('trigger');
  const eventSource = getSource('event');
  const iterationSource = getSource('iteration');
  const paramsSource = getSource('params');

  return (
    <>
      <div>
        <SelectInput
          source={triggerSource}
          choices={triggers}
          validate={requiredValidator}
          {...rest}
          label="Trigger"
          onChange={() => {
            form.change(eventSource, null);
            form.change(iterationSource, null);
          }}
          translateChoice={false}
        />
        {
          scopedFormData && EVENT_TRIGGERS[scopedFormData.trigger] && (
            <TextInput
              source={eventSource}
              validate={requiredValidator}
              {...rest}
              label="Event"
            />
          )
        }
        {
          scopedFormData && ITERATION_TRIGERS[scopedFormData.trigger] && (
            <NumberInput
              source={iterationSource}
              validate={requiredValidator}
              {...rest}
              min={0}
              step={1}
              label="Iteration"
            />
          )
        }
      </div>
      <SelectInput
        source={getSource('command')}
        choices={commands}
        translateChoice={false}
        onChange={() => form.change(paramsSource, null)}
        validate={requiredValidator}
        {...rest}
        label="Command"
      />
      <CommandParamsForm
        scopedFormData={scopedFormData}
        getSource={getSource}
        {...rest}
      />
    </>
  );
};

CommandForm.propTypes = {
  getSource: func,
  scopedFormData: object,
};

const CommandItemForm = (props) => (
  <FormDataConsumer {...props}>
    { CommandForm }
  </FormDataConsumer>
);

const EmulatorForm = ({ getSource, ...props }) => (
  <>
    <div>
      <ReferenceInput
        validate={requiredValidator}
        {...props}
        label="Emulator"
        source={getSource('emulator')}
        reference="emulators"
      >
        <SelectInput
          optionText="name"
          fullWidth={false}
        />
      </ReferenceInput>
    </div>
    <NumberInput
      {...props}
      source={getSource('x')}
      label="X Coordinate"
      min={0}
      max={ENVIRONMENT_WIDTH - 1}
      step={1}
      fullWidth={false}
      validate={requiredValidator}
    />
    <NumberInput
      {...props}
      source={getSource('y')}
      label="Y Coordinate"
      min={0}
      max={ENVIRONMENT_HEIGHT - 1}
      step={1}
      fullWidth={false}
      validate={requiredValidator}
    />
  </>
);

EmulatorForm.propTypes = {
  getSource: func,
};

const EmulationEnvironmentForm = ({ skipId, toolbar, ...rest }) => (
  <SimpleForm
    {...rest}
    toolbar={toolbar}
    warnWhenUnsavedChanges
  >
    {
      !skipId && (
        <TextInput
          source="_id"
          disabled
          label="ID"
        />
      )
    }
    <TextInput
      source="name"
      validate={[requiredValidator]}
    />
    <FormDataConsumer>
      {
        ({ formData }) => (
          <EnvironmentCanvas
            { ...formData }
            onSelect={() => {}}
          />
        )
      }
    </FormDataConsumer>
    <ArrayInput source="emulators">
      <SimpleFormIterator>
        <FormDataConsumer>
          { EmulatorForm }
        </FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
    <ArrayInput source="commands">
      <SimpleFormIterator>
        <CommandItemForm />
      </SimpleFormIterator>
    </ArrayInput>
  </SimpleForm>
);

EmulationEnvironmentForm.propTypes = {
  skipId: bool,
  toolbar: any,
};

export default EmulationEnvironmentForm;
