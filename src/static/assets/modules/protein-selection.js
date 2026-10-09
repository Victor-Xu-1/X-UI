// Display selections never rewrite or transform the deposited coordinates.
export function ligandSelection(metadata){const {resn,chain,resi,hetflag}=metadata.ligand;return {resn,chain,resi,hetflag};}
export function chainColorScheme(metadata){return {prop:'chain',map:Object.fromEntries(metadata.groups.flatMap(group=>group.chains.map(chain=>[chain,group.color])))};}
