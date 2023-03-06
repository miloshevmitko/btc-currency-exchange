import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { setupStore } from '@take-home-task/store';
import type { AppStore } from '@take-home-task/store';

interface ExtendedRenderOptions extends RenderOptions {
  store?: AppStore;
}

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