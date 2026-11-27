export const groups=[['Observatório',[['inicio','Início'],['linha-do-tempo','Linha do tempo'],['historico','Histórico'],['calendario','Calendário'],['comparativos','Comparativos'],['recordes','Livro dos recordes'],['horarios-criticos','Horários críticos'],['cobertura','Cobertura e servidores'],['anotacoes','Anotações'],['protocolos','Diário de protocolos'],['dossie','Dossiê da conexão'],['comparar-perfis','Comparação entre perfis'],['detective','Ping Detective'],['news','Ping News'],['retrospectiva','Retrospectiva anual'],['comedy-club','Ping Comedy Club']]],['Configurações',[['configuracoes','Configurações'],['minha-conexao','Minha conexão'],['manutencao','Central de manutenção']]],['Ajuda',[['manual','Manual'],['sobre','Sobre']]]];
export const routes=new Map(groups.flatMap(g=>g[1]));
routes.set('imprimir','Imprimir');
routes.set('csv','Exportar CSV');
export function current(){const key=location.hash.slice(1);return routes.has(key)?key:'inicio'}
