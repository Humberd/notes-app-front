export abstract class PageableRequest {
  pageNumber?: number;
  pageSize?: number;
  sort?: string;

  static stringify<T>(obj: T): Strinfigy<T> {
    if (!obj) {
      return null;
    }

    return Object.entries(obj)
      .reduce((previousValue, [key, value]) => {
        if (value === undefined || value === '') {
          return previousValue
        }

        previousValue[key] =  String(value);
        return previousValue;
      }, {} as Strinfigy<T>);
  }
}

type Strinfigy<T> = { [x in keyof T]: string | null };
