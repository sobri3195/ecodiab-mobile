import { createContext, useContext } from 'react';

type AlertCenterState = {
  unresolvedCount: number;
};

const AlertCenterContext = createContext<AlertCenterState>({ unresolvedCount: 0 });

export const AlertCenterProvider = AlertCenterContext.Provider;

export const useAlertCenter = (): AlertCenterState => useContext(AlertCenterContext);
