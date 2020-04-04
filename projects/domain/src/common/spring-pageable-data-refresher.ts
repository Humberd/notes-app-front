import { PageableDataRefresher, PageOptions } from '@ng-boost/core';
import { ViewList, ViewListExtra } from './view-list';
import { RefresherDataSource } from '@ng-boost/core/lib/refresher/refresher';

export abstract class SpringPageableDataRefresher<DataType> extends PageableDataRefresher<ViewList<DataType>, DataType> {
  private _extra: ViewListExtra;

  get extra() {
    return this._extra;
  }

  protected abstract getPageableDataSource(pageOptions: PageOptions): RefresherDataSource<ViewList<DataType>>

  protected parseSourceData(sourceData: ViewList<DataType>): DataType[] {
    this.totalItemsCount = sourceData.extra.totalElements;
    this._extra = sourceData.extra;
    return sourceData.data;
  }
}
