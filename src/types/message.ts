import { AppRouter } from "@/trpc";
import { inferRouterOutputs } from "@trpc/server";

type Routeroutput = inferRouterOutputs<AppRouter>

type Messages = Routeroutput["getFileMessages"]["messages"]

type OmitText = Omit<Messages[number], "text">

type Extendedtext = {
    text: string | JSX.Element
}

export type ExtendedMessage = OmitText & Extendedtext