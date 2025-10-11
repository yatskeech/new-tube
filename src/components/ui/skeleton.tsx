import { cn } from '@/shared/lib';

function Skeleton({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    >
      {children ?? '\u00A0'}
    </div>
  );
}

export { Skeleton };
