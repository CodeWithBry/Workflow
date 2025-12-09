import { createContext } from "react"
import type { AppContextType } from "../../types/AppContextType.types";

export const context = createContext<AppContextType | null>(null);