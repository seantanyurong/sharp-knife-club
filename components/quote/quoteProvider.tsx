'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import QuoteDrawer from './quoteDrawer';

/**
 * Mounts the quote drawer exactly once for the whole app and hands every
 * trigger a way to open it.
 *
 * Before this, each call site rendered its own <QuoteDrawer />, so the
 * homepage carried two copies of the panel — two dialogs in the DOM and two
 * fetches for the pickup date. Triggers are now cheap buttons; the panel
 * lives here.
 */

type QuoteDrawerContextValue = { openQuote: () => void };

const QuoteDrawerContext = createContext<QuoteDrawerContextValue | null>(null);

export function useQuoteDrawer() {
  const ctx = useContext(QuoteDrawerContext);
  if (!ctx) {
    throw new Error('useQuoteDrawer must be used inside <QuoteDrawerProvider>');
  }
  return ctx;
}

export function QuoteDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openQuote = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ openQuote }), [openQuote]);

  return (
    <QuoteDrawerContext.Provider value={value}>
      {children}
      <QuoteDrawer open={open} onClose={() => setOpen(false)} />
    </QuoteDrawerContext.Provider>
  );
}

/** A button that opens the shared drawer. Style it via `className`. */
export function QuoteTrigger({
  className,
  label = 'Get an instant quote →',
  tabIndex,
}: {
  className?: string;
  label?: string;
  tabIndex?: number;
}) {
  const { openQuote } = useQuoteDrawer();

  return (
    <button type="button" onClick={openQuote} tabIndex={tabIndex} className={className}>
      {label}
    </button>
  );
}
