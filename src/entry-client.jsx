import '@fontsource-variable/space-grotesk/wght.css'
import '@fontsource-variable/plus-jakarta-sans/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import '@fontsource/instrument-serif/400-italic.css'
import './index.css'

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
)

// En production chaque page est pré-rendue : on « hydrate » le HTML existant.
// En développement (npm run dev) la page est vide : on la rend entièrement.
if (container.firstElementChild) {
    hydrateRoot(container, app)
} else {
    createRoot(container).render(app)
}
