import type { userEntities, userRequest } from "../user/entiti";

export interface responseType {
    status : number,
    message? : string | string[],
}

export interface userRequestType extends responseType {
    data? : userRequest
}
export interface userResponseType extends responseType {
    data? : userEntities
}