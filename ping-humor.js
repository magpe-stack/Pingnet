// Piadas vinculadas a imagens originais e observações recentes.
const joke=(code,text,emotion)=>({text,emotion,image:`assets/emoji_u1f${code}_3d.webp`});
export function humorOptions(state,score,streak){
 if(state==='down'&&score===0)return [joke('4a9','A internet está um verdadeiro cocô agora.','irritação'),joke('480','Morri. Podem enterrar meus circuitos.','tristeza'),joke('921','Três rodadas sem resposta. Que papel de palhaço!','impaciência')];
 if(state==='slow'&&score!==null&&score<=4)return [joke('4a9','A internet está um verdadeiro cocô agora.','irritação'),joke('92e','Esses engasgos estão me dando enjoo!','irritação'),joke('92c','Até meus circuitos perderam a paciência!','irritação')];
 if(state==='suspect')return [joke('921','Parece que a internet está me fazendo de palhaço!','confusão'),joke('47b','Será que estou tentando conversar com fantasmas?','confusão')];
 if(state==='slow'&&streak>=2)return [joke('92e','Esses engasgos estão me dando enjoo!','impaciência'),joke('92c','Até meus circuitos perderam a paciência!','irritação')];
 if(state==='stable'&&score>=9)return [joke('911','Essa conexão vale ouro!','orgulho')];
 if(state==='recovered')return [joke('973','VOLTOU uma resposta válida! Soltem os confetes!','celebração')];
 if(state==='checking')return [joke('47b','Será que estou tentando conversar com fantasmas?','confusão')];
 return [];
}
export function chooseHumor(state,score,streak,previous,random=Math.random){const options=humorOptions(state,score,streak).filter(x=>x.text!==previous);return options[Math.floor(random()*options.length)]||null;}
