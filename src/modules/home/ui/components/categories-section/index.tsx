'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useTRPC } from '@/trpc/client';

import { FilterCarousel, FilterCarouselSkeleton } from './filter-carousel';

export function CategoriesSection() {
  return (
    <Suspense fallback={<FilterCarouselSkeleton />}>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <CategoriesSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
}

function CategoriesSectionSuspense() {
  const trpc = useTRPC();
  const { data: categories } = useSuspenseQuery(
    trpc.categories.getMany.queryOptions(),
  );

  return (
    <FilterCarousel
      filters={categories.map(({ slug, name }) => ({
        value: slug,
        label: name,
      }))}
    />
  );
}
