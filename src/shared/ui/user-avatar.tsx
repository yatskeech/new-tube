import { cva, VariantProps } from 'class-variance-authority';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/shared/lib';

const avatarVariants = cva('', {
  variants: {
    size: {
      default: 'h-9 w-9',
      xs: 'h-4 w-4',
      sm: 'h-6 w-6',
      lg: 'h-10 w-10',
      xl: 'h-40 w-40',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

type UserAvatarProps = {
  name: string;
  imageUrl: string;
  className?: string;
  onClick?: () => void;
} & VariantProps<typeof avatarVariants>;

export function UserAvatar(props: UserAvatarProps) {
  const { name, imageUrl, className, onClick, ...rest } = props;

  return (
    <Avatar className={cn(avatarVariants(rest), className)} onClick={onClick}>
      <AvatarImage src={imageUrl} alt={name} />
    </Avatar>
  );
}
