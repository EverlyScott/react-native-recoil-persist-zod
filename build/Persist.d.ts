import { AtomEffect } from "recoil";
import { ZodTypeAny } from "zod";
interface StorageInterface {
    getItem: (localStorageKey: string) => Promise<string | null>;
    mergeItem: (localStorageKey: string, state: any) => Promise<void>;
}
export declare const defaultStorageInterface: StorageInterface;
export declare const defaultLocalStorageKey: string;
export declare class ReactNativeRecoilPersist {
    private zodType;
    private key;
    private storageHandlers;
    private cachedState;
    constructor(zodType: ZodTypeAny, key?: string, storageHandlers?: StorageInterface);
    init: () => Promise<void>;
    private parseState;
    private setState;
    private updateState;
    persistAtom: AtomEffect<any>;
}
export {};
