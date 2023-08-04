import React from "react";
import { ReactNativeRecoilPersist } from "./";
declare type Props = {
    stores: ReactNativeRecoilPersist[];
    fallback?: React.ReactNode;
    onInit?: (store: ReactNativeRecoilPersist) => void;
    children?: any;
};
export declare const ReactNativeRecoilPersistGate: React.FC<Props>;
export {};
