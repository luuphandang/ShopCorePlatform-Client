interface ISearchFilter {
  [key: string]: string | string[];
}

export class SearchUtil {
  getParams(filter: ISearchFilter) {
    const params = new URLSearchParams();

    Object.entries(filter).map(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item));
      } else {
        params.append(key, value);
      }
    });
  }
}
