import { ApolloError } from "@apollo/client/core";

interface ApolloErrorHandlerOptions {
  error: unknown;
  defaultMessage?: string;
  logPrefix?: string;
}

export function handleApolloError({
  error,
  defaultMessage = "An error occurred. Please try again later.",
  logPrefix = "Apollo Error",
}: ApolloErrorHandlerOptions): string {
  console.error(`${logPrefix}:`, error);

  if (error instanceof ApolloError) {
    // Log detailed error information
    if (error.graphQLErrors?.length) {
      console.error("GraphQL Errors:", JSON.stringify(error.graphQLErrors, null, 2));
    }
    if (error.networkError) {
      console.error("Network Error:", error.networkError);
    }
    if (error.graphQLErrors?.[0]?.extensions) {
      console.error("Extension data:", JSON.stringify(error.graphQLErrors[0].extensions, null, 2));
    }

    // Return user-friendly error message
    if (error.graphQLErrors?.[0]?.extensions?.data) {
      return `Error: ${JSON.stringify(error.graphQLErrors[0].extensions.data)}`;
    }

    // Check for specific error codes and return appropriate messages
    const errorCode = error.graphQLErrors?.[0]?.extensions?.code;
    switch (errorCode) {
      case "VALIDATION_ERROR":
        return "The information provided is invalid. Please check your input and try again.";
      case "NOT_FOUND":
        return "The requested resource was not found.";
      case "UNAUTHORIZED":
        return "You are not authorized to perform this action.";
      default:
        return defaultMessage;
    }
  }

  return defaultMessage;
}
