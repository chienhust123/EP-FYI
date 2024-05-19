import { V1PositionLevel } from "./V1PositionLevel";

 export type V1Position = {
    /**
     * @type string | undefined, uint64
    */
    id?: string;
    /**
     * @description The title of the position - for example, Software Engineer, Senior Software Engineer, etc...
     * @type string | undefined
    */
    title?: string;
    level?: V1PositionLevel;
};