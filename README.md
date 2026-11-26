# Pingnet — Observatório Local da Internet

*Sua internet, sem mistérios.*

## Temas cromáticos — etapa 03 de 30

Esta entrega contém navegação funcional, identidade oficial, tema Café inicial, alternância clara/escura persistida localmente, estrutura modular e recursos originais. Não realiza medições nem gera registros fictícios. As áreas futuras estão explicitamente identificadas.

## Publicação

Extraia o ZIP. Envie os arquivos da raiz e a pasta `assets` para a raiz do repositório GitHub Pages. Não envie o ZIP como substituto dos arquivos. Guarde uma cópia da versão anterior. Se houver um Service Worker antigo, remova seu registro nas ferramentas de desenvolvedor do Chrome (Application > Service Workers > Unregister) e recarregue. Não limpe o armazenamento se precisar preservar dados antigos. A migração de dados antigos não está incluída.

## Recursos

Os logotipos fornecidos foram preservados; favicon e ícone adaptável foram derivados. Os WebP e sete JSON originais foram incluídos para integração posterior. Os JSON foram normalizados sintaticamente, mas suas falas ainda não foram revisadas semanticamente nem são executadas. Licenças dos recursos gráficos ainda devem ser confirmadas antes de distribuição definitiva.

## Próximas etapas

Interface responsiva (04), infraestrutura PWA e offline (05), banco IndexedDB (06), motor de monitoramento (07). As demais funcionalidades seguem o plano aprovado. Nesta etapa não há manifest nem Service Worker ativo: a instalação PWA será implementada na etapa 05.

## Sistema visual

`tokens.css` centraliza cores, espaçamentos, tipografia, dimensões de toque e estados semânticos. `styles.css` aplica os tokens aos componentes. A denominação institucional agora é Observatório Local da Internet. Os estados de foco, interação e movimento reduzido foram refinados. A homologação visual no Chrome e no celular permanece necessária.

## Temas cromáticos

Em Configurações de Sistema, selecione uma das 12 paletas por botão de opção. Cada tema possui modo claro e escuro. Café claro é o padrão inicial; a seleção e o modo persistem em localStorage. As cores de monitoramento não mudam. A integração ao IndexedDB e ao backup ocorrerá nas etapas correspondentes. O evento `pingnet:theme-selected` prepara a integração futura do Ping; as opiniões ainda não são executadas.
