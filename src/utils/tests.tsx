import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { setupStore } from '@take-home-task/store';
import type { AppStore } from '@take-home-task/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: AppStore;
}

/**
 * Wraps the rendered component with store provider. Other providers can also be added (such as ThemeProvider from mui).
 * @param ui The React Component that needs to be rendered (for tests)
 * @param renderOptions Optional. Render options from  @testing-library/react
 * @returns The redux store and RenderResult
 */
export function renderWithProvider(
  ui: React.ReactElement,
  {
    store = setupStore(),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: { children: JSX.Element }): JSX.Element {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }

  const view: ReturnType<typeof render> = render(ui, { wrapper: Wrapper, ...renderOptions });
  return { store, ...view };
}