# Pingnet — Observatório Local da Internet

*Sua internet, sem mistérios.*

## Infraestrutura PWA — etapa 05 de 30

Esta entrega contém navegação funcional, identidade oficial, tema Café inicial, alternância clara/escura persistida localmente, estrutura modular e recursos originais. Não realiza medições nem gera registros fictícios. As áreas futuras estão explicitamente identificadas.

## Publicação

Extraia o ZIP. Envie os arquivos da raiz e a pasta `assets` para a raiz do repositório GitHub Pages. Não envie o ZIP como substituto dos arquivos. Guarde uma cópia da versão anterior. Se houver um Service Worker antigo, remova seu registro nas ferramentas de desenvolvedor do Chrome (Application > Service Workers > Unregister) e recarregue. Não limpe o armazenamento se precisar preservar dados antigos. A migração de dados antigos não está incluída.

## Recursos

Os logotipos fornecidos foram preservados; favicon e ícone adaptável foram derivados. Os WebP e sete JSON originais foram incluídos para integração posterior. Os JSON foram normalizados sintaticamente, mas suas falas ainda não foram revisadas semanticamente nem são executadas. Licenças dos recursos gráficos ainda devem ser confirmadas antes de distribuição definitiva.

## Próximas etapas

Banco IndexedDB (06), motor de monitoramento (07). As demais funcionalidades seguem o plano aprovado. O manifest e o Service Worker estão incluídos.

## Sistema visual

`tokens.css` centraliza cores, espaçamentos, tipografia, dimensões de toque e estados semânticos. `styles.css` aplica os tokens aos componentes. A denominação institucional agora é Observatório Local da Internet. Os estados de foco, interação e movimento reduzido foram refinados. A homologação visual no Chrome e no celular permanece necessária.

## Temas cromáticos

Em Configurações de Sistema, selecione uma das 12 paletas por botão de opção. Cada tema possui modo claro e escuro. Café claro é o padrão inicial; a seleção e o modo persistem em localStorage. As cores de monitoramento não mudam. A integração ao IndexedDB e ao backup ocorrerá nas etapas correspondentes. O evento `pingnet:theme-selected` prepara a integração futura do Ping; as opiniões ainda não são executadas.

## Interface responsiva

Cabeçalho e rodapé permanecem visíveis; somente a área central rola quando necessário. Início usa cartões compactos e grade adaptativa. O menu sanfona tem rolagem independente e opção de tela cheia quando suportada. Telas pequenas, zoom e conteúdo extenso permitem rolagem para preservar acessibilidade. A impressão remove os limites de altura.

## Instalação e funcionamento offline

Abra por HTTPS no Chrome. Aguarde a preparação dos recursos offline. Em Exibição, use Instalar Pingnet quando oferecido pelo navegador; também é possível usar o menu do Chrome. Desconecte a internet e recarregue para testar. A primeira preparação exige conexão. Em Exibição, Verificar atualização consulta o Service Worker; Aplicar atualização aparece quando uma versão está aguardando. O cache é versionado e não intercepta destinos externos. O armazenamento local não é apagado. O título e subtítulo não são links; somente o logotipo leva ao Início. O monitoramento depende da conexão com destinos externos.

## Armazenamento local e isolamento

Etapa 06: IndexedDB `pingnet-observatorio-local-Pingnet`, versão 1. Coleções: preferences, profiles, sessions, measurements, events, notes, pingState e fileHandles. Índices por perfil e data para consultas futuras. Apenas o perfil padrão e as preferências de aparência são gravados nesta etapa; nenhuma medição é simulada. Em Configurações de Sistema, Verificar armazenamento consulta contagens reais. O manifest fixa a identidade e o escopo em `/Pingnet/`, portanto publique nesse diretório exato. O cache tem prefixo próprio e a atualização remove somente caches conhecidos do Pingnet. Não limpe os dados da origem compartilhada com outros aplicativos. O backup externo será implementado na etapa 26.

## Monitoramento experimental
Duas referências funcionalmente testadas: Cloudflare Speed Test e Wikimedia. Coletas automáticas limitadas a seis rodadas por abertura, com intervalo de 60 segundos. Restrições HTTP encerram a bateria. Não há autorização confirmada para uso contínuo. Três rodadas consecutivas sem resposta validada indicam interrupção observada, não prova de falha da operadora. Respostas parciais ou acima de 350 ms indicam engasgos provisórios. Lacunas superiores a 90 segundos reiniciam a confirmação. Registros anteriores preservados. Nenhum indicador histórico calculado nesta etapa.

