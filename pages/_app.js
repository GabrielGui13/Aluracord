function GlobalStyle() {
    return (
        <style global jsx>{`
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style: none;
            }
            body {
                font-family: "Open Sans", sans-serif;
            }
            /* App fit Height */
            html,
            body,
            #__next {
                min-height: 100vh;
                display: flex;
                flex: 1;
            }
            #__next {
                flex: 1;
            }
            #__next > * {
                flex: 1;
            }
            /* ./App fit Height */
        `}</style>
    );
} //estilo global aplica independente do nível

export default function CustomApp({Component, pageProps}) {
    return (
        <>
            <GlobalStyle/>
            <Component {...pageProps}/>
        </>
    )
} //arquivo global com o nome "_app.js", que envolve todos os componentes