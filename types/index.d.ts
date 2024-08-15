import type { Strapi4ResponseMany } from '@nuxtjs/strapi';

export type TAuthResponseSuccess = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
  };
};

export type TAuthResponseError = {
  data: null;
  error: {
    status: number;
    message: string;
    name: string;
  };
};

export type TAuthResponse = TAuthResponseSuccess | TAuthResponseError;

export type SR<T> = Strapi4ResponseMany<T>;

export type TMyButton = {
  icon?: string;
  link?: string;
  target?: '_blank' | '_self';
  type?: 'button' | 'submit';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  loading?: boolean;
  text?: string;
};

export interface IModal {
  id: string;
  title: string;
  isOpen: boolean;
}

export type TBarber = {
  id: number;
  name: string;
  avatar: string;
};
