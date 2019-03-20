import {
    ADDED,
    QUEUE,
} from "../store/reducers/images";

export const isAdded = status => status === ADDED;
export const isQueue = status => status === QUEUE;
export const canAdd = status => status === null;
