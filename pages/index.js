import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import appConfig from "../config.json";
import React, { useState } from "react"
import { useRouter } from "next/router"

function Titulo({ children, tag }) {
    const Tag = tag || 'h1';

    return (
        <>
            <Tag>{children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals["000"]};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}

/* function HomePage() {
    return (
        <div>
            <GlobalStyle />
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <h2>Discord - Alura Matrix</h2>
        </div>
    )
  }

  o style do next só aplica os estilos para os elementos de primeiro nível
  se estiver em outro escopo, componente, ou elemento, ele não se aplica
  cria uma classe automaticamente para os elementos do estilo
  
  export default HomePage */

export default function PaginaInicial() {
    //const username = "gabrielgui13";
    const [username, setUsername] = useState("");

    //window.location.href = '/chat' => recarrega, não é SPA
    const roteamento = useRouter();

    return (
        <>
            <Box
                styleSheet={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: "url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundBlendMode: "multiply",
                }}
            >
                <Box
                    styleSheet={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        width: "100%",
                        maxWidth: "700px",
                        borderRadius: "5px",
                        padding: "32px",
                        margin: "16px",
                        boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            roteamento.push('/chat')
                        }}
                        styleSheet={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: { xs: "100%", sm: "50%" },
                            textAlign: "center",
                            marginBottom: "32px",
                        }}
                    >
                        <Titulo tag="h2">Boas vindas de volta!</Titulo>
                        <Text
                            variant="body3"
                            styleSheet={{
                                marginBottom: "32px",
                                color: appConfig.theme.colors.neutrals[300],
                            }}
                        >
                            {appConfig.name}
                        </Text>

                        <TextField
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor:
                                        appConfig.theme.colors.neutrals[200],
                                    mainColor:
                                        appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight:
                                        appConfig.theme.colors.primary[500],
                                    backgroundColor:
                                        appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            disabled={username.length > 2 ? "" : "disabled"}
                            type="submit"
                            label="Entrar"
                            fullWidth
                            buttonColors={{
                                contrastColor:
                                    appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight:
                                    appConfig.theme.colors.primary[400],
                                mainColorStrong:
                                    appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}

                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            maxWidth: "200px",
                            padding: "16px",
                            backgroundColor:
                                appConfig.theme.colors.neutrals[800],
                            border: "1px solid",
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: "10px",
                            flex: 1,
                            minHeight: "240px",
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: "50%",
                                marginBottom: "16px",
                            }}
                            src={`https://github.com/${username}.png`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor:
                                    appConfig.theme.colors.neutrals[900],
                                padding: "3px 10px",
                                borderRadius: "1000px",
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}
