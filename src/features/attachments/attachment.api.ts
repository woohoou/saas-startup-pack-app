import { getApolloClient } from '../../clients/apollo';
import {
  CreateAttachmentDocument,
  CreateAttachmentMutation,
  CreateAttachmentMutationVariables,
} from '../../generated/graphql';

export const createAttachment = async (variables: CreateAttachmentMutationVariables) => {
  const apolloClient = await getApolloClient();

  const result = await apolloClient.mutate<
    CreateAttachmentMutation,
    CreateAttachmentMutationVariables
  >({
    mutation: CreateAttachmentDocument,
    variables,
  });

  return result?.data?.createAttachment;
};
