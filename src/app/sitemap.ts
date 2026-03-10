import { ECategoryType, EPaginationType, EProductType } from '@/graphql/@types';
import { getApolloServer } from '@/graphql/apollo-server';
import { GraphQLFetcher } from '@/graphql/server';
import { WEBSITE_URL } from '@/shared/constants';

export default async function sitemap() {
  const baseUrl = WEBSITE_URL;

  // Static routes
  const staticRoutes = ['/', '/service', '/handmade', '/contact', '/about', '/booking'].map(
    (route) => ({
      url: baseUrl + route,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '/' ? 1 : 0.8,
    }),
  );

  // Service category routes
  const { categories: serviceCategories } = await GraphQLFetcher.category({
    client: await getApolloServer(),
  }).getPagination({
    where: { type: ECategoryType.Service },
    pagination: { pagination_type: EPaginationType.All },
  });
  const serviceCategoryRoutes = serviceCategories
    .filter((category) => category.type === ECategoryType.Service)
    .map((category) => ({
      url: `${baseUrl}/service/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  // Service routes
  const { products: serviceProducts } = await GraphQLFetcher.product({
    client: await getApolloServer(),
  }).getPagination({
    where: { type: EProductType.Service },
    pagination: { pagination_type: EPaginationType.All },
  });
  const serviceRoutes = serviceProducts.map((product) => ({
    url: `${baseUrl}/service/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Handmade category routes
  const { categories: handmadeCategories } = await GraphQLFetcher.category({
    client: await getApolloServer(),
  }).getPagination({
    where: { type: ECategoryType.Product },
    pagination: { pagination_type: EPaginationType.All },
  });
  const handmadeCategoryRoutes = handmadeCategories
    .filter((category) => category.type === ECategoryType.Product)
    .map((category) => ({
      url: `${baseUrl}/handmade/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  // Product routes
  const { products: handmadeProducts } = await GraphQLFetcher.product({
    client: await getApolloServer(),
  }).getPagination({
    where: { type: EProductType.Product },
    pagination: { pagination_type: EPaginationType.All },
  });
  const productRoutes = handmadeProducts.map((product) => ({
    url: `${baseUrl}/handmade/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceCategoryRoutes,
    ...handmadeCategoryRoutes,
    ...serviceRoutes,
    ...productRoutes,
  ];
}
