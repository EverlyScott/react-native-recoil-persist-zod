import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultValue } from "recoil";
export const defaultStorageInterface = {
    getItem: AsyncStorage.getItem,
    mergeItem: AsyncStorage.mergeItem,
};
export const defaultLocalStorageKey = "asyncRecoilPersistStorageReactNative";
export class ReactNativeRecoilPersist {
    constructor(zodType, key = defaultLocalStorageKey, storageHandlers = defaultStorageInterface) {
        this.zodType = zodType;
        this.key = key;
        this.storageHandlers = storageHandlers;
        this.cachedState = {};
        this.init = async () => {
            const localCache = await this.storageHandlers.getItem(this.key);
            if (!localCache) {
                return;
            }
            const parsedState = this.parseState(localCache);
            if (Object.keys(parsedState).length) {
                this.cachedState = parsedState;
            }
        };
        this.parseState = (state) => {
            if (state === undefined) {
                return {};
            }
            try {
                const json = JSON.parse(state);
                const zod = this.zodType.safeParse(json);
                if (zod.success) {
                    return zod.data;
                }
                else {
                    console.error(zod.error);
                    return json;
                }
            }
            catch (e) {
                console.error(e);
                return {};
            }
        };
        this.setState = async (state) => {
            try {
                const zod = this.zodType.safeParse(state);
                if (zod.success) {
                    await this.storageHandlers.mergeItem(this.key, JSON.stringify(zod.data));
                }
                else {
                    console.log(zod.error);
                    await this.storageHandlers.mergeItem(this.key, JSON.stringify(state));
                }
            }
            catch (e) {
                console.error(e);
            }
        };
        this.updateState = (key, newValue) => {
            if (newValue !== null &&
                newValue !== undefined &&
                newValue instanceof DefaultValue &&
                this.cachedState.hasOwnProperty(key)) {
                delete this.cachedState[key];
            }
            else {
                this.cachedState[key] = newValue;
            }
            this.setState(this.cachedState);
        };
        this.persistAtom = ({ onSet, node, trigger, setSelf }) => {
            if (trigger === "get") {
                if (this.cachedState.hasOwnProperty(node.key)) {
                    setSelf(this.cachedState[node.key]);
                }
            }
            onSet(async (newValue) => {
                this.updateState(node.key, newValue);
            });
        };
    }
}
//# sourceMappingURL=Persist.js.map