import { React } from "react";
import './style.css'
import logoWhatsApp from '../../assets/WhatsAppIcon.png';
import logoEmail from '../../assets/EmailIcon.png';

export default function Compartilhar({ fecharModal, receita }) {


    const compartilharnoWhatsApp = (receita) => {
        const mensagem = `
        Veja essa receita que eu adorei! 
        *Titulo*: ${receita.titulo}\n
        *Ingredientes*: ${receita.ingredientes}\n
        *Modo de Preparo*: ${receita.modo_de_preparo}
        Descubra em: http://localhost:5173/receitas
        `

        const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`

        window.open(url, '_blank');
    }


    return (
        <div>
            <div className="Modal-Container">
                <div className="Modal-Conteudo">
                    <h1>Compartilhar receita</h1>
                    <span>Compartilhe as suas receitas atráves das suas redes sociais</span>
                    <button className="Fechar-Modal" onClick={() => fecharModal()}>X</button>

                    <div className="Redes-Sociais-Container">

                        {/* Container WhatsApp*/}
                        <button onClick={() => compartilharnoWhatsApp(receita)} className="WhatsApp-Container">
                            <img src={logoWhatsApp} alt="IconeWhatsApp" width={50} />
                            <span>Compatilhar via WhatsApp</span>
                        </button>

                        {/* Container Email*/}
                        <button className="Email-Container"
                            onClick={() => {
                                const titulo = encodeURIComponent(`Confira essa receita incrível! -- ${receita.titulo}`);
                                const corpo = encodeURIComponent(`Oi! Encontrei essa receita no app de receitas, achei que você iria gostar. \n
                                        Ingredientes: ${receita.ingredientes} 
                                        Modo de Preparo: ${receita.modo_de_preparo}\n
                                        Descrição da receita: ${receita.descricao}
                                    `);
                                const mailto = `mailto:?subject=${titulo}&body=${corpo}`;
                                window.location.href = mailto;

                            }}>

                            <img src={logoEmail} alt="IconeEmail" width={50} />
                            <span>Compatilhar via Email</span>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}