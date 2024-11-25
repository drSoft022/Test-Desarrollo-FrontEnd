import { InertiaApp } from '@inertiajs/inertia-react';
import React from 'react';
import ReactDOM from 'react-dom/client';

const container = document.getElementById('react-app')

if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <InertiaApp
            initialPage={JSON.parse(container.dataset.page)}
            resolveComponent={name => import(`./components/${name}.jsx`).then(module => module.default)}
        />
    )
}