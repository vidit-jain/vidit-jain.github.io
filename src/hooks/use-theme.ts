import { atom } from "@alxshelepenok/diesel";
import { useCoilPersistedState } from "@alxshelepenok/diesel-extensions";

import { getDefaultColorMode } from "@/utils";

interface Theme {
  mode: "light";
}

export const themeAtomKey = "diesel:theme-atom";

const themeAtom = atom<Theme>({
  key: "themeAtom",
  default: {
    mode: getDefaultColorMode(),
  },
});

const useTheme = (): readonly [Theme, () => void] => {
  const [theme, set] = useCoilPersistedState(themeAtom);

  const toggle = () => set({ mode: "light"});

  return [theme, toggle];
};

export default useTheme;
