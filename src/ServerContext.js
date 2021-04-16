import { createContext } from "react";
import { createServer } from "./ServerAPI";

export const ServerContext = createContext(createServer());

export const makeCancelable = (promise) => {
    let canceled = false;

    const canceledError = new Error("promise canceled");
    canceledError.isCanceled = true;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            (val) => (canceled ? reject(canceledError) : resolve(val)),
            (error) => (canceled ? reject(canceledError) : reject(error))
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            canceled = true;
        },
    };
};
