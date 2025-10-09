'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  FadeNext,
  FadePrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

type FilterCarouselProps = {
  filters?: { value: string; label: string }[];
};

const FILTER_SEARCH_PARAM = 'categoryId';

export function FilterCarousel({ filters }: FilterCarouselProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get(FILTER_SEARCH_PARAM);

  const getFilterLink = (categoryId?: string) => {
    const filterSearchParams = new URLSearchParams(searchParams);

    if (categoryId) {
      filterSearchParams.set(FILTER_SEARCH_PARAM, categoryId);
    } else {
      filterSearchParams.delete(FILTER_SEARCH_PARAM);
    }

    return `${pathname}?${filterSearchParams.toString()}`;
  };

  return (
    <Carousel
      opts={{ align: 'start', dragFree: true }}
      className="w-full px-12"
    >
      <CarouselPrevious className="left-0" />
      <FadePrevious className="left-12" />
      <CarouselContent className="-ml-3">
        <CarouselItem className="basis-auto pl-3">
          <Badge
            variant={!categoryId ? 'default' : 'secondary'}
            className="cursor-pointer rounded-lg px-3 py-1 text-sm
              whitespace-nowrap"
            asChild
          >
            <Link href={getFilterLink()}>All</Link>
          </Badge>
        </CarouselItem>
        {filters?.map((filter) => (
          <CarouselItem key={filter.value} className="basis-auto pl-3">
            <Badge
              variant={filter.value === categoryId ? 'default' : 'secondary'}
              className="cursor-pointer rounded-lg px-3 py-1 text-sm
                whitespace-nowrap"
              asChild
            >
              <Link href={getFilterLink(filter.value)}>{filter.label}</Link>
            </Badge>
          </CarouselItem>
        ))}
      </CarouselContent>
      <FadeNext className="right-12" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}

export function FilterCarouselSkeleton() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get(FILTER_SEARCH_PARAM);

  return (
    <Carousel
      opts={{ align: 'start', dragFree: true }}
      className="w-full px-12"
    >
      <CarouselPrevious className="left-0" />
      <FadePrevious className="left-12" />
      <CarouselContent className="-ml-3">
        <CarouselItem className="basis-auto pl-3">
          <Badge
            variant={!categoryId ? 'default' : 'secondary'}
            className="cursor-pointer rounded-lg px-3 py-1 text-sm
              whitespace-nowrap"
          >
            All
          </Badge>
        </CarouselItem>
        {Array.from({ length: 16 }).map((_, index) => (
          <CarouselItem key={index} className="basis-auto pl-3">
            <Skeleton
              className="h-full w-24 cursor-pointer rounded-lg px-3 py-1 text-sm
                whitespace-nowrap"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <FadeNext className="right-12" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}
