import React from 'react';
import { ActionDelegate, useAppDispatch, useAppSelector } from 'store';
import {
  IContributorModel,
  IFilterModel,
  IFolderModel,
  IMinisterModel,
  ISystemMessageModel,
  IUserModel,
} from 'tno-core';

import { storeContributors } from '../lookup';
import {
  storeMyFilters,
  storeMyFolders,
  storeMyMinisters,
  storeMyProfile,
  storeSystemMessages,
} from '.';
import { IProfileState } from './interfaces';

export interface IProfileStore {
  storeMyProfile: (user: IUserModel | ActionDelegate<IUserModel | undefined> | undefined) => void;
  storeMyFilters: (folders: IFilterModel[] | ActionDelegate<IFilterModel[]>) => void;
  storeMyFolders: (folders: IFolderModel[] | ActionDelegate<IFolderModel[]>) => void;
  storeContributors: (
    contributors: IContributorModel[] | ActionDelegate<IContributorModel[]>,
  ) => void;
  storeMyMinisters: (ministers: IMinisterModel[] | ActionDelegate<IMinisterModel[]>) => void;
  storeSystemMessages: (
    ministers: ISystemMessageModel[] | ActionDelegate<ISystemMessageModel[]>,
  ) => void;
}

export const useProfileStore = (): [IProfileState, IProfileStore] => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((store) => store.profile);

  const controller = React.useMemo(
    () => ({
      storeMyProfile: (user: IUserModel | ActionDelegate<IUserModel | undefined> | undefined) => {
        if (typeof user === 'function') {
          dispatch(storeMyProfile(user(state.profile)));
        } else dispatch(storeMyProfile(user));
      },
      storeMyFilters: (filters: IFilterModel[] | ActionDelegate<IFilterModel[]>) => {
        if (typeof filters === 'function') {
          dispatch(storeMyFilters(filters(state.myFilters)));
        } else dispatch(storeMyFilters(filters));
      },
      storeMyFolders: (folders: IFolderModel[] | ActionDelegate<IFolderModel[]>) => {
        if (typeof folders === 'function') {
          dispatch(storeMyFolders(folders(state.myFolders)));
        } else dispatch(storeMyFolders(folders));
      },
      storeMyMinisters: (ministers: IMinisterModel[] | ActionDelegate<IMinisterModel[]>) => {
        if (typeof ministers === 'function') {
          dispatch(storeMyMinisters(ministers(state.myMinisters)));
        } else dispatch(storeMyMinisters(ministers));
      },
      storeContributors: (
        contributors: IContributorModel[] | ActionDelegate<IContributorModel[]>,
      ) => {
        if (typeof contributors === 'function') {
          dispatch(storeContributors(contributors(state.contributors)));
        } else dispatch(storeContributors(contributors));
      },
      storeSystemMessages: (
        systemMessages: ISystemMessageModel[] | ActionDelegate<ISystemMessageModel[]>,
      ) => {
        if (typeof systemMessages === 'function') {
          dispatch(storeSystemMessages(systemMessages(state.systemMessages)));
        } else dispatch(storeSystemMessages(systemMessages));
      },
    }),
    [
      dispatch,
      state.profile,
      state.myFilters,
      state.myFolders,
      state.myMinisters,
      state.systemMessages,
      state.contributors,
    ],
  );

  return [state, controller];
};
