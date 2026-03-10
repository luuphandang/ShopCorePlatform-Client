import { TCategoryQuery, TProductQuery } from '@/graphql/@types';
import { EJsonldType } from '@/shared/enums/jsonld.enum';
import { JsonldHelper } from '@/shared/helpers/jsonld';

interface IStructuredDataProps {
  type: EJsonldType;
  data?: TProductQuery | TCategoryQuery;
}

export default function JSONLDStructuredData({ type, data }: IStructuredDataProps) {
  const json = (type: string) => {
    switch (type) {
      case EJsonldType.WEBSITE:
        return JsonldHelper.generateHomeJsonld();
      case EJsonldType.COLLECTION_PAGE:
        return JsonldHelper.generateCategoryJsonld(data as TCategoryQuery);
      case EJsonldType.SERVICE:
        return JsonldHelper.generateServiceJsonld(data as TProductQuery);
      case EJsonldType.PRODUCT:
        return JsonldHelper.generateProductJsonld(data as TProductQuery);
      default:
        return null;
    }
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json(type)) }}
    />
  );
}
