import React from 'react';
import { useAjaxWrapper } from 'store/hooks';
import {
  IReportInstanceModel,
  IReportResultModel,
  useApiSubscriberReportInstances,
} from 'tno-core';

interface IReportInstanceController {
  getReportInstance: (id: number) => Promise<IReportInstanceModel | undefined>;
  addReportInstance: (model: IReportInstanceModel) => Promise<IReportInstanceModel>;
  updateReportInstance: (model: IReportInstanceModel) => Promise<IReportInstanceModel>;
  deleteReportInstance: (model: IReportInstanceModel) => Promise<IReportInstanceModel>;
  previewReportInstance: (id: number) => Promise<IReportResultModel>;
  sendReportInstance: (id: number, to: string) => Promise<IReportInstanceModel>;
  publishReportInstance: (id: number) => Promise<IReportInstanceModel>;
}

export const useReportInstances = (): [IReportInstanceController] => {
  const api = useApiSubscriberReportInstances();
  const dispatch = useAjaxWrapper();

  const controller = React.useMemo(
    () => ({
      getReportInstance: async (id: number) => {
        const response = await dispatch<IReportInstanceModel | undefined>(
          'get-report-instance',
          () => api.getReportInstance(id),
        );
        return response.data;
      },
      addReportInstance: async (model: IReportInstanceModel) => {
        const response = await dispatch<IReportInstanceModel>('add-report-instance', () =>
          api.addReportInstance(model),
        );
        return response.data;
      },
      updateReportInstance: async (model: IReportInstanceModel) => {
        const response = await dispatch<IReportInstanceModel>('update-report-instance', () =>
          api.updateReportInstance(model),
        );
        return response.data;
      },
      deleteReportInstance: async (model: IReportInstanceModel) => {
        const response = await dispatch<IReportInstanceModel>('delete-report-instance', () =>
          api.deleteReportInstance(model),
        );
        return response.data;
      },
      previewReportInstance: async (id: number) => {
        const response = await dispatch<IReportResultModel>('preview-report-instance', () =>
          api.previewReportInstance(id),
        );
        return response.data;
      },
      sendReportInstance: async (id: number, to: string) => {
        const response = await dispatch<IReportInstanceModel>('send-report-instance', () =>
          api.sendReportInstance(id, to),
        );
        return response.data;
      },
      publishReportInstance: async (id: number) => {
        const response = await dispatch<IReportInstanceModel>('publish-report-instance', () =>
          api.publishReportInstance(id),
        );
        return response.data;
      },
    }),
    [api, dispatch],
  );

  return [controller];
};
