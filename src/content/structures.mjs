import provenance from './structure-provenance.json' with { type:'json' };
import { glueCopy } from './glue-copy.mjs';
const groups={
  '5FQD':[{name:'CRBN',chains:['B'],color:'#328a91'},{name:'CK1α',chains:['C'],color:'#c3874f'},{name:'DDB1 ΔBPB',chains:['A'],color:'#a6b6bf'}],
  '6Q0R':[{name:'DCAF15',chains:['B','C'],color:'#328a91'},{name:'RBM39 RRM2',chains:['D'],color:'#c3874f'},{name:'DDB1 ΔBPB',chains:['A'],color:'#a6b6bf'},{name:'DDA1',chains:['E'],color:'#8895bb'}],
  '1FAP':[{name:'FKBP12',chains:['A'],color:'#328a91'},{name:'mTOR FRB',chains:['B'],color:'#c3874f'}]
};
export const structureCatalog=provenance.structures.map(entry=>{
  if(!groups[entry.id]||entry.resolution_angstrom.length!==1)throw new Error('Unverified structural identity');
  return {id:entry.id,names:Object.fromEntries(Object.keys(glueCopy).map(lang=>[lang,entry.title])),
    organism:'Homo sapiens',file:'/assets/structures/'+entry.id+'.pdb',source:entry.record_url,
    atomCount:entry.parsed_atom_count,rawAtomCount:entry.raw_atom_count,bytes:entry.bytes,sha256:entry.sha256,
    resolution:entry.resolution_angstrom[0],groups:groups[entry.id],
    ligand:{...entry.ligand.selector,name:entry.ligand.name,atomCount:entry.ligand.parsed_heavy_atom_count},
    views:Object.fromEntries(Object.entries(entry.views).map(([key,view])=>[key,{chains:view.chains,selection:view.selection,atomCount:view.parsed_atom_count,elements:view.elements}])),
    quaternion:entry.id==='6Q0R'?[0.19113270199999996,0.42129710899999995,0.662207514,0.589455888]:entry.views.interface.camera.world_to_view_quaternion_xyzw,
    citation:entry.primary_citation,doi:'https://doi.org/'+entry.primary_citation.pdbx_database_id_DOI
  };
});
