# Pingnet — Observatório Local da Internet

![Pingnet](assets/logo.svg)

*Sua internet, sem mistérios.*

## Manual de software

## Sumário

- [Apresentação](#apresentacao)
- [Instalação e primeiros passos](#primeiros-passos)
- [Monitoramento e condições](#monitoramento)
- [Painel Início e indicadores](#inicio)
- [Linha do tempo](#linha-do-tempo)
- [Histórico](#historico)
- [Comparativos](#comparativos)
- [Horários críticos](#horarios-criticos)
- [Anotações](#anotacoes)
- [Minha conexão](#perfis)
- [Ping e nota da conexão](#ping)
- [Ping Comedy Club](#comedy)
- [Configurações](#configuracoes)
- [Salvar e Abrir](#salvar-abrir)
- [Relatórios e impressão](#imprimir)
- [Privacidade e armazenamento](#privacidade)
- [Funcionamento offline e atualização](#offline)
- [Solução de problemas](#solucao)
- [Publicação e manutenção](#publicacao)

<a id="apresentacao"></a>

## Apresentação

O Pingnet é um observatório local da conectividade, destinado a acompanhar respostas HTTP, identificar alterações e organizar registros de uso da internet. Não é um medidor de velocidade contratada nem um instrumento certificado. Seu lema é “Sua internet, sem mistérios”.

<a id="primeiros-passos"></a>

## Instalação e primeiros passos

Abra o aplicativo pelo endereço https://magpe-stack.github.io/Pingnet/ no Chrome. Aguarde a abertura de quatro segundos e a preparação dos recursos offline. No menu Configurações, escolha Instalar Pingnet quando disponível; alternativamente, utilize o menu do navegador. A instalação não exige conta no aplicativo. O logotipo retorna ao Início; os botões superiores alternam o modo visual e abrem o menu. Tela cheia está disponível no cabeçalho e em Configurações quando suportada. O rodapé oferece GitHub, Ajuda e Sobre.

<a id="monitoramento"></a>

## Monitoramento e condições

As coletas começam automaticamente quando habilitadas. Cada rodada consulta Cloudflare Speed Test e Wikimedia em paralelo, sem cookies e sem cache, com limite de cinco segundos por consulta. As rodadas ocorrem aproximadamente uma vez por minuto, sem limite fixo. Restrições HTTP suspendem individualmente a referência, com espera progressiva. Não há autorização confirmada para monitoramento contínuo desses serviços. Em Configurações → Configurações → Coletas, é possível iniciar ou pausar, respeitando as restrições dos destinos.

Conexão estável: duas respostas válidas de até 350 ms. Engasgos: resposta parcial ou acima de 350 ms. Possível sinal enganoso: nenhuma resposta válida, embora o navegador indique conexão. Verificando interrupção: nenhuma resposta válida e navegador indica desconexão. Interrupção observada: três rodadas consecutivas sem resposta válida. Conexão recuperada: primeira rodada com resposta válida após interrupção. Observação inconclusiva: resposta inesperada ou restrição do serviço. Uma lacuna superior a 90 segundos reinicia a sessão e a confirmação. Nenhuma dessas condições identifica isoladamente a causa ou a responsabilidade da operadora.

<a id="inicio"></a>

## Painel Início e indicadores

O painel reúne as referências HTTP, a condição mais recente, o horário da última atualização e os indicadores diários. Coletas realizadas contam consultas individuais, não rodadas; duas referências representam duas coletas. Coletas OK são respostas verificadas; coletas não OK são as demais. Respostas válidas correspondem à proporção de coletas OK sobre o total. O tempo de resposta é a média das respostas válidas. Estabilidade estima o tempo disponível sobre o tempo classificado, excluindo lacunas e condições inconclusivas. Quedas contam entradas em interrupção confirmada; tempo interrompido e maior interrupção são estimativas entre observações. Engasgos contam rodadas classificadas como lentas. O travessão indica ausência de informação suficiente quando aplicável. Consulte sempre o horário da última coleta.

<a id="linha-do-tempo"></a>

## Linha do tempo

A faixa diária apresenta os intervalos estimados entre observações da mesma sessão, separadas por até 90 segundos. Em Linha do tempo, escolha a data. Verde representa estabilidade, amarelo engasgos, roxo possível sinal enganoso, vermelho interrupção, cinza-azulado condição inconclusiva e branco ausência de monitoramento ou período futuro. Uma coleta isolada não estabelece duração. Não se extrapola após a última observação.

<a id="historico"></a>

## Histórico

Escolha o período e a condição para consultar mudanças de estado, primeiras observações de sessões e anotações manuais. Os registros mais recentes aparecem primeiro, em grupos de 30. Consulte datas, horários e respostas das referências. Anotações não são medições e não alteram os indicadores.

<a id="comparativos"></a>

## Comparativos

Compare ontem com anteontem, os últimos sete dias completos com os sete anteriores ou os últimos 30 dias completos com os 30 anteriores. Hoje fica de fora. Somente registros da metodologia atual de duas referências entram nessa análise. Observe a cobertura classificada de cada período: contagens não são normalizadas e coberturas diferentes limitam a comparação.

<a id="horarios-criticos"></a>

## Horários críticos

Selecione hoje ou os últimos sete ou 30 dias completos. As 24 faixas horárias mostram a proporção de tempo classificado com engasgos, possível sinal enganoso ou interrupção. São necessários pelo menos cinco minutos classificados por faixa para exibir percentual. Selecione uma faixa para consultar suas durações. Esse percentual não é sinônimo de indisponibilidade e a cobertura mínima não garante representatividade.

<a id="anotacoes"></a>

## Anotações

Abra Observatório → Anotações e escolha Nova anotação. Informe data, horário, título (até 100 caracteres) e descrição (até 4.000 caracteres). Salve o registro. Use a pesquisa para localizar texto, Editar para corrigir e Excluir para remover mediante confirmação. Os registros pertencem ao perfil ativo e também aparecem no histórico e nos relatórios.

<a id="perfis"></a>

## Minha conexão

Em Configurações → Minha conexão, crie um perfil para cada rede que deseja acompanhar. Informe um nome e, opcionalmente, operadora, plano, velocidade contratada, contrato, titular, local e observações. Salve e selecione o perfil correspondente à rede em uso. A troca é manual, encerra a sessão anterior. Não altera a rede física. O perfil padrão preserva os registros iniciais. Na edição, a Zona de perigo permite excluir o perfil e seus registros após confirmação. O perfil padrão é recriado vazio quando excluído.

<a id="ping"></a>

## Ping e nota da conexão

Ping é o personagem flutuante que comenta as observações, com personalidade adaptativa, expressões e humor fictício. Arraste-o com mouse ou toque; com foco no personagem, utilize as setas. Toque para ouvir ou ler uma fala. A voz Pinglish é uma síntese eletrônica original, acompanhada de texto progressivo. A nota no painel Início varia de zero a dez, com até uma casa decimal, calculada a partir da rodada recente e das respostas válidas. Uma interrupção confirmada recebe zero; respostas parciais reduzem a nota. Após 90 segundos sem atualização, ou em condição insuficiente, aparece um travessão. A nota não mede velocidade nem constitui certificação. Piadas e humor não alteram seu cálculo.

<a id="comedy"></a>

## Ping Comedy Club

O repertório contém 40 piadas do pontinho, com pergunta, suspense de cinco segundos e resposta. Os efeitos incluem bateria e risadas locais, além de efeitos sintetizados. A frequência espontânea é moderada, com intervalo aproximado de oito minutos e possibilidade de piada a cada sexto toque. Em Configurações → Ping, controle piadas, efeitos de plateia e volume separadamente ou escolha Contar uma piada agora. A reprodução depende das permissões de áudio do navegador.

<a id="configuracoes"></a>

## Configurações

A área Ping controla visibilidade, voz, animações, efeitos de vibração com ajuste de duração dos pulsos, volume, tamanho e frequência das falas (Reservado, Equilibrado, Conversador e Tagarela). Visual oferece 12 temas: Jardim, Verão, Vulcão, Ecológico, Elegante, Sol, Aço, Oceano, Místico, Café, Cereja e Extravagante, cada um em claro e escuro. Café claro é o padrão. Ping pode comentar a escolha de tema; suas opiniões são fictícias, variam por dia e usam repertórios de 15 por tema. Coletas controla início automático, início manual e pausa. Dados permite verificar o armazenamento local. Preferências são preservadas no backup.

<a id="salvar-abrir"></a>

## Salvar e Abrir

Em Arquivo → Salvar, escolha o destino do JSON cumulativo no primeiro salvamento do dia. O nome sugerido é Pingnet-AAAA-MM-DD.json. Os salvamentos seguintes tentam reutilizar o mesmo arquivo e sua autorização. Em outro dia, um novo arquivo é sugerido. O recurso exige suporte à API de escrita de arquivos, como no Chrome desktop; não há download automático alternativo. O backup contém todos os perfis, sessões, medições, eventos, anotações, preferências e memória do Ping, mas não autorizações de arquivos. Não é criptografado.

Em Arquivo → Abrir, selecione um backup JSON. Confirme a substituição integral ou escolha mesclar. Na mesclagem, registros existentes com o mesmo identificador são preservados e preferências e memória importadas têm prioridade. Faça um backup antes de substituir dados. Feche outras abas do Pingnet antes de restaurar. Após a operação, o aplicativo recarrega.

<a id="imprimir"></a>

## Relatórios e impressão

Selecione o perfil desejado e abra Arquivo → Imprimir. Escolha Hoje, Ontem, Últimos 7 dias (inclui hoje), Mês atual, Ano atual, Personalizado ou Todo o histórico. Clique em Gerar relatório, confira a prévia e use Imprimir / Salvar PDF. O documento A4 apresenta identificação do perfil, indicadores, ocorrências, intervalos de interrupção estimados, anotações e metodologia. Dados pessoais cadastrados no perfil podem aparecer no relatório: revise antes de compartilhar. O relatório exclui o personagem e a nota. Pode auxiliar uma reclamação, mas não é laudo certificado nem prova de responsabilidade da operadora.

<a id="privacidade"></a>

## Privacidade e armazenamento

Os registros são guardados no navegador, principalmente em IndexedDB. Não há telemetria própria nem envio automático do histórico. As consultas externas expõem aos destinos os dados técnicos normais de uma conexão HTTP, inclusive o endereço IP público. O aplicativo não coleta automaticamente IP, MAC, SSID ou localização para seu histórico. Campos de perfil são preenchidos manualmente. Limpar dados do navegador, usar outro perfil do Chrome ou perder o dispositivo pode tornar os registros inacessíveis. Faça backups regulares e guarde-os em local seguro.

<a id="offline"></a>

## Funcionamento offline e atualização

Depois da preparação inicial do cache, a interface, os registros, as configurações, o Ping e a documentação podem funcionar offline. As consultas externas dependem de conectividade. Não há garantia de coleta com aplicativo fechado, suspenso ou dispositivo bloqueado. Em Configurações, Atualizações consulta o Service Worker; Aplicar atualização aparece quando disponível. Não apague o armazenamento para atualizar.

<a id="solucao"></a>

## Solução de problemas

Sem som na abertura: o Chrome pode bloquear áudio antes de interação; confira também voz e volume. A abertura dura quatro segundos e usa uma vinheta tecnológica original. Sem novas coletas: confira a espera dos servidores, a configuração automática, a conexão e se outra aba está monitorando. Resposta não verificada: pode decorrer de rede, destino ou restrições do navegador; não conclua que a operadora falhou. Nota ausente: aguarde nova rodada válida. Salvar indisponível: use Chrome desktop compatível e confira a permissão do arquivo. Impressão: gere a prévia antes de imprimir, escolha A4 e revise as páginas. Se a interface estiver desatualizada, verifique e aplique a atualização; preserve os dados locais.

<a id="publicacao"></a>

## Publicação e manutenção

Extraia o pacote e envie os arquivos da raiz e a pasta assets para a raiz do repositório Pingnet. O manifest utiliza o caminho /Pingnet/. Não envie somente o ZIP. Preserve a estrutura e os nomes dos arquivos. A aplicação usa HTML, CSS, JavaScript, IndexedDB, Cache API e Web Audio API, sem dependências de bibliotecas externas. Antes de distribuição pública definitiva, confirme as licenças dos recursos gráficos e sonoros fornecidos e a autorização de uso dos destinos de monitoramento. A homologação em dispositivos reais, incluindo impressão e restauração, permanece necessária.

