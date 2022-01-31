import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React, { useState, useEffect } from "react";
import appConfig from "../config.json";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU3NjkwNSwiZXhwIjoxOTU5MTUyOTA1fQ.Er4ZXFYKzVKy3rlMbVhuDvMKDriNQTuijtuUIzrXdNA";
const SUPABASE_URL = "https://yedogtrxvbwzbejyyhjd.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = useState("");
    const [listaDeMensagens, setListaDeMensagens] = useState([
/*         {
            id: 1,
            de: 'gabrielgui13',
            texto: ":sticker: https://www.alura.com.br/imersao-react-4/assets/figurinhas/Figurinha_1.png",
        },
        {
            id: 2,
            de: 'gabrielgui13',
            texto: 'Oi!'
        } */
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //roda sempre que a página carrega
        const dadosDoSupabase = supabaseClient
            .from("mensagens")
            .select("*")
            .order("id", { ascending: false }) //organização normal
            .then(({ data }) => {
                //console.log("Dados da consulta", data);
                setListaDeMensagens(data);
                setLoading(false);
            }); //se ficar dentro do componente fica chamando toda vez que mudar o estado
    }, []); //chamadas de api e coisas do tipo estão no useEffect

    //o useEffect tras da database, então atualiza no loading da página
    //quando nós mesmos adicionamos, o handleNovaMensagem insere a mensagem no banco de dados e retorna o dado, assim colocamos no array de mensagens, e atualiza já na tela

    const handleNovaMensagem = (novaMensagem) => {
        const mensagem = {
            //id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from("mensagens")
            .insert([mensagem])
            .then(({ data }) => {
                setListaDeMensagens([data[0], ...listaDeMensagens]);
            });

        setMensagem("");
    };

    const handleApagarMensagem = (mensagem) => {
        setListaDeMensagens((prevState) => {
            const novaListaDeMensagens = prevState.filter((m) => {
                return m !== mensagem;
            });

            return novaListaDeMensagens;
        });
    };

    return (
        <Box
            styleSheet={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundBlendMode: "multiply",
                color: appConfig.theme.colors.neutrals["000"],
            }}
        >
            <Box
                styleSheet={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
                    borderRadius: "5px",
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: "100%",
                    maxWidth: "95%",
                    maxHeight: "95vh",
                    padding: "32px",
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: "relative",
                        display: "flex",
                        flex: 1,
                        height: "80%",
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: "column",
                        borderRadius: "5px",
                        padding: "16px",
                    }}
                >
                    {/*{listaDeMensagens.map(mensagemAtual => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de} : {mensagemAtual.texto}
                            </li>
                        )
                    })} */}

                    {loading ? (
                        <Box
                            tag="ul"
                            styleSheet={{
                                overflow: "scroll",
                                display: "flex",
                                flexDirection: "column-reverse",
                                flex: 1,
                                color: appConfig.theme.colors.neutrals["000"],
                                marginBottom: "16px",
                            }}
                        >
                            <h3>Carregando...</h3>
                        </Box>
                    ) : (
                        <MessageList
                            mensagens={listaDeMensagens}
                            apagarMensagem={handleApagarMensagem}
                        />
                    )}

                    <Box
                        as="form"
                        styleSheet={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key == "Enter") {
                                    e.preventDefault(); //para nao pular a linha
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: "100%",
                                border: "0",
                                resize: "none",
                                borderRadius: "5px",
                                padding: "6px 8px",
                                backgroundColor:
                                    appConfig.theme.colors.neutrals[800],
                                marginRight: "12px",
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker
                            onStickerClick={() => {
                                
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

function Header() {
    return (
        <>
            <Box
                styleSheet={{
                    width: "100%",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Text variant="heading5">Chat</Text>
                <Button
                    variant="tertiary"
                    colorVariant="neutral"
                    label="Logout"
                    href="/"
                />
            </Box>
        </>
    );
}

function MessageList(props) {
    //console.log("MessageList", props);

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: "scroll",
                display: "flex",
                flexDirection: "column-reverse",
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: "16px",
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: "5px",
                            padding: "6px",
                            marginBottom: "12px",
                            hover: {
                                backgroundColor:
                                    appConfig.theme.colors.neutrals[700],
                            },
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: "8px",
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    marginRight: "8px",
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">{mensagem.de}</Text>
                            <Text
                                styleSheet={{
                                    fontSize: "10px",
                                    marginLeft: "8px",
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {new Date().toLocaleDateString()}
                            </Text>
                            <Button
                                variant="tertiary"
                                colorVariant="neutral"
                                label="Apagar"
                                onClick={() => props.apagarMensagem(mensagem)}
                            />
                        </Box>
                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image width="100px" src={mensagem.texto.replace(':sticker:', '')} />
                            ) : (
                                mensagem.texto
                            )
                        }
                        {/* mensagem.texto */}
                    </Text>
                );
            })}
        </Box>
    );
}
