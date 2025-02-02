import {
  ContentStatusName,
  ContentTypeName,
  IAuditColumnsModel,
  ILicenseModel,
  IProductModel,
  ISeriesModel,
  IUserModel,
} from '..';
import {
  IContentActionModel,
  IContentLabelModel,
  IContentLinkModel,
  IContentTagModel,
  IContentTonePoolModel,
  IContentTopicModel,
  IContributorModel,
  IFileReferenceModel,
  ISourceModel,
  ITimeTrackingModel,
} from '.';

export interface IContentModel extends IAuditColumnsModel {
  id: number;
  status: ContentStatusName;
  contentType: ContentTypeName;
  licenseId: number;
  license?: ILicenseModel;
  sourceId?: number;
  source?: ISourceModel;
  otherSource: string;
  productId: number;
  product?: IProductModel;
  seriesId?: number;
  series?: ISeriesModel;
  contributorId?: number;
  contributor?: IContributorModel;
  otherSeries?: string;
  ownerId?: number;
  owner?: IUserModel;
  headline: string;
  byline: string;
  uid?: string;
  edition: string;
  section: string;
  page: string;
  publishedOn: string;
  summary: string;
  body?: string;
  sourceUrl?: string;
  isHidden: boolean;
  isApproved: boolean;
  actions?: IContentActionModel[];
  tags?: IContentTagModel[];
  labels?: IContentLabelModel[];
  topics?: IContentTopicModel[];
  tonePools?: IContentTonePoolModel[];
  timeTrackings?: ITimeTrackingModel[];
  fileReferences?: IFileReferenceModel[];
  links?: IContentLinkModel[];

  // React-Table Properties
  // TODO: Should not be part of the API interface.
  isSelected?: boolean;
}
