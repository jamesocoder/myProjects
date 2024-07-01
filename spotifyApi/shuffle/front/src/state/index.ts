import { useAppSelector, useAppDispatch } from "./hooks";
import { initAddr } from "./slices/addrSlice";
import { authorize, logout } from "./slices/authSlice";

export {
    useAppSelector,
    useAppDispatch,
    initAddr,
    authorize,
    logout
}