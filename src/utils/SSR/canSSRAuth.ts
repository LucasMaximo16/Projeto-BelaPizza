import { redirect } from 'next/dist/server/api-utils';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies,destroyCookie } from "nookies";

export function canSSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx)
        const token = cookies['@pizzaria:token']

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        try{
            return await fn(ctx)
        }catch(err){
            destroyCookie(ctx, '@pizzaria:token')

            return{
                redirect:{
                    destination: '/',
                    permanent: false
                }
            }
        }
    }
}
    