## Etapa 09 — Sessões de monitoramento

Cada sequência de coletas recebe um identificador local. Uma lacuna superior a 90 segundos entre inícios de coletas, ou relógio retrocedendo, inicia nova sessão e reinicia a classificação. O encerramento registra somente até a última observação concluída, sem atribuir tempo de indisponibilidade a períodos sem coleta. Encerramentos abruptos podem deixar sessões abertas; seu último horário observado continua sendo o limite válido. Registros antigos sem sessão são preservados. A visualização e os cálculos serão implementados nas etapas seguintes. Mantido o limite experimental de seis rodadas por abertura.

## Etapa 10 — Indicadores
O resumo diário utiliza a média dos tempos de respostas verificadas e conta consultas individuais, inclusive registros anteriores. Engasgos contam rodadas classificadas como lentas. Quedas contam entradas no estado de interrupção observada. A estabilidade estima a proporção de tempo disponível entre observações consecutivas da mesma sessão, separadas por até 90 segundos; estados inconclusivos e lacunas não entram no denominador. Não extrapola após a última coleta. A duração de interrupção é conservadora e começa na classificação confirmada. Sem intervalo suficiente, mostra travessão. Os quatro indicadores de coletas são diários e incluem todas as consultas concluídas, mesmo as não verificáveis; não equivalem à estabilidade. Mantido o limite experimental anterior.

## Etapa 11 — Painel Início

O cartão promocional foi removido; o logotipo principal permanece. Servidores, estado da coleta, contadores e horário real da última rodada registrada estão no mesmo painel. Resultados anteriores permanecem identificados pelo horário, inclusive após o fim da bateria. A qualidade diária fica em painel separado. A interface compacta permite rolagem quando necessária por tamanho de tela ou acessibilidade. A linha do tempo real será implementada na etapa 12; não se apresenta uma faixa cinza fictícia. O intervalo e limite experimental de coletas permanecem inalterados.

## Etapa 12 — Linha do tempo
Visualização diária na página Início e seleção de data na página Linha do tempo. Intervalos estimados apenas entre rodadas consecutivas da mesma sessão, separadas por até 90 segundos. Cinza inclui períodos futuros e sem monitoramento; inconclusivo é distinto de interrupção. Salvar e Abrir permanecem previstos para a etapa 26.

## Etapa 13 — Histórico
Consulta local de mudanças de condição e primeiras observações de sessões, com período e filtro por condição. Exibe data, hora e resultados da rodada, em ordem decrescente, 30 registros por vez. Não infere acontecimentos em lacunas. Possível sinal enganoso usa roxo #9333EA. Salvar e Abrir previstos para etapa 26.

## Comparativos (etapa 14)
Compare ontem com anteontem, ou dois períodos consecutivos de 7 ou 30 dias completos. Hoje é excluído. Apenas registros da metodologia atual (versão de medição 9, dois destinos) entram no cálculo. A cobertura classificada é exibida separadamente; lacunas e estados inconclusivos não entram no denominador da estabilidade. Contagens não são normalizadas e dependem da cobertura. Sem dados suficientes, indicadores indisponíveis aparecem como travessão. Consulta local offline.

## Horários críticos (etapa 15)
Consulte 24 faixas horárias locais, hoje ou nos últimos 7/30 dias completos. A proporção de problemas soma engasgos, possíveis sinais enganosos e interrupções, divididos pelo tempo classificado nessas condições ou estável. Não equivale ao percentual de indisponibilidade. Lacunas e inconclusivos são excluídos. Exige cinco minutos classificados por faixa para apresentar percentual e identificar a maior proporção; esse mínimo operacional não garante representatividade estatística. Selecione uma faixa para ver suas durações. Somente metodologia atual, consulta local offline. Salvar/Abrir permanecem previstos para etapa 26.

## Anotações — etapa 16

Abra Anotações no menu Observatório. Use Nova anotação, informe data e horário, título (até 100 caracteres) e descrição (até 4.000 caracteres). Salvar anotação grava no IndexedDB; Editar permite corrigir o registro e Excluir solicita confirmação. A pesquisa consulta título e descrição; os registros mais recentes aparecem primeiro, em grupos de 30. O Histórico também inclui anotações identificadas como registros manuais, com filtro próprio. Elas não alteram os indicadores automáticos. Nesta etapa utiliza-se o perfil padrão; perfis múltiplos serão implementados na etapa 17. Salvar/Abrir arquivos permanece previsto para a etapa 26. Não há envio de anotações a servidores.

