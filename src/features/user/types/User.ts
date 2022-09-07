import { MeQuery } from '../../../generated/graphql';

export type User = Omit<NonNullable<MeQuery['me']>, '__typename'>;
