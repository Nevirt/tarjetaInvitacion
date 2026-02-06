// contexts/InvitacionConfigContext.tsx - Context para configuración dinámica
'use client';

import { createContext, useContext, ReactNode } from 'react';
import { InvitacionConfig } from '@/types/config';

interface InvitacionConfigContextType {
  config: InvitacionConfig;
}

const InvitacionConfigContext = createContext<InvitacionConfigContextType | undefined>(undefined);

export function InvitacionConfigProvider({ 
  children, 
  config 
}: { 
  children: ReactNode; 
  config: InvitacionConfig;
}) {
  return (
    <InvitacionConfigContext.Provider value={{ config }}>
      {children}
    </InvitacionConfigContext.Provider>
  );
}

export function useInvitacionConfig() {
  const context = useContext(InvitacionConfigContext);
  if (!context) {
    // Fallback a config estático si no hay contexto (para compatibilidad)
    const staticConfig = require('@/app/config/invitacion').invitacionConfig;
    return { config: staticConfig };
  }
  return context;
}

