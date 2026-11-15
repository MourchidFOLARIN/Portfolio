import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import ProjectModal from './ProjectModal.jsx'

const OverlayContext = createContext({ openProject: () => {} })

// Fiche technique d'un projet, ouvrable depuis n'importe quelle page
export default function Overlays({ children }) {
    const [projectId, setProjectId] = useState(null)
    const openProject = useCallback((id) => setProjectId(id), [])
    const api = useMemo(() => ({ openProject }), [openProject])

    return (
        <OverlayContext.Provider value={api}>
            {children}
            <ProjectModal id={projectId} onClose={() => setProjectId(null)} />
        </OverlayContext.Provider>
    )
}

export const useOverlays = () => useContext(OverlayContext)
