import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'dark' | 'ghost';

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

type PixelButtonProps = BaseProps &
  (
    | ({ to: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)
    | ({ to?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-sky-blue text-navy hover:bg-[#BAE1FF] active:bg-[#93CEFF]',
  secondary:
    'bg-white text-navy hover:bg-light-bg active:bg-[#F5E4FA]',
  accent:
    'bg-pastel-pink text-navy hover:bg-[#FABCEE] active:bg-[#EE94DE]',
  dark:
    'bg-navy text-white hover:bg-[#323073] active:bg-navy-deep',
  ghost:
    'bg-lavender text-navy hover:bg-[#D5C8FF] active:bg-[#B8A4FF]',
};

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'min-h-[44px] px-3.5 py-2 text-[11px]',
  md: 'min-h-[44px] px-5 py-2.5 text-xs',
  lg: 'min-h-[48px] px-6 py-3 text-xs sm:text-sm',
};

export function PixelButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: PixelButtonProps) {
  const baseClasses = `inline-flex items-center justify-center gap-2 border-[3px] border-navy font-pixel leading-snug tracking-wide shadow-pixel transition-transform duration-100 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if ('to' in rest && typeof rest.to === 'string') {
    const { to, ...linkProps } = rest;
    return (
      <Link to={to} className={baseClasses} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={buttonProps.type ?? 'button'}
      className={baseClasses}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

