import React from "react";
import { Equal, Expect } from "../helpers/type-utils";

const createGenericContext = <T,>(): [() => T, React.Provider<T | null>] => {
  const context = React.createContext<T | null>(null);

  const useContext = (): T => {
    const contextValue = React.useContext(context);

    if (contextValue === null) {
      throw new Error("Context value is null");
    }

    return contextValue;
  };

  return [useContext, context.Provider];
};

const [useUser, UserProvider] = createGenericContext<{
  name: string;
}>();

const [useTheme, ThemeProvider] = createGenericContext<{
  primaryColor: string;
}>();

const Child = () => {
  const user = useUser();

  type test = Expect<
    Equal<
      typeof user,
      {
        name: string;
      }
    >
  >;

  const theme = useTheme();

  type test2 = Expect<
    Equal<
      typeof theme,
      {
        primaryColor: string;
      }
    >
  >;

  return null;
};

const Parent = () => {
  return (
    <>
      <UserProvider value={{ name: "Matt" }}>
        <ThemeProvider
          value={{
            primaryColor: "blue",
          }}
        >
          <Child />
        </ThemeProvider>
      </UserProvider>
    </>
  );
};
