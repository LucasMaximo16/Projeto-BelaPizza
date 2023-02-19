import { ToastOptions } from "react-toastify";

export const toastOptions: ToastOptions<{}> = {
    position: 'bottom-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    pauseOnFocusLoss: false
};
