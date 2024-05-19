import { AccountCoreAccountSession } from "./AccountCoreAccountSession";

 export type AccountCoreVerifyAccountSessionResponse = {
    /**
     * @type boolean | undefined
    */
    isValid?: boolean;
    session?: AccountCoreAccountSession;
};