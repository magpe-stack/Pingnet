export const groups=[['Observatório',[['inicio','Início'],['linha-do-tempo','Linha do tempo'],['historico','Histórico'],['comparativos','Comparativos'],['horarios-criticos','Horários críticos'],['anotacoes','Anotações']]],['Sistema',[['configuracoes','Configurações de Sistema'],['minha-conexao','Minha conexão']]],['Ajuda',[['manual','Manual'],['sobre','Sobre']]]];
export const routes=new Map(groups.flatMap(g=>g[1]));
routes.set('imprimir','Imprimir');
export function current(){const key=location.hash.slice(1);return routes.has(key)?key:'inicio'}
