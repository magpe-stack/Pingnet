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

Abra por HTTPS no Chrome. Aguarde a preparação dos recursos offline. Em Exibição, use Instalar Pingnet quando oferecido pelo navegador; também é possível usar o menu do Chrome. Desconecte a internet e recarregue para testar. A primeira preparação exige conexão. Em Exibição, Verificar atualização consulta o Service Worker; Aplicar atualização aparece quando uma versão está aguardando. O cache é versionado e não intercepta destinos externos. O armazenamento local não é apagado. O título e subtítulo não são links; somente o logotipo leva ao Início. O monitoramento ainda não está disponível.

## Armazenamento local e isolamento

Etapa 06: IndexedDB `pingnet-observatorio-local-Pingnet`, versão 1. Coleções: preferences, profiles, sessions, measurements, events, notes, pingState e fileHandles. Índices por perfil e data para consultas futuras. Apenas o perfil padrão e as preferências de aparência são gravados nesta etapa; nenhuma medição é simulada. Em Configurações de Sistema, Verificar armazenamento consulta contagens reais. O manifest fixa a identidade e o escopo em `/Pingnet/`, portanto publique nesse diretório exato. O cache tem prefixo próprio e a atualização remove somente caches conhecidos do Pingnet. Não limpe os dados da origem compartilhada com outros aplicativos. O backup externo será implementado na etapa 26.

## Etapa 07 — Coletas experimentais
Inicie ou pause na página Início. Três destinos HTTP em paralelo, intervalo nominal de 10 segundos, limite de 5 segundos, sem cookies, cache ou redirecionamentos. Resultados CORS não verificáveis não são considerados quedas. Google, Cloudflare e Wikimedia são candidatos provisórios: o ambiente de desenvolvimento não conseguiu resolver os domínios, portanto a compatibilidade CORS, disponibilidade e adequação de uso recorrente ainda precisam ser validadas. Não deixe as coletas experimentais rodando continuamente até essa validação. A classificação e sessões serão implementadas nas próximas etapas.
