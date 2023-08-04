import React, { useEffect, useState } from "react";
import { ReactNativeRecoilPersist } from "./";

type Props = {
  stores: ReactNativeRecoilPersist[];
  fallback?: React.ReactNode;
  onInit?: (store: ReactNativeRecoilPersist) => void;
  children?: any;
};

export const ReactNativeRecoilPersistGate: React.FC<Props> = ({ stores, children, fallback, onInit }) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      for (let i = 0; i < stores.length; i++) {
        await stores[i].init();
        onInit && onInit(stores[i]);
      }
      setHasLoaded(true);
    })();
  }, []);

  return <>{hasLoaded ? children : fallback || null}</>;
};
