import { useContext, Context } from "react";

export const useGetSafeContext = <T>(context: Context<T | undefined>) => {
  const useContextResult = useContext(context);

  if (!useContextResult)
    throw new Error(
      `You must wrap your component in an instance of ${context.displayName}`
    );

  return useContextResult;
};
