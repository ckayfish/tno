import { AxiosResponse } from 'axios';
import React from 'react';

import { defaultEnvelope, ILifecycleToasts } from '../../summon';
import { IChartPreviewRequestModel, IChartResultModel, IChartTemplateModel, useApi } from '..';

/**
 * Common hook to make requests to the API.
 * @returns CustomAxios object setup for the API.
 */
export const useApiAdminChartTemplates = (
  options: {
    lifecycleToasts?: ILifecycleToasts;
    selector?: Function;
    envelope?: typeof defaultEnvelope;
    baseURL?: string;
  } = {},
) => {
  const api = useApi(options);

  return React.useRef({
    findAllChartTemplates: () => {
      return api.get<IChartTemplateModel[], AxiosResponse<IChartTemplateModel[]>, any>(
        `/admin/chart/templates`,
      );
    },
    getChartTemplate: (id: number) => {
      return api.get<IChartTemplateModel, AxiosResponse<IChartTemplateModel>, any>(
        `/admin/chart/templates/${id}`,
      );
    },
    addChartTemplate: (model: IChartTemplateModel) => {
      return api.post<IChartTemplateModel, AxiosResponse<IChartTemplateModel>, any>(
        `/admin/chart/templates`,
        model,
      );
    },
    updateChartTemplate: (model: IChartTemplateModel) => {
      return api.put<IChartTemplateModel, AxiosResponse<IChartTemplateModel>, any>(
        `/admin/chart/templates/${model.id}`,
        model,
      );
    },
    deleteChartTemplate: (model: IChartTemplateModel) => {
      return api.delete<IChartTemplateModel, AxiosResponse<IChartTemplateModel>, any>(
        `/admin/chart/templates/${model.id}`,
        {
          data: model,
        },
      );
    },
    previewJson: (model: IChartPreviewRequestModel) => {
      return api.post<IChartPreviewRequestModel, AxiosResponse<IChartResultModel>, any>(
        `/admin/chart/templates/preview/json`,
        model,
      );
    },
    previewBase64: (model: IChartPreviewRequestModel) => {
      return api.post<IChartPreviewRequestModel, AxiosResponse<string>, any>(
        `/admin/chart/templates/preview/base64`,
        model,
      );
    },
    previewImage: (model: IChartPreviewRequestModel) => {
      return api.post<IChartPreviewRequestModel, AxiosResponse<any>, any>(
        `/admin/chart/templates/preview/image`,
        model,
      );
    },
  }).current;
};
