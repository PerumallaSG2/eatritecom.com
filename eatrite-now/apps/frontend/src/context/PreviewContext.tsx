import { createContext, useContext } from 'react';

/**
 * PREVIEW CONTEXT - DEV ONLY
 * 
 * Purpose: Enable visual UI state preview without modifying production behavior.
 * Used exclusively by /app/dev/ui-preview to force specific states for inspection.
 */

export type PreviewState = 'success' | 'loading' | 'empty' | 'error';

export interface PreviewContextValue {
  enabled: boolean;
  page?: string;
  state?: PreviewState;
}

export const PreviewContext = createContext<PreviewContextValue>({
  enabled: false
});

export const usePreview = () => useContext(PreviewContext);
