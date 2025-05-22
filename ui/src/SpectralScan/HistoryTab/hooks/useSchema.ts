import { useIntl } from 'react-intl';
import { array, boolean, number, object, string } from 'yup';

export const useSchema = () => {
  const { formatMessage } = useIntl();

  return object({
    start_frequency: number(),
    channel_number: number(),
    point_number: number(),
    rssi_offset: number(),
    masked: string(),
    file: object(),
    text: string().when(['switch'], switchField => {
      if (switchField) {
        return string()
          .min(
            3,
            formatMessage({ id: 'thisFieldShouldBeAtLeast' }, { length: 3 }),
          )
          .max(
            15,
            formatMessage(
              { id: 'thisFieldShouldNotBeLongerThen' },
              { length: 15 },
            ),
          )
          .matches(/[0-9A-Za-z]/g, formatMessage({ id: 'invalidCharacters' }))
          .required(formatMessage({ id: 'thisFieldCannotBeEmpty' }));
      }
      return string();
    }),
    textarea: string(),
    select: string(),
    radio: string(),
    switch: boolean(),
    number: string(),
    numbers: array().when(['switch'], switchField => {
      if (switchField) {
        return array()
          .min(
            1,
            formatMessage({ id: 'youCannotAddLessThanMinItems' }, { min: 1 }),
          )
          .max(
            3,
            formatMessage({ id: 'youCannotAddMoreThanMaxItems' }, { max: 3 }),
          );
      }
      return array();
    }),
  });
};