## Minha conexão — etapa 17
Crie e edite perfis em Sistema → Minha conexão. Selecione manualmente o perfil da rede atual. O perfil ativo é persistido no IndexedDB. As consultas e anotações são isoladas por perfil; os registros anteriores permanecem no perfil padrão. A troca encerra a sessão anterior sem reiniciar a cota experimental de seis rodadas por abertura. Não há identificação automática de rede nem exclusão de perfis nesta etapa, para preservar registros. Campos adicionais são opcionais e locais. Salvar/Abrir geral continua previsto para a etapa 26.


## Ping — personagem flutuante (etapa 18)
Arraste o Ping com mouse ou toque, ou use as setas quando o botão estiver em foco. Toque para uma fala inicial. A posição é guardada no IndexedDB e ajustada aos limites da tela. O personagem não aparece na impressão. Expressões contextuais, repertório completo e voz serão incorporados nas próximas etapas.

## Expressões e coreografia do Ping
O personagem reage à condição recente do perfil ativo enquanto a coleta está em andamento. Quando parada, apresenta expressão de repouso. Gestos espontâneos e animações respeitam a redução de movimento; o arraste interrompe a animação. A linha do tempo utiliza branco para períodos sem monitoramento, inclusive futuros, em ambos os modos visuais.

## Etapa 20 — Cérebro do Ping
Humor fictício diário persistido em pingState, separado das observações. Falas contextuais ao toque e automaticamente, com intervalo mínimo de 20 segundos e 90 segundos para repetição de condição. Não fala automaticamente em aba oculta ou durante arraste. Sem nota numérica nesta etapa; repertório completo e voz nas próximas etapas.

## Repertório contextual
800 entradas adaptadas em sete grupos, com IDs e metadados gráficos originais preservados. Os textos ativos são combinações conservadoras de frases por condição; os JSON originais permanecem intactos. Estados inconclusivos e de verificação mantêm as falas específicas anteriores. A coreografia continua determinada pelo estado, não pelos metadados de cada frase.

## Etapa 22 — Opiniões cromáticas
180 opiniões, 15 por tema, persistidas em pingState. A escolha diária usa o humor como peso, sem repetir até esgotar o ciclo. Clique inclusive no tema ativo. Voz ainda não implementada.

## Etapa 23 — Pinglish
Voz procedural original com 15 perfis emocionais. O áudio depende de interação inicial permitida pelo navegador. Texto integral permanece disponível; sincronização progressiva na etapa 24 e controles na etapa 25.

## Etapa 24 — Sincronização audiovisual
Texto progressivo proporcional à duração da voz, com alternativa silenciosa. Expressões e gestos por emoção, retorno ao contexto atual ao terminar, cancelamento ao arrastar ou ocultar a página. Leitores de tela recebem a frase completa; redução de movimento apresenta texto integral.

## Configurações de Sistema (etapa 25)
Ping: visibilidade, voz, volume, animações, vibração, tamanho e frequência. Visual: temas e modo. Coletas: início automático, iniciar e pausar, mantendo o limite experimental de seis rodadas por abertura. Dados: consulta ao armazenamento. Preferências em IndexedDB (`preferences/system`), sem apagar dados anteriores. Backup em arquivo ainda não implementado. Vibração depende do navegador; áudio exige interação inicial.

### Refinamento Pinglish
Voz procedural revisada: assobios eletrônicos, bipes, glissandos e modulação de frequência, sem amostras externas. Mantém as 15 emoções e controles existentes.

### Nota informal do Ping
Toda fala inclui a nota de 0 a 10 da rodada recente do perfil ativo, ou informa que faltam dados. Cada resposta válida vale 10, 9, 8, 6 ou 4 conforme os limites de 100, 200, 350 e 700 ms; resposta ausente vale zero, e a soma é dividida por dois. Interrupção confirmada vale zero. Resultados inconclusivos e dados com mais de 90 segundos não recebem nota. Com coletas pausadas, a nota recente é identificada como última rodada. A nota não mede velocidade contratada nem identifica a causa de problemas.
