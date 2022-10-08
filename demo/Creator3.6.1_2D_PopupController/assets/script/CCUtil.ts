import { Asset, resources, __private } from "cc";

export module CCUtil {
    export function load<T extends Asset>(option: {
        paths: string,
        type: __private.cocos_core_asset_manager_shared_AssetType<T> | null,
        onProgress?: __private.cocos_core_asset_manager_shared_ProgressCallback | null,
        onComplete?: __private.cocos_core_asset_manager_shared_CompleteCallbackWithData<T> | null
    }): void {
        resources.load(option.paths, option.type, option.onProgress!, option.onComplete!);
    }

}