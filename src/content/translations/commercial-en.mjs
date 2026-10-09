export default {
  useCasesLabel: 'Research in practice',
  useCasesTitle: 'Start with the problem you need to solve.',
  problemLabel: 'Your starting point',
  benefitLabel: 'What you gain',
  nextStepLabel: 'A practical first step',
  viewGuide: 'Read the workflow guide',
  selectUseCase: 'Choose a research use case',
  imageLabel: 'AI-generated biomedical illustration',
  imageSourceLabel: 'Image context',
  sourceLabel: 'Read the source documentation',
  motionPause: 'Pause motion',
  motionResume: 'Resume motion',
  products: {
    'x-science': [
      { problem: 'Material for a research question is spread across papers, notes and discussions.', benefit: 'Keep the question, source references and follow-up work together in a project.', nextStep: 'Create a project around a research question or publication and add the relevant material.' },
      { problem: 'A scientific file needs to be understood before choosing an analysis.', benefit: 'Inspect supported structures, sequences and tables alongside the research conversation.', nextStep: 'Open a supported input file, then select tools appropriate to the question.' },
      { problem: 'An answer needs files and execution evidence that you can inspect.', benefit: 'Follow tool feedback and revisit the resulting artifacts before continuing the investigation.', nextStep: 'Configure the required environment and run a small, well-defined task.' }
    ],
    'x-pharma': [
      { problem: 'Drug, research and patent information is scattered across sources.', benefit: 'Research related entities and compare pharmaceutical information from the workbench.', nextStep: 'Choose a drug or patent series and connect the sources you are authorized to use.' },
      { problem: 'A useful claim is difficult to trace back to its original record.', benefit: 'Keep source locations and data versions attached to governed facts.', nextStep: 'Open an entity profile and inspect the evidence behind the records.' },
      { problem: 'People and agents need consistent access to pharmaceutical data.', benefit: 'Use the same domain services and permission rules through the workbench or MCP.', nextStep: 'Configure the authorized data and connect an MCP client to those services.' }
    ],
    'x-dde': [
      { problem: 'A candidate table does not show the molecular context behind a score.', benefit: 'Connect candidates with their 2D structures and 3D results for direct inspection.', nextStep: 'Start with a molecular structure file and inspect a candidate in the workspace.' },
      { problem: 'A research task starts with too many unfamiliar settings.', benefit: 'Prepare inputs step by step, choose a method and inspect its actual outputs.', nextStep: 'Select a task and confirm the required scientific engine and input material.' },
      { problem: 'Results and original material get lost as a project moves between tasks.', benefit: 'Keep original files, derived versions and task provenance connected.', nextStep: 'Select the relevant output version as material for the next research task.' }
    ],
    'x-synth': [
      { problem: 'A molecule needs plausible synthesis routes for review.', benefit: 'Explore ASKCOS retrosynthesis suggestions from the molecular structure.', nextStep: 'Draw or import a molecular structure and choose a route-search strategy.' },
      { problem: 'A proposed route depends on starting materials with uncertain sourcing.', benefit: 'Compare structures against stock snapshots and inspect procurement evidence.', nextStep: 'Check the starting materials of a route against a configured stock catalog.' },
      { problem: 'Route alternatives need to be discussed and documented together.', benefit: 'Edit route copies and export route figures, materials and research records.', nextStep: 'Review the steps of a route copy and export it for chemical assessment.' }
    ],
    'x-patentsar': [
      { problem: 'Structures and activity tables are separated across a patent PDF.', benefit: 'Bring extracted structures, identifiers and readings into a structure–activity table.', nextStep: 'Upload a supported WIPO patent PDF and inspect the extraction.' },
      { problem: 'An assignment or reading needs to be checked against the original page.', benefit: 'Follow source locations and correct records while keeping evidence and versions.', nextStep: 'Compare an uncertain record with its source and make an explicit correction.' },
      { problem: 'Patent chemistry needs to become reusable material for SAR research.', benefit: 'Use Excel and SDF extraction outputs with structure crops and a QA report as research material.', nextStep: 'Review QA findings and source evidence before using the exported records.' }
    ]
  }
};
