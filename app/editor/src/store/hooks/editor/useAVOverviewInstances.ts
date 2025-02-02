import React from 'react';
import { useAjaxWrapper } from 'store/hooks';
import { IAVOverviewInstanceModel, IReportResultModel, useApiEditorAVOverviews } from 'tno-core';

interface IAVOverviewController {
  findAVOverview: (publishedOn: Date | string) => Promise<IAVOverviewInstanceModel | undefined>;
  getAVOverview: (id: number) => Promise<IAVOverviewInstanceModel | undefined>;
  addAVOverview: (model: IAVOverviewInstanceModel) => Promise<IAVOverviewInstanceModel>;
  updateAVOverview: (model: IAVOverviewInstanceModel) => Promise<IAVOverviewInstanceModel>;
  deleteAVOverview: (model: IAVOverviewInstanceModel) => Promise<IAVOverviewInstanceModel>;
  previewAVOverview: (instanceId: number) => Promise<IReportResultModel>;
  publishAVOverview: (instanceId: number) => Promise<IAVOverviewInstanceModel>;
}

export const useAVOverviewInstances = (): [IAVOverviewController] => {
  const api = useApiEditorAVOverviews();
  const dispatch = useAjaxWrapper();

  const controller = React.useMemo(
    () => ({
      findAVOverview: async (publishedOn: Date | string) => {
        const response = await dispatch<IAVOverviewInstanceModel | undefined>(
          'find-av-overviews',
          () => api.findAVOverview(publishedOn),
        );
        return response.data;
      },
      getAVOverview: async (id: number) => {
        const response = await dispatch<IAVOverviewInstanceModel | undefined>(
          'get-av-overview',
          () => api.getAVOverview(id),
        );
        return response.data;
      },
      addAVOverview: async (model: IAVOverviewInstanceModel) => {
        const response = await dispatch<IAVOverviewInstanceModel>('add-av-overview', () =>
          api.addAVOverview(model),
        );
        return response.data;
      },
      updateAVOverview: async (model: IAVOverviewInstanceModel) => {
        const response = await dispatch<IAVOverviewInstanceModel>('update-av-overview', () =>
          api.updateAVOverview(model),
        );
        return response.data;
      },
      deleteAVOverview: async (model: IAVOverviewInstanceModel) => {
        const response = await dispatch<IAVOverviewInstanceModel>('delete-av-overview', () =>
          api.deleteAVOverview(model),
        );
        return response.data;
      },
      previewAVOverview: async (instanceId: number) => {
        const response = await dispatch<IReportResultModel>('preview-av-overview', () =>
          api.previewAVOverview(instanceId),
        );
        return response.data;
      },
      publishAVOverview: async (instanceId: number) => {
        const response = await dispatch<IAVOverviewInstanceModel>('publish-av-overview', () =>
          api.publishAVOverview(instanceId),
        );
        return response.data;
      },
    }),
    [api, dispatch],
  );

  return [controller];
};
