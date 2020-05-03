import React, { useCallback } from 'react';
import { string, shape, bool } from 'prop-types';
import {
  SimpleForm, TextInput, SelectInput, FormDataConsumer, required,
} from 'react-admin';
import { useField, useForm } from 'react-final-form';
import AceEditor from 'react-ace';
import { FormHelperText } from '@material-ui/core';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

import validate from './validator';

const PythonCodeInput = ({ name }) => {
  const {
    input: { onChange, value },
    meta: { error, touched },
  } = useField(name);

  return (
    <div>
      <AceEditor
        placeholder="Python code"
        mode="python"
        theme="github"
        name={name}
        onChange={onChange}
        fontSize={14}
        showPrintMargin
        showGutter
        value={value || ''}
        enableBasicAutocompletion
        enableLiveAutocompletion
        width="100%"
      />
      <FormHelperText error={!!error} >
        { touched && error }
      </FormHelperText>
    </div>
  );
};

PythonCodeInput.propTypes = {
  name: string.isRequired,
};

const requiredValidator = required();

const EmulationTypeInput = ({ formData, ...rest }) => {
  const form = useForm();

  return (
    <>
      <SelectInput
        source="emulationType"
        choices={[
          {
            id: 'SOFTWARE',
            name: 'Software',
          },
          {
            id: 'HARDWARE',
            name: 'Hardware',
          },
        ]}
        onChange={() => form.change('pythonCode', null)}
        {...rest}
        fullWidth={false}
        validate={[requiredValidator]}
      />
      { formData.emulationType === 'SOFTWARE' && (
        <PythonCodeInput
          name="pythonCode"
        />
      ) }
    </>
  );
};

EmulationTypeInput.propTypes = {
  formData: shape({
    emulationType: string,
  }).isRequired,
};

const EmulatorForm = ({ skipId, ...rest }) => {
  const emulationTypeInput = useCallback((inputProps) => (
    <EmulationTypeInput {...inputProps} />
  ), []);

  return (
    <SimpleForm
      {...rest}
      validate={validate}
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
      <FormDataConsumer
        fullWidth
      >
        { emulationTypeInput }
      </FormDataConsumer>
    </SimpleForm>
  );
};

EmulatorForm.propTypes = {
  skipId: bool,
};

export default EmulatorForm;
