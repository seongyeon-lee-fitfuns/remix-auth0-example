import type {
  LoaderFunctionArgs,
  MetaFunction,
  LinkDescriptor,
} from "react-router";

export declare namespace Route {
  export type LinksFunction = () => LinkDescriptor[];
  export type LoaderArgs = LoaderFunctionArgs;
  export type MetaArgs = Parameters<MetaFunction>[0];
} 