// import isEmpty from 'lodash.isempty';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SpectralScanInputs } from 'SpectralScan/ConfigurationTab/types';
import { initialValues } from 'SpectralScan/ConfigurationTab/constants';
import { useSchema } from 'SpectralScan/ConfigurationTab/hooks/useSchema';

export const useFormConfig = () => {
  const schema = useSchema();

  const {
    reset,
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<SpectralScanInputs>({
    mode: 'onChange',
    delayError: undefined,
    shouldFocusError: true,
    shouldUnregister: false,
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    shouldUseNativeValidation: false,
  });

  const showConfirm = isDirty && !isSubmitting;

  // const isDisabledSubmit =
  //  (!isDirty && isEmpty(touchedFields)) || !isEmpty(errors);
  const isDisabledSubmit = false;

  return {
    reset,
    errors,
    control,
    setValue,
    register,
    getValues,
    showConfirm,
    handleSubmit,
    isDisabledSubmit,
  };
};
