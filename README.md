# Pingnet — Observatório Local da Internet

![Pingnet](assets/logo.svg)

*Sua internet, sem mistérios.*

## Manual de software

## Sumário

- [1. Apresentação](#1-apresentacao)
  - [1.1 Finalidade e público](#1-1-finalidade-e-publico)
  - [1.2 O que o Pingnet não mede](#1-2-o-que-o-pingnet-nao-mede)
- [2. Instalação e navegação](#2-instalacao-e-navegacao)
  - [2.1 Primeiro acesso](#2-1-primeiro-acesso)
  - [2.2 Instalação como aplicativo](#2-2-instalacao-como-aplicativo)
  - [2.3 Cabeçalho, menu e rodapé](#2-3-cabecalho-menu-e-rodape)
- [3. Monitoramento da conexão](#3-monitoramento-da-conexao)
  - [3.1 Referências e frequência](#3-1-referencias-e-frequencia)
  - [3.2 Condições observadas](#3-2-condicoes-observadas)
  - [3.3 Restrições e continuidade](#3-3-restricoes-e-continuidade)
  - [3.4 Sessões e lacunas](#3-4-sessoes-e-lacunas)
- [4. Painel Início](#4-painel-inicio)
  - [4.1 Monitoramento e coletas](#4-1-monitoramento-e-coletas)
  - [4.2 Qualidade da conexão](#4-2-qualidade-da-conexao)
  - [4.3 Nota e interpretação conjunta](#4-3-nota-e-interpretacao-conjunta)
- [5. Linha do tempo e histórico](#5-linha-do-tempo-e-historico)
  - [5.1 Leitura da faixa diária](#5-1-leitura-da-faixa-diaria)
  - [5.2 Consulta do histórico](#5-2-consulta-do-historico)
  - [5.3 Calendário da qualidade](#5-3-calendario-da-qualidade)
- [6. Comparativos e horários críticos](#6-comparativos-e-horarios-criticos)
  - [6.1 Comparação entre períodos](#6-1-comparacao-entre-periodos)
  - [6.2 Identificação de horários críticos](#6-2-identificacao-de-horarios-criticos)
- [7. Organização dos registros](#7-organizacao-dos-registros)
  - [7.1 Perfis de conexão](#7-1-perfis-de-conexao)
  - [7.2 Exclusão de perfis](#7-2-exclusao-de-perfis)
  - [7.3 Anotações pessoais](#7-3-anotacoes-pessoais)
  - [7.4 Diário de protocolos](#7-4-diario-de-protocolos)
- [8. Ping e experiência audiovisual](#8-ping-e-experiencia-audiovisual)
  - [8.1 Personagem e comunicação](#8-1-personagem-e-comunicacao)
  - [8.2 Comedy Club e efeitos táteis](#8-2-comedy-club-e-efeitos-tateis)
  - [8.3 Lembretes de backup](#8-3-lembretes-de-backup)
- [9. Configurações e identidade visual](#9-configuracoes-e-identidade-visual)
  - [9.1 Preferências do personagem](#9-1-preferencias-do-personagem)
  - [9.2 Aparência e temas](#9-2-aparencia-e-temas)
  - [9.3 Coletas e dados](#9-3-coletas-e-dados)
- [10. Design da Gestalt e acessibilidade](#10-design-da-gestalt-e-acessibilidade)
  - [10.1 Proximidade, similaridade e região comum](#10-1-proximidade-similaridade-e-regiao-comum)
  - [10.2 Continuidade, fechamento e pregnância](#10-2-continuidade-fechamento-e-pregnancia)
  - [10.3 Figura-fundo e ponto focal](#10-3-figura-fundo-e-ponto-focal)
- [11. Backup e restauração](#11-backup-e-restauracao)
  - [11.1 Salvar os dados](#11-1-salvar-os-dados)
  - [11.2 Abrir e restaurar](#11-2-abrir-e-restaurar)
- [12. Relatórios e impressão](#12-relatorios-e-impressao)
- [13. Privacidade, funcionamento offline e atualizações](#13-privacidade-funcionamento-offline-e-atualizacoes)
- [14. Solução de problemas](#14-solucao-de-problemas)
  - [14.1 Monitoramento e indicadores](#14-1-monitoramento-e-indicadores)
  - [14.2 Áudio, vibração e arquivos](#14-2-audio-vibracao-e-arquivos)
- [15. Publicação e manutenção](#15-publicacao-e-manutencao)

<a id="1-apresentacao"></a>

## 1. Apresentação

O Pingnet é uma aplicação web progressiva destinada à observação da conectividade cotidiana. Seu propósito é transformar respostas de serviços externos em registros compreensíveis, permitindo acompanhar a disponibilidade percebida da internet, identificar alterações ao longo do dia e documentar situações que mereçam investigação. A aplicação reúne ferramentas de observação, análise, organização pessoal e documentação em uma interface que pode ser instalada como aplicativo, sem exigir cadastro ou assinatura.

<a id="1-1-finalidade-e-publico"></a>

### 1.1 Finalidade e público

O software atende pessoas que trabalham, estudam ou utilizam serviços digitais e desejam conhecer melhor o comportamento da conexão. Pode ser empregado em uma residência, escritório ou ambiente de estudo, tanto para acompanhar uma rede habitual quanto para comparar registros de diferentes locais. A observação é realizada a partir do dispositivo em uso; portanto, dois computadores conectados à mesma rede podem apresentar resultados diferentes em razão de suas condições particulares.

Uma utilização típica consiste em manter o aplicativo aberto durante o trabalho, consultar o painel quando uma página demora a carregar e registrar uma anotação caso ocorra uma dificuldade percebida. Ao final do dia, o histórico e a linha do tempo permitem recuperar o contexto daquela experiência, sem depender exclusivamente da memória do usuário. O relatório reúne esses registros para consulta posterior ou comunicação com o suporte técnico.

<a id="1-2-o-que-o-pingnet-nao-mede"></a>

### 1.2 O que o Pingnet não mede

O Pingnet não realiza um teste de velocidade contratada, não mede a capacidade máxima de download ou upload e não determina isoladamente a responsabilidade da operadora. Os tempos apresentados correspondem a operações HTTP realizadas pelo navegador, incluindo fatores como processamento do dispositivo, rede local, caminho até o destino e resposta do serviço remoto. Não equivalem ao comando ping tradicional nem a uma medição isolada da latência da rede.

Uma resposta válida demonstra que aquela consulta foi concluída conforme o critério adotado. Não demonstra que todos os sites estavam disponíveis naquele instante. Da mesma forma, uma resposta ausente não prova uma interrupção geral. A interpretação depende da sequência de observações, da diversidade de destinos e da cobertura temporal. O aplicativo é um instrumento de acompanhamento pessoal, não um equipamento de certificação ou perícia.

<a id="2-instalacao-e-navegacao"></a>

## 2. Instalação e navegação

<a id="2-1-primeiro-acesso"></a>

### 2.1 Primeiro acesso

Abra o [Pingnet](https://magpe-stack.github.io/Pingnet/) preferencialmente no Chrome atualizado. A primeira abertura exige conexão para obter os arquivos da aplicação. Aguarde a preparação da interface e do cache local. A apresentação inicial dura quatro segundos, com animação, logotipo e vinheta eletrônica original. O navegador pode bloquear a reprodução sonora automática; a ausência de som não impede o funcionamento das ferramentas.

Após a abertura, o painel Início apresenta o perfil ativo e os primeiros resultados disponíveis. Se a coleta automática estiver habilitada, o monitoramento começa sem exigir um comando adicional. Os cartões podem apresentar travessões enquanto aguardam respostas. Não é necessário recarregar a página para obter cada nova observação. Mantenha a aplicação aberta para permitir que os temporizadores do navegador executem as consultas.

<a id="2-2-instalacao-como-aplicativo"></a>

### 2.2 Instalação como aplicativo

Quando o navegador disponibilizar a instalação, utilize a opção Instalar Pingnet nas configurações ou no menu do próprio navegador. A instalação cria uma forma independente de abrir a aplicação, com ícone e janela próprios quando suportado. O procedimento não cria uma conta nem transfere os registros para um servidor. A disponibilidade do comando depende do navegador, do sistema operacional e dos requisitos de instalação da aplicação.

A instalação não concede ao Pingnet privilégios equivalentes aos de um serviço nativo de monitoramento permanente. O sistema pode suspender a execução em segundo plano ou quando a tela estiver bloqueada. Se desejar acompanhar uma atividade importante, mantenha a janela disponível e confira se o horário da última atualização continua avançando. A instalação e o monitoramento são recursos distintos.

<a id="2-3-cabecalho-menu-e-rodape"></a>

### 2.3 Cabeçalho, menu e rodapé

O logotipo conduz ao Início. No cabeçalho, os controles de aparência e tela cheia permitem ajustar a apresentação sem alterar os dados. O menu hambúrguer reúne Observatório, Configurações, Ajuda e Arquivo. Observatório contém Início, Linha do tempo, Histórico, Comparativos, Horários críticos e Anotações. Configurações reúne as preferências, Minha conexão e Atualizações. Ajuda oferece Manual e Sobre. Arquivo concentra Salvar, Abrir e Imprimir.

As categorias podem ser expandidas ou recolhidas para reduzir a quantidade de opções simultaneamente visíveis. O item ativo recebe destaque para indicar a localização atual. O menu é compacto, mas permite rolagem quando a altura da tela ou a ampliação do texto exigirem. O rodapé disponibiliza acessos institucionais e de ajuda. Utilize a tecla Escape para fechar o menu quando estiver navegando por teclado.

<a id="3-monitoramento-da-conexao"></a>

## 3. Monitoramento da conexão

<a id="3-1-referencias-e-frequencia"></a>

### 3.1 Referências e frequência

O motor consulta Cloudflare Speed Test, Wikimedia, GitHub, USGS e jsDelivr em sequência alternada. O intervalo nominal entre consultas é de doze segundos, com pelo menos sessenta segundos entre solicitações ao mesmo destino durante a execução do motor. Assim, em condições normais, são realizadas cinco consultas por minuto, sem limite fixo de rodadas. A frequência efetiva pode diminuir devido a restrições dos serviços, suspensão do navegador ou demora na execução.

Cada solicitação possui limite de espera de cinco segundos. O navegador é instruído a não utilizar cache e a omitir credenciais. A Cloudflare utiliza uma resposta vazia esperada, a Wikimedia utiliza uma resposta estruturada de informações do serviço e as demais referências utilizam consultas de cabeçalho. Os critérios de validação não são idênticos: por isso, os tempos de resposta devem ser entendidos como observações de operações diferentes, não como uma comparação laboratorial uniforme entre servidores.

<a id="3-2-condicoes-observadas"></a>

### 3.2 Condições observadas

Uma resposta válida de até 350 milissegundos é classificada como conexão estável, salvo quando representa uma recuperação. Uma resposta válida acima desse limite é classificada como engasgo. O limite é uma convenção do aplicativo, não uma norma universal. Quando uma consulta elegível falha e o navegador ainda indica conexão, o motor pode apresentar possível sinal enganoso; quando o navegador indica desconexão, pode apresentar verificação de interrupção.

A interrupção observada exige pelo menos três falhas elegíveis envolvendo dois ou mais destinos distintos. Uma resposta válida após o estado de interrupção pode indicar recuperação. Restrições identificadas, respostas inesperadas e falhas de referências experimentais ainda não comprovadas podem gerar observações inconclusivas. A indicação de conectividade do navegador é apenas um sinal auxiliar e não garante acesso efetivo à internet.

<a id="3-3-restricoes-e-continuidade"></a>

### 3.3 Restrições e continuidade

Respostas HTTP 403, 429 e 503 acionam espera individual para a referência, com aumento progressivo do intervalo e consideração do cabeçalho Retry-After quando acessível. Os demais destinos continuam elegíveis. Uma consulta não executada durante a espera não deve ser interpretada como nova falha. O cartão pode manter a última resposta conhecida, identificada pelo horário e, quando aplicável, pela indicação de resultado anterior.

O uso contínuo dos destinos externos ainda depende de confirmação de suas políticas e autorizações. A disponibilidade pública de uma URL não constitui permissão irrestrita para consultas automatizadas. O monitoramento é experimental e pode ser pausado em Configurações, na área Coletas. Não tente contornar bloqueios aumentando a frequência, alternando identidades ou removendo os mecanismos de espera.

<a id="3-4-sessoes-e-lacunas"></a>

### 3.4 Sessões e lacunas

As observações são agrupadas em sessões. Uma separação superior a noventa segundos entre observações reinicia a sessão e a confirmação de estados. Isso evita atribuir automaticamente a um período não observado a condição registrada antes de uma pausa. Fechar o aplicativo, suspender o computador ou bloquear o celular pode criar lacunas. O tempo não observado não é automaticamente tempo de conexão estável nem tempo de interrupção.

<a id="4-painel-inicio"></a>

## 4. Painel Início

<a id="4-1-monitoramento-e-coletas"></a>

### 4.1 Monitoramento e coletas

O primeiro bloco reúne a condição recente, os cartões das cinco referências, os horários individuais e o resumo das coletas do dia. Consulte os horários antes de comparar os números: as solicitações são alternadas e, portanto, os valores não foram necessariamente obtidos no mesmo instante. Um travessão indica que não existe resposta validada para apresentar naquele cartão. A última atualização identifica a conclusão mais recente registrada.

Coletas realizadas representa a quantidade de consultas efetivamente registradas. Coletas OK conta as respostas verificadas; Coletas não OK reúne as demais respostas registradas. Respostas válidas é o percentual de consultas verificadas sobre o total. A barra proporcional facilita a leitura desse resultado. Por exemplo, 90 respostas válidas em 100 consultas correspondem a 90%, independentemente da duração do período observado. Consultas não realizadas durante uma espera não entram nessa contagem.

<a id="4-2-qualidade-da-conexao"></a>

### 4.2 Qualidade da conexão

O segundo bloco reúne tempo de resposta, estabilidade, quedas, tempo interrompido, maior interrupção e engasgos. O tempo de resposta é a média das respostas válidas no período. A estabilidade representa a proporção do tempo classificado como disponível em relação ao tempo classificado total. Não utiliza o dia inteiro como denominador quando existem lacunas. Estados inconclusivos e períodos sem classificação suficiente ficam fora desse cálculo.

Quedas hoje conta entradas no estado de interrupção observada. Tempo interrompido soma intervalos estimados nesse estado e maior interrupção indica a sequência estimada mais longa. Engasgos conta observações classificadas como lentas. A duração é estimada entre observações consecutivas da mesma sessão, sem extrapolar após a última coleta. Uma interrupção detectada pode ter começado antes da confirmação; por isso, os números não representam cronômetros exatos de indisponibilidade.

<a id="4-3-nota-e-interpretacao-conjunta"></a>

### 4.3 Nota e interpretação conjunta

A nota do Ping aparece no bloco de qualidade, acompanhada de uma estrela. Varia de zero a dez, com até uma casa decimal, e utiliza respostas válidas recentes de pelo menos duas referências quando a condição permite. Uma interrupção confirmada pode receber zero. A nota desaparece quando os dados são insuficientes ou a última observação está desatualizada. Ela é uma avaliação simplificada da experiência observada, não uma nota oficial da operadora.

As médias de notas do dia, da semana ISO 8601 (segunda-feira a domingo, numerada de 01 a 52 ou 53), do mês e do ano aparecem no Início e são atualizadas a cada minuto. O bloco Qualidade da Conexão reúne a estrela Notas e cinco cartões compactos: Agora, Hoje, semana ISO numerada, mês e ano. Os rótulos identificam os períodos e acompanham as cores do tema ativo. São reconstruídas a partir das observações elegíveis do perfil, com a mesma escala da nota instantânea, sem preencher lacunas. O relatório inclui também a média do período selecionado e usa a data final do relatório como referência para as quatro janelas. O traço indica ausência de notas válidas. As médias são aritméticas por observação, não ponderadas por duração.

Não confunda nota, percentual de respostas válidas e estabilidade. São medidas diferentes, com critérios e janelas temporais diferentes. Uma conexão pode apresentar estabilidade elevada durante um período classificado e, simultaneamente, possuir respostas não verificadas. Uma nota elevada também não garante que um serviço específico esteja funcionando. Examine os três indicadores em conjunto com a cobertura temporal e o histórico.

<a id="5-linha-do-tempo-e-historico"></a>

## 5. Linha do tempo e histórico

<a id="5-1-leitura-da-faixa-diaria"></a>

### 5.1 Leitura da faixa diária

A linha do tempo representa as vinte e quatro horas do dia. No Início, apresenta o dia atual; na página Linha do tempo, permite selecionar uma data. Verde representa estabilidade, amarelo engasgos, roxo possível sinal enganoso, vermelho interrupção, cinza-azulado observação inconclusiva e branco ausência de monitoramento, incluindo períodos futuros. A legenda mantém a interpretação explícita e evita depender exclusivamente da memória das cores.

Uma faixa branca pela manhã pode significar que o aplicativo ainda não estava aberto. Uma faixa vermelha representa uma interrupção observada, não necessariamente todo o intervalo real em que a internet esteve indisponível. Uma única observação não estabelece duração. Ao investigar uma faixa curta, consulte o Histórico e os horários registrados. A resolução nominal de doze segundos não garante que todos os eventos mais curtos sejam detectados.

<a id="5-2-consulta-do-historico"></a>

### 5.2 Consulta do histórico

Abra Observatório, Histórico. Selecione o período e, quando necessário, a condição que deseja investigar. Os registros são apresentados do mais recente para o mais antigo, com carregamento progressivo em grupos de trinta. A ferramenta privilegia mudanças de estado e primeiras observações de sessões, além de incluir anotações manuais. Não é uma reprodução integral de cada solicitação HTTP na tela.

Para investigar uma dificuldade percebida, escolha o dia correspondente, procure a ocorrência próxima do horário e examine as respostas disponíveis. Uma anotação pode complementar a informação com o nome do serviço utilizado ou a descrição da atividade interrompida. Não transforme a coincidência de horários em conclusão causal: ela serve como ponto de partida para investigação, não como diagnóstico definitivo.

<a id="5-3-calendario-da-qualidade"></a>
### 5.3 Calendário da qualidade

O Calendário da qualidade, no menu Observatório, permite escolher um mês e consultar cada dia. A cor representa a condição predominante pela duração dos intervalos observados; em empate prevalece a condição mais crítica. Branco indica ausência de intervalos observados, incluindo dias futuros. Selecione um dia para consultar nota média, coletas, interrupções, engasgos, duração classificada, linha do tempo e anotações do perfil ativo. A consulta é local e atualizada ao abrir a página ou mudar o mês.

<a id="6-comparativos-e-horarios-criticos"></a>

## 6. Comparativos e horários críticos

<a id="6-1-comparacao-entre-periodos"></a>

### 6.1 Comparação entre períodos

Comparativos permite confrontar ontem com anteontem, os últimos sete dias completos com os sete anteriores ou os últimos trinta dias completos com os trinta anteriores. O dia em andamento é excluído para evitar comparação direta entre um dia parcial e um dia completo. A análise utiliza registros da metodologia alternada, que podem incluir conjuntos diferentes de referências ao longo do histórico.

Observe a cobertura classificada de cada período antes de interpretar diferenças. Um período com muitas horas observadas naturalmente oferece mais oportunidades de registrar ocorrências do que outro com poucos minutos. As contagens não são normalizadas pela duração. Se a cobertura for muito desigual, prefira interpretar as proporções com cautela e evite concluir que uma redução de ocorrências significa necessariamente melhoria da conexão.

O Livro dos recordes, no menu Observatório, reúne as melhores e piores médias diárias, semanais ISO, mensais e anuais, as respostas HTTP mais rápida e mais lenta, o maior período estável e a maior interrupção observada. Use Atualizar para consultar novamente. As médias incluem períodos parciais e exibem a quantidade de notas; empates favorecem o primeiro período cronológico. Intervalos são estimados entre coletas consecutivas da mesma sessão, sem contar lacunas. Os recordes são exclusivos do perfil ativo. A menor média só aparece quando há pelo menos dois períodos válidos; não significa necessariamente uma condição crítica. Em Horários críticos, o mapa de calor semanal cruza os sete dias com as 24 horas, em dois blocos de 12 horas, usando o período selecionado. Cada célula mostra a proporção de tempo com problemas entre intervalos classificados, com mínimo de cinco minutos; selecione uma célula para consultar os tempos. Lacunas e inconclusivos não entram no percentual.

Na página Comparativos, Evolução das notas apresenta médias mensais, semanas ISO de um ano ou os últimos 30 dias. Escolha o período e o ano e pressione Consultar para atualizar. O gráfico usa a escala de zero a dez, sem unir pontos separados por lacunas. Abra Valores e quantidade de notas para consultar as amostras. Os períodos em andamento são parciais; a consulta usa apenas o perfil ativo e os registros locais.

<a id="6-2-identificacao-de-horarios-criticos"></a>

### 6.2 Identificação de horários críticos

Horários críticos distribui as observações em vinte e quatro faixas horárias. Escolha hoje, os últimos sete dias completos ou os últimos trinta dias completos. Cada faixa apresenta a proporção de tempo classificado associada a condições problemáticas, incluindo engasgos, possível sinal enganoso e interrupção, conforme o cálculo da ferramenta. São necessários pelo menos cinco minutos classificados na faixa para apresentar um percentual.

Selecione uma faixa para examinar suas durações. Uma faixa com percentual elevado pode orientar a escolha de um horário para observação adicional. Não representa uma previsão garantida de problemas futuros. Para obter uma interpretação mais útil, acompanhe vários dias com horários semelhantes de utilização e compare a cobertura disponível. A ausência de percentual significa informação insuficiente, não ausência de problemas.

<a id="7-organizacao-dos-registros"></a>

## 7. Organização dos registros

<a id="7-1-perfis-de-conexao"></a>

### 7.1 Perfis de conexão

Em Configurações, Minha conexão, crie um perfil para cada rede ou contexto que deseja acompanhar separadamente. Informe um nome identificável, como Casa Wi-Fi ou Escritório. Os campos opcionais permitem registrar operadora, plano, velocidade contratada, contrato, titular, local e observações. Esses dados são fornecidos manualmente e não são obtidos automaticamente da rede.

Selecione o perfil correspondente antes de iniciar uma atividade. A troca encerra a sessão anterior e pode iniciar outra conforme a preferência de coleta automática. Ela não altera a conexão física do dispositivo. Se mudar de rede sem trocar o perfil, as novas observações continuarão associadas ao perfil selecionado. O nome apresentado no painel ajuda a evitar essa confusão.

<a id="7-2-exclusao-de-perfis"></a>

### 7.2 Exclusão de perfis

Abra a edição do perfil e localize a Zona de perigo abaixo dos controles de edição. O botão Excluir perfil exige confirmação. A exclusão remove os registros associados, incluindo medições, sessões, ocorrências e anotações. O perfil padrão é recriado vazio quando excluído. Faça um backup antes de confirmar caso exista qualquer possibilidade de precisar recuperar os registros posteriormente.

<a id="7-3-anotacoes-pessoais"></a>

### 7.3 Anotações pessoais

Abra Observatório, Anotações, e escolha Nova anotação. Informe data, horário, título de até cem caracteres e descrição de até quatro mil caracteres. Utilize um título objetivo, como Reunião interrompida, e descreva o que foi observado, evitando afirmar uma causa que não tenha sido confirmada. Salve o registro no perfil ativo.

A pesquisa permite localizar anotações pelo conteúdo. Utilize Editar para corrigir informações e Excluir para remover um registro mediante confirmação. As anotações aparecem também no histórico e nos relatórios, mas não modificam os indicadores de conectividade. Essa separação preserva a distinção entre observação automatizada e relato pessoal.

<a id="7-4-diario-de-protocolos"></a>

### 7.4 Diário de protocolos

Em Observatório → Diário de protocolos, cadastre o número, a operadora, a data do atendimento, o motivo e a situação. O prazo é opcional. Use a descrição para registrar o acompanhamento. Pesquise, filtre, edite ou exclua registros com confirmação. Prazos vencidos são protocolos abertos ou aguardando solução cujo prazo já passou. O Ping pode lembrar uma vez por dia, por perfil, sobre prazos vencidos ou nas próximas 24 horas, enquanto estiver visível e disponível. Os protocolos integram o backup e são excluídos junto com o perfil. Backups antigos sem protocolos continuam compatíveis; na restauração por substituição, protocolos atuais são apagados.

<a id="8-ping-e-experiencia-audiovisual"></a>

## 8. Ping e experiência audiovisual

<a id="8-1-personagem-e-comunicacao"></a>

### 8.1 Personagem e comunicação

Ping é um personagem flutuante que acompanha a navegação e comenta as observações. Seu repertório inclui expressões faciais, gestos, comentários sobre a conexão e manifestações de humor fictício. Arraste-o com mouse ou toque para uma posição conveniente. Com foco no personagem, utilize as setas para deslocá-lo. Toque para solicitar uma fala. A posição e as preferências são armazenadas localmente.

A voz Pinglish é uma síntese eletrônica original, acompanhada de texto progressivo. Não é uma voz humana nem exige um serviço remoto de inteligência artificial. O texto transmite o conteúdo da mensagem, enquanto os sons e expressões complementam a personalidade. A nota deve acompanhar apenas comentários relacionados à leitura da conexão, não opiniões sobre temas, lembretes ou piadas.

<a id="8-2-comedy-club-e-efeitos-tateis"></a>

### 8.2 Comedy Club e efeitos táteis

O espetáculo completo acontece a cada duas horas de programação, com oito piadas consecutivas, abertura, encerramento e anúncios aos 60, 30, 15, 5 e 1 minutos. As piadas espontâneas mantêm o intervalo mínimo de oito minutos, fora do espetáculo. O monitoramento continua durante o show. Em Configurações → Ping, é possível desligar o show completo separadamente ou iniciar oito piadas imediatamente pelo botão Show Ping Comedy Club agora, sem alterar o horário automático. A programação é local e depende de o aplicativo estar visível; ao retornar, um show vencido pode começar, sem acumular apresentações. Toque no Ping para interromper o espetáculo. Os efeitos respeitam os controles de som e vibração.

O Ping Comedy Club possui 202 piadas: 41 do pontinho e 161 de humor variado, incluindo perguntas e respostas, diálogos e monólogo. O motor alterna os dois grupos, sorteando sem repetir dentro de cada ciclo. As piadas originais do pontinho mantêm suspense de cinco segundos; as novas respeitam as pausas cadastradas. Diálogos são apresentados em falas sucessivas. Efeitos de bateria, risadas e sons sintetizados complementam a apresentação. A biblioteca local inclui seis novas reações de plateia, duas vinhetas de abertura, música de encerramento, trompete cômico, efeito de mola, toque musical e uma segunda bateria. O motor alterna gravações e seleciona reações variadas após a revelação da piada. As vinhetas antecedem a abertura e sucedem a despedida, sem competir com a voz. O controle de efeitos de plateia e seu volume também se aplicam às gravações. Os arquivos são fornecidos pelo usuário; a licença de redistribuição deve ser confirmada antes da publicação pública. As piadas espontâneas possuem frequência moderada e podem ocorrer após interações com o personagem. Em Configurações, Ping, utilize Contar uma piada agora para solicitar uma apresentação diretamente.

Os efeitos de vibração são reservados a momentos especiais, em vez de acompanhar todas as falas. A preferência permite ativá-los ou desativá-los e ajustar a intensidade percebida pela duração dos pulsos. A API do navegador não controla diretamente a potência física do motor. Utilize Testar vibração para verificar a resposta do dispositivo; a aceitação do comando não comprova que houve vibração física.

<a id="8-3-lembretes-de-backup"></a>

### 8.3 Lembretes de backup

O Ping lembra o usuário de proteger os registros quando não existe salvamento confirmado nas últimas duas horas. Os avisos ficam separados por pelo menos duas horas e são verificados aproximadamente a cada minuto enquanto o aplicativo está em execução. Uma fala em andamento, a abertura, a invisibilidade do personagem ou a suspensão da página podem adiar a apresentação. O aviso não interrompe uma piada nem inclui a nota da conexão.

Após salvar com sucesso, o intervalo de duas horas começa novamente. Se o aplicativo for fechado, não há garantia de aviso externo ou notificação do sistema. A preferência Lembretes de backup, ativada por padrão, permite desativar essa comunicação. O lembrete não realiza o backup automaticamente: é necessário utilizar Arquivo, Salvar, e confirmar a operação.

<a id="9-configuracoes-e-identidade-visual"></a>

## 9. Configurações e identidade visual

<a id="9-1-preferencias-do-personagem"></a>

### 9.1 Preferências do personagem

Em Configurações, abra a área Ping. É possível controlar visibilidade, voz Pinglish, animações, lembretes, vibração, volume, tamanho e frequência das falas. As opções Reservado, Equilibrado, Conversador e Tagarela permitem adequar a presença do personagem à atividade. Os efeitos de plateia, o volume correspondente e as piadas possuem controles próprios. Desativar a voz não impede necessariamente a apresentação de texto.

<a id="9-2-aparencia-e-temas"></a>

### 9.2 Aparência e temas

A área Visual reúne Jardim, Verão, Vulcão, Ecológico, Elegante, Sol, Aço, Oceano, Místico, Café, Cereja e Extravagante. Cada tema possui modos claro e escuro, totalizando vinte e quatro combinações. Café claro é a configuração inicial. Selecione uma opção na galeria para alterar a identidade cromática. O controle de modo também está disponível no cabeçalho, assim como tela cheia quando suportada.

Ping pode comentar a seleção de um tema com opiniões fictícias que variam conforme o dia. O repertório possui quinze opiniões por tema. Essas manifestações são parte da personalidade do personagem, não avaliações técnicas de acessibilidade ou qualidade da conexão. Escolha a aparência que favoreça sua leitura e conforto, independentemente da opinião apresentada.

<a id="9-3-coletas-e-dados"></a>

### 9.3 Coletas e dados

Na área Coletas, controle o início automático e utilize os comandos de iniciar ou pausar o monitoramento. Pausar não apaga o histórico. Na área Dados, consulte as informações disponíveis sobre o armazenamento local. As preferências integram o backup, permitindo recuperar a configuração junto com os registros. A disponibilidade de determinados recursos depende das APIs oferecidas pelo navegador.

<a id="10-design-da-gestalt-e-acessibilidade"></a>

## 10. Design da Gestalt e acessibilidade

<a id="10-1-proximidade-similaridade-e-regiao-comum"></a>

### 10.1 Proximidade, similaridade e região comum

A interface agrupa elementos relacionados para facilitar a compreensão. Os cartões das referências e os contadores de coletas compartilham uma região, enquanto os indicadores de qualidade ocupam outra. Essa organização aplica proximidade e região comum: informações que pertencem ao mesmo processo são percebidas como conjunto. A similaridade aparece na repetição de formas, bordas, hierarquia tipográfica e estrutura dos cartões.

Ao utilizar o aplicativo, leia primeiro o título do bloco e depois seus valores. Essa sequência reduz a necessidade de interpretar números isolados. A repetição dos padrões entre páginas facilita reconhecer controles e indicadores mesmo quando o tema é alterado. A cor não deve ser a única pista para interpretar um resultado; títulos, legendas e valores fornecem contexto adicional.

<a id="10-2-continuidade-fechamento-e-pregnancia"></a>

### 10.2 Continuidade, fechamento e pregnância

A linha do tempo utiliza continuidade para organizar observações em uma sequência cronológica. O alinhamento dos cartões e a repetição de intervalos visuais favorecem a leitura ordenada. O fechamento é explorado pela delimitação de painéis e pela percepção de conjuntos mesmo quando existem espaços entre elementos. As lacunas da linha do tempo, contudo, não devem ser preenchidas mentalmente como se fossem dados reais.

A pregnância, ou boa forma, orienta a preferência por estruturas simples, reconhecíveis e com poucos elementos concorrentes. O menu agrupado, os títulos diretos e a redução de textos redundantes ajudam a preservar essa organização. A compactação não deve impedir a leitura: quando necessário, a rolagem permanece disponível para acomodar telas pequenas ou ampliação de texto.

<a id="10-3-figura-fundo-e-ponto-focal"></a>

### 10.3 Figura-fundo e ponto focal

Os painéis, bordas e superfícies temáticas distinguem conteúdo e fundo. A nota, posicionada dentro do bloco de qualidade, funciona como ponto focal sem ocupar o cabeçalho global. Os valores numéricos recebem maior destaque que seus rótulos, enquanto horários e explicações complementares possuem hierarquia secundária. Essa distribuição procura equilibrar atenção e contexto, evitando que um único indicador substitua a interpretação do conjunto.

A acessibilidade é favorecida por controles identificados, navegação por teclado, legendas textuais, opções de contraste e respeito à preferência de movimento reduzido quando aplicável. Esses recursos não equivalem a uma certificação formal de conformidade. Se uma combinação visual dificultar a leitura, altere o tema ou o modo, amplie o texto e utilize a rolagem disponível. A homologação com tecnologias assistivas e dispositivos reais continua importante.

<a id="11-backup-e-restauracao"></a>

## 11. Backup e restauração

<a id="11-1-salvar-os-dados"></a>

### 11.1 Salvar os dados

Abra Arquivo, Salvar. No primeiro salvamento do dia, escolha a pasta e o arquivo sugerido Pingnet-AAAA-MM-DD.json. Nos salvamentos seguintes, o aplicativo tenta reutilizar o mesmo arquivo e a autorização correspondente. Em outro dia, sugere um novo arquivo. A operação depende da API de acesso a arquivos, disponível em navegadores desktop compatíveis. Não existe download automático alternativo nesta implementação.

O arquivo é cumulativo e reúne todos os perfis, sessões, medições, eventos, anotações, preferências e memória do Ping. Não inclui as autorizações de acesso aos arquivos do dispositivo. Aguarde a confirmação de salvamento antes de fechar a aplicação. Guarde cópias em local seguro e, periodicamente, mantenha uma cópia separada do dispositivo principal. O JSON não é criptografado e pode conter informações pessoais cadastradas manualmente.

<a id="11-2-abrir-e-restaurar"></a>

### 11.2 Abrir e restaurar

Antes de restaurar, salve uma cópia dos dados atuais e feche outras abas do Pingnet. Abra Arquivo, Abrir, selecione o JSON e leia as confirmações. A substituição integral remove os dados locais abrangidos pelo backup e os substitui pelos importados. A mesclagem preserva registros locais com identificadores coincidentes, acrescenta registros ausentes e aplica preferências e memória importadas. Escolha conforme a finalidade da recuperação.

O aplicativo valida a estrutura básica do arquivo antes de escrever os registros. Um arquivo inválido ou incompatível pode ser recusado. Após uma restauração bem-sucedida, a interface recarrega. Confira o perfil ativo, as anotações e o histórico antes de retomar o uso. Não edite manualmente o JSON sem conhecer sua estrutura; alterações indevidas podem comprometer a recuperação.

<a id="12-relatorios-e-impressao"></a>

## 12. Relatórios e impressão

Selecione o perfil desejado e abra Arquivo, Imprimir. Escolha Hoje, Ontem, Últimos sete dias (incluindo hoje), Mês atual, Ano atual, Personalizado ou Todo o histórico. Gere o relatório e confira a prévia antes de utilizar Imprimir / Salvar PDF. O navegador oferece as opções de impressora, papel e destino PDF. Utilize A4 e revise a paginação antes de confirmar.

O documento reúne identificação da conexão, indicadores, ocorrências, intervalos estimados de interrupção, anotações e metodologia. O personagem, seus controles e a nota não fazem parte da impressão. Os dados pessoais cadastrados no perfil podem aparecer no documento; revise-os antes de compartilhar. O relatório pode auxiliar a comunicação com o suporte, mas não constitui laudo certificado nem comprova responsabilidade da operadora.

<a id="13-privacidade-funcionamento-offline-e-atualizacoes"></a>

## 13. Privacidade, funcionamento offline e atualizações

Os registros permanecem no navegador, principalmente em IndexedDB. Não há telemetria própria ou envio automático do histórico. As consultas externas expõem aos destinos informações técnicas normais de uma conexão HTTP, inclusive o endereço IP público. O aplicativo não coleta automaticamente IP, MAC, SSID ou localização para seu histórico. Os dados manuais do perfil devem ser tratados com cuidado.

Depois da preparação inicial do cache, a interface, documentação, configurações, personagem e registros podem ser acessados offline. As consultas externas continuam dependendo da conectividade. Limpar dados do navegador, mudar de perfil do Chrome ou perder o dispositivo pode tornar os registros inacessíveis. A instalação como aplicativo não substitui o backup.

Em Configurações, Atualizações, solicite a verificação do Service Worker. Quando houver atualização disponível, utilize o comando de aplicação correspondente. Preserve os dados locais durante o procedimento. Não é necessário apagar o histórico para atualizar. Se houver dúvida sobre a versão em execução, consulte Ajuda, Sobre.

Em Observatório, Cobertura e servidores, escolha Hoje, últimos sete ou trinta dias e consulte os intervalos efetivamente observados, classificados, inconclusivos e sem monitoramento. A cobertura divide o tempo observado pelo período decorrido até a consulta. A tabela dos cinco destinos atuais mostra respostas válidas, tempo médio das respostas válidas, restrições, tempos esgotados e outras respostas não verificadas. Não mede disponibilidade isolada do servidor nem identifica a causa das falhas. Atualizar consulta somente o histórico local.

<a id="14-solucao-de-problemas"></a>

## 14. Solução de problemas

<a id="14-1-monitoramento-e-indicadores"></a>

### 14.1 Monitoramento e indicadores

Se o horário da última atualização não avançar, confira se a coleta está habilitada, se a janela está ativa e se outra aba está monitorando. Uma referência em espera pode manter um resultado anterior. Aguarde novas consultas elegíveis e observe os demais destinos. Se todos os cartões permanecerem sem resposta, verifique a conexão por outros meios antes de atribuir o problema à operadora.

Se a nota apresentar travessão, aguarde respostas recentes suficientes. Se a estabilidade parecer incompatível com o percentual de respostas válidas, lembre-se de que os denominadores são diferentes. Uma faixa branca representa falta de observação, não estabilidade. Consulte a cobertura e o histórico para interpretar o resultado.

<a id="14-2-audio-vibracao-e-arquivos"></a>

### 14.2 Áudio, vibração e arquivos

Se a abertura não emitir som, interaja com a aplicação e confira as preferências de voz e volume. O bloqueio de reprodução automática pode impedir a vinheta. Se a vibração não funcionar, utilize o teste nas configurações e confira o suporte do dispositivo. Computadores sem motor de vibração não produzirão efeito físico.

Se Salvar estiver indisponível, utilize um navegador desktop compatível com a API de escrita e confira a autorização do arquivo. Se a restauração for recusada, confirme que selecionou um backup do Pingnet. Se a impressão apresentar cortes, gere novamente a prévia e revise as opções de papel e escala do navegador. Preserve uma cópia dos dados antes de qualquer procedimento de manutenção.

<a id="15-publicacao-e-manutencao"></a>

## 15. Publicação e manutenção

Para publicar o software, extraia o pacote em uma pasta vazia e envie os arquivos da raiz e a pasta assets para a raiz do [repositório Pingnet](https://github.com/magpe-stack/Pingnet). Não envie somente o ZIP nem inclua diretórios de versões anteriores. O manifest utiliza o caminho /Pingnet/. Preserve nomes, capitalização e estrutura dos recursos. A aplicação utiliza HTML, CSS, JavaScript, IndexedDB, Cache API e Web Audio API, sem bibliotecas externas obrigatórias.

Antes de uma distribuição pública definitiva, confirme as licenças dos recursos gráficos e sonoros fornecidos e as permissões de uso recorrente dos destinos externos. Teste instalação, atualização, restauração, impressão, acessibilidade e monitoramento prolongado em dispositivos reais. A documentação descreve os recursos existentes e suas limitações; não substitui a homologação prática. O objetivo da manutenção é preservar os dados, a coerência visual e a interpretação responsável das observações.


## Dossiê da conexão

Em Observatório → Dossiê da conexão, selecione o período e gere a prévia. O documento reúne identificação do perfil, notas, indicadores, ocorrências, interrupções, anotações, protocolos cadastrados no período e distribuição temporal por condição. Use Imprimir / Salvar PDF para guardar o documento. Os protocolos mostram a situação atual cadastrada, não um histórico de alterações. Confira os dados pessoais antes de compartilhar. O dossiê é um registro auxiliar, não um laudo certificado.


## Comparação entre perfis

Em Observatório → Comparação entre perfis, selecione dois perfis distintos e as datas inicial e final. Consulte notas, cobertura, estabilidade, respostas e interrupções lado a lado. A seleção não altera o perfil ativo. Não há classificação automática de vencedor; horários e cobertura diferentes limitam a interpretação.


<a id="ping-detective"></a>

## Ping Detective

Em Observatório → Ping Detective, selecione 7, 30 ou 90 dias e clique em Investigar. A análise usa somente o perfil ativo. Exige três dias com tempo classificado, uma hora classificada e 30 coletas. Horários recorrentes exigem três dias com pelo menos cinco minutos classificados e 20% de engasgos ou interrupções, além de 20% no conjunto elegível. Destinos exigem 20 coletas próprias, 40 nos demais, respostas não verificadas em três dias, taxa de 20% e diferença de 15 pontos percentuais. Três entradas em interrupção geram um indício adicional. Ausência de indícios não garante ausência de problemas. Não identifica causas nem responsáveis.


<a id="ping-news"></a>

## Ping News

Em Observatório → Ping News, escolha edição diária, semanal, mensal ou anual. Use Anterior, Seguinte e Atual para navegar por períodos de calendário; semanas começam na segunda-feira. A edição atual é parcial. O boletim reúne manchete, notas, cobertura, estabilidade, coletas, interrupções e agilidade HTTP, exclusivamente a partir do perfil ativo. Não há notícias externas, novas requisições ou diagnóstico causal. As edições são reconstruídas na consulta, não arquivadas como documentos imutáveis.


<a id="central-de-manutencao"></a>

## Central de manutenção e integridade

Em Configurações → Central de manutenção, use Verificar agora para consultar a estimativa de armazenamento da origem, a persistência, as contagens do banco, referências a perfis e sessões, presença dos recursos offline e último salvamento registrado. A cota é compartilhada por aplicativos da mesma origem e não corresponde ao espaço livre do dispositivo. A verificação é somente leitura e não garante integridade binária ou existência do arquivo de backup. Use Salvar backup para abrir o fluxo habitual de salvamento.


<a id="exportacao-csv"></a>

## Exportação CSV

Em Arquivo → Exportar CSV, selecione medições HTTP, anotações ou protocolos, o separador e o intervalo de datas ou todo o histórico do perfil ativo. O CSV usa UTF-8 com BOM e datas UTC ISO 8601. Cada resposta HTTP ocupa uma linha. Campos ausentes ficam vazios; textos que possam ser fórmulas recebem apóstrofo de proteção. Confira o download do navegador. CSV não substitui backup JSON e pode conter dados pessoais.

<a id="comedy-club"></a>
## Agenda e camarim do Comedy Club

Em Observatório → Ping Comedy Club, consulte a agenda automática, a contagem regressiva, o progresso do espetáculo e os shows concluídos nesta aba. Inicie um show ou uma piada manualmente. O camarim permite visualizar os acessórios originais. Microfone, cartola, bateria e trompete acompanham momentos da apresentação. A agenda depende do aplicativo aberto e visível. Os contadores de shows desta aba reiniciam ao recarregar. Verifique a licença dos novos arquivos antes de publicar.


### Sonoplastia ampliada

A sonoplastia inclui novas vinhetas, reações cômicas e três montagens curtas. As trilhas variam na abertura e no encerramento; os efeitos de humor variam após as piadas, com efeitos de flatulência reservados a textos com palavras relacionadas. O volume e a chave de sonoplastia existentes continuam válidos. Os créditos estão em assets/comedy-creditos.txt; confirme as licenças antes de publicar.


<a id="modo-silencioso-e-atalhos"></a>
## Modo silencioso e atalhos

O modo silencioso pode ser alternado pelo botão de alto-falante no cabeçalho ou em Configurações → Ping. Suspende voz, vinhetas, efeitos sonoros e vibração, inclusive durante apresentações, sem modificar os volumes ou as preferências individuais. Os textos, acessórios, animações e coletas continuam disponíveis. A preferência integra o backup JSON. Os atalhos do aplicativo instalado permitem abrir Início, Histórico, Diário de protocolos e Ping Comedy Club; sua disponibilidade depende do navegador e do sistema operacional.


## Retrospectiva anual

A Retrospectiva anual, em Observatório, permite consultar um ano do perfil ativo, com oito indicadores, médias mensais, destaques e uma apresentação manual em quatro quadros. A vinheta utiliza a sonoplastia existente e respeita o modo silencioso. Meses sem notas aparecem com travessão; o ano atual é parcial. Não gera novas coletas.


## Coreografias contextuais

Motor de coreografias contextuais: o Ping combina até dois acessórios com as expressões, gestos e efeitos existentes. As cenas de comédia têm prioridade sobre lembretes e leituras. Os acessórios desaparecem automaticamente, ao cancelar uma apresentação ou ocultar a aba. O modo silencioso e a redução de movimento continuam respeitados.


## Personalidades contextuais do Ping

As 12 personalidades do Ping são Detective, Jornalista, Cientista, Comediante, Mecânico, Professor, Artista, Maestro, Bibliotecário, Estatístico, Fiscal e Guardião. Toque no pequeno acessório ao lado do título de uma ferramenta para convidar o personagem a apresentar seu papel. A cena usa dois objetos, expressão e gesto do motor existente, diálogo e, em papéis selecionados, uma vinheta após a fala. O modo silencioso é respeitado. O convite não interrompe espetáculos ou lembretes e não altera medições.

## Identidade visual das ferramentas

Os menus e títulos das ferramentas usam acessórios tridimensionais locais, com tamanho padronizado. Os textos e botões continuam disponíveis; os ícones decorativos não são anunciados por leitores de tela e não aparecem na impressão. Os botões de personalidade continuam independentes.

## Museu do Ping

Em Observatório → Museu do Ping, explore o acervo por categoria ou busca por nome, emoji e código. Selecione um item para ampliar. Adicione até dois acessórios ao guarda-roupa e pressione Experimentar no Ping. A cena dura sete segundos, quando o personagem estiver disponível. Expressões e gestos são apenas consultáveis. A seleção é temporária e não altera medições ou preferências. Nomes sem tradução usam a nomenclatura Unicode em inglês.
