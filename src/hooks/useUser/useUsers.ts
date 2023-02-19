import { UserContext } from "@/src/contexts/userContext/userContext";
import { parseCookies } from "nookies";
import { useContext } from "react";

export function useUser() {
    const user = useContext(UserContext);

    const cookies = parseCookies();
    const authorization = cookies['@pizzaria:token'];
    return { ...user, authorization };
}