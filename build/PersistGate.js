import React, { useEffect, useState } from "react";
export const ReactNativeRecoilPersistGate = ({ stores, children, fallback, onInit }) => {
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
//# sourceMappingURL=PersistGate.js.map