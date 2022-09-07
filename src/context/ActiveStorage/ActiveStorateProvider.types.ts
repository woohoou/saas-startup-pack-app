export type Headers = {
  [key: string]: string;
};

export type ContextType = {
  host: string;
  mountPath?: string;
  directUploadsUrl?: string;
  headers?: Headers;
};

export type Props = {
  host: string;
  mountPath?: string;
  headers?: Headers;
};
