import { ISourceModel } from 'tno-core';

import { ISourceForm } from '../interfaces';

export const toModel = (form: ISourceForm): ISourceModel => {
  return {
    ...form,
    productId: form.productId === '' ? undefined : form.productId,
    ownerId: form.ownerId === '' ? undefined : form.ownerId,
    configuration: {
      ...form.configuration,
      timeZone: form.configuration.timeZone === '' ? undefined : form.configuration.timeZone,
    },
  };
};
