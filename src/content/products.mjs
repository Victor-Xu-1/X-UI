import ja from './translations/products-ja.mjs';
import de from './translations/products-de.mjs';
import fr from './translations/products-fr.mjs';
import ko from './translations/products-ko.mjs';
import { languagePath } from './locales.mjs';

export const products = [
  {
    id: "x-science",
    name: "X-Science",
    category: "agents",
    repository: "https://github.com/Victor-Xu-1/X-Science",
    license: "AGPL-3.0-only",
    docs: "https://github.com/Victor-Xu-1/X-Science/blob/main/docs/getting-started.md",
    guide: "https://github.com/Victor-Xu-1/X-Science/blob/main/docs/product/README.md",
    revision: "4104d0723080b7406dba464de2de92af06060522",
    label: {"zh":"生物医药研究 Agent","en":"Biomedical research agent"},
    headline: {"zh":"从研究问题，\n到可以检查的工作产物。","en":"Turn a research question\ninto work you can inspect."},
    summary: {"zh":"在一个项目中组织文献、科学文件与工具辅助分析。跟踪工作过程，检查输出文件，为后续追问保留研究证据。","en":"Bring literature, scientific files and tool-assisted analysis into one project. Follow the work, inspect the output files and keep the evidence available for the next question."},
    tags: ["Agent","MCP","Python / R"],
    audience: {"zh":"生物医药研究者、计算科学家与研发团队","en":"Biomedical researchers, computational scientists and R&D teams"},
    environment: {"zh":"Ubuntu / WSL；配置模型与科学环境后使用","en":"Ubuntu / WSL; configure model providers and scientific environments"},
    features: [{"zh":"让论文、讨论与文件围绕同一个研究问题展开","en":"Keep papers, discussion and files tied to the research question"},{"zh":"在项目背景中查看支持的结构、序列与表格","en":"Inspect supported structures, sequences and tables in project context"},{"zh":"按任务选择专家、Skills、连接器与已配置科学环境","en":"Choose task-specific experts, Skills, connectors and configured scientific environments"},{"zh":"跟踪工具反馈，打开输出文件进行复核","en":"Follow tool feedback and open output files for review"}],
    steps: [{"zh":"明确研究问题","en":"Define the research question"},{"zh":"选择输入与工具","en":"Choose the inputs and tools"},{"zh":"检查实际输出文件","en":"Inspect the resulting files"}],
    boundary: {"zh":"可用工作流取决于实际模型、连接器、环境和权限配置。自托管的数据去向由配置决定，科学结论需要研究者复核。","en":"Available workflows depend on configured models, connectors, environments and permissions. Data destinations depend on deployment choices; researchers review scientific conclusions."},
  },
  {
    id: "x-pharma",
    name: "X-Pharma",
    category: "intelligence",
    repository: "https://github.com/Victor-Xu-1/X-Pharma",
    license: "Apache-2.0",
    docs: "https://github.com/Victor-Xu-1/X-Pharma#安装",
    guide: "https://github.com/Victor-Xu-1/X-Pharma/blob/main/docs/architecture.md",
    revision: "635e5b28d1ceda06eb8ddc29dd568077f5e36a1d",
    label: {"zh":"医药情报与证据","en":"Pharmaceutical intelligence"},
    headline: {"zh":"理解靶点，\n追溯证据。","en":"Understand the target.\nTrace the evidence."},
    summary: {"zh":"通过关联档案与有出处的记录，研究药物、靶点、临床试验、专利和交易。让研究人员与 Agent 获取医药信息，同时看见支撑信息的证据。","en":"Research drugs, targets, trials, patents and deals through connected profiles and sourced records. Give researchers and agents access to pharmaceutical information with the evidence kept in view."},
    tags: ["Evidence","MCP","Intelligence"],
    audience: {"zh":"药物研发、医药情报与数据团队","en":"Drug development, pharmaceutical intelligence and data teams"},
    environment: {"zh":"Linux x86-64 / WSL2；Docker 与数据服务","en":"Linux x86-64 / WSL2; Docker and data services"},
    features: [{"zh":"对比相关药物、靶点、临床试验、专利与交易记录","en":"Compare related drugs, targets, trials, patents and deal records"},{"zh":"查看事实背后的来源位置与数据版本","en":"Inspect source locations and data versions behind a fact"},{"zh":"通过获授权接入与审核积累研究数据资产","en":"Build research data assets through authorized ingestion and review"},{"zh":"在工作台或 MCP 中使用相同领域服务与权限","en":"Use the same domain services and permissions through the workbench or MCP"}],
    steps: [{"zh":"连接获授权来源","en":"Connect authorized sources"},{"zh":"整理事实与证据","en":"Organize the facts and evidence"},{"zh":"使用工作台或 MCP 开展研究","en":"Investigate with the workbench or MCP"}],
    boundary: {"zh":"当前为开发版本。真实数据许可、企业身份、LLM/OCR 与商业生产条件由各部署分别确认；Apache-2.0 不包含第三方数据授权。","en":"A development release. Data licenses, enterprise identity, LLM/OCR and production readiness are evaluated per deployment; Apache-2.0 does not grant third-party data access."},
  },
  {
    id: "x-dde",
    name: "X-DDE",
    category: "discovery",
    repository: "https://github.com/Victor-Xu-1/X-DDE",
    license: "Apache-2.0",
    docs: "https://github.com/Victor-Xu-1/X-DDE#快速开始",
    guide: "https://github.com/Victor-Xu-1/X-DDE#能完成哪些工作",
    revision: "be94cc2dfcbea1bd09e63a19a4820c7278792733",
    release: {"version":"v0.4.52","url":"https://github.com/Victor-Xu-1/X-DDE/releases/tag/v0.4.52"},
    label: {"zh":"可视化药物发现","en":"Visual drug discovery"},
    headline: {"zh":"看清分子，\n接着开展下一项研究。","en":"See the molecule.\nConnect the next task."},
    summary: {"zh":"准备靶点、结构与候选，开展小分子、生物药、筛选和 DEL 研究。结合联动表格与二维、三维结果比较候选，再把选定材料交给下一项任务。","en":"Prepare targets, structures and candidates for small-molecule, biologics, screening and DEL research. Compare candidates through linked tables and 2D / 3D results, then reuse selected material in the next task."},
    tags: ["2D / 3D","Drug discovery","DEL"],
    audience: {"zh":"药物化学、生物药与计算研发人员","en":"Medicinal chemists, biologics researchers and computational scientists"},
    environment: {"zh":"Windows / Linux / WSL；科学引擎独立安装","en":"Windows / Linux / WSL; scientific engines have separate installations"},
    features: [{"zh":"分步准备输入，明确选择研究方法","en":"Prepare inputs with guided steps and explicit method choices"},{"zh":"联动分子表格与二维、三维结果，查看具体候选","en":"Inspect a candidate through linked molecular tables and 2D / 3D results"},{"zh":"将选定结构、分子或序列用于下一项任务","en":"Carry selected structures, molecules or sequences into the next task"},{"zh":"从输出追溯原始文件、派生版本与任务输入","en":"Trace outputs back to original files, derived versions and task inputs"}],
    steps: [{"zh":"准备靶点与输入","en":"Prepare the target and inputs"},{"zh":"运行选定研究任务","en":"Run the selected research task"},{"zh":"比较候选，选择下一步","en":"Compare candidates and choose the next step"}],
    boundary: {"zh":"任务的执行能力取决于所选科学引擎、模型、输入与硬件。模型置信度、几何距离、对接分数和实验活性各有不同含义。","en":"Execution depends on the selected scientific engine, models, inputs and hardware. Model confidence, geometry, docking scores and measured activity have distinct meanings."},
    image: "x-dde-structure.jpg",
    imageKind: "screenshot",
    imageWidth: 1331,
    imageHeight: 1228,
    caption: {"zh":"X-DDE v0.4.49 实际界面：BRD4–JQ1 公开研究案例的结构与口袋。","en":"Actual X-DDE v0.4.49 interface: structures and pockets from the public BRD4–JQ1 research example."},
    imageSource: "https://github.com/Victor-Xu-1/X-DDE/blob/be94cc2dfcbea1bd09e63a19a4820c7278792733/docs/images/README.md",
  },
  {
    id: "x-synth",
    name: "X-Synth",
    category: "chemistry",
    repository: "https://github.com/Victor-Xu-1/X-Synth",
    license: "Apache-2.0",
    docs: "https://github.com/Victor-Xu-1/X-Synth#安装",
    guide: "https://github.com/Victor-Xu-1/X-Synth/blob/main/docs/workspace-workflows.md",
    revision: "28915552a4007a009878df2b5fed9936bb710cbe",
    label: {"zh":"逆合成与合成研究","en":"Retrosynthesis & synthesis research"},
    headline: {"zh":"对比路线，\n从结构规划合成研究。","en":"Compare routes.\nPlan from the structure."},
    summary: {"zh":"绘制目标分子，探索 ASKCOS 路线建议，结合起始原料证据审查反应步骤。把备选路线与研究记录放在一起，便于开展化学评估。","en":"Draw a target, explore ASKCOS route suggestions and review reactions alongside starting-material evidence. Keep route alternatives and research records together for chemical assessment."},
    tags: ["Retrosynthesis","ASKCOS","Chemistry"],
    audience: {"zh":"药物化学、合成化学与工艺研究人员","en":"Medicinal, synthetic and process chemistry researchers"},
    environment: {"zh":"Linux / WSL；配置 ASKCOS 模型与库存","en":"Linux / WSL; configured ASKCOS models and stock data"},
    features: [{"zh":"绘制或导入目标，比较不同路线搜索策略","en":"Draw or import a target and compare route-search strategies"},{"zh":"一起审查反应、起始原料与条件参考","en":"Review reactions, starting materials and condition references together"},{"zh":"将结构级采购证据与库存快照对照","en":"Check structure-specific procurement evidence against stock snapshots"},{"zh":"编辑路线副本，导出图示、物料与研究记录","en":"Edit route copies and export figures, materials and research records"}],
    steps: [{"zh":"确认目标结构","en":"Confirm the target structure"},{"zh":"搜索与比较路线","en":"Search and compare routes"},{"zh":"审查原料与反应步骤","en":"Review the materials and reaction steps"}],
    boundary: {"zh":"当前已集成的路线生成引擎为 ASKCOS。模型评分、目录采购证据和实验可行性分别判断；生成路线仍需化学与实验复核。","en":"ASKCOS is the currently integrated route-generation engine. Model scores, catalog procurement evidence and experimental feasibility are evaluated separately; routes require chemical and experimental review."},
  },
  {
    id: "x-patentsar",
    name: "X-PatentSAR",
    category: "chemistry",
    repository: "https://github.com/Victor-Xu-1/X-PatentSAR",
    license: "Apache-2.0",
    docs: "https://github.com/Victor-Xu-1/X-PatentSAR#web-工作台",
    guide: "https://github.com/Victor-Xu-1/X-PatentSAR#支持范围",
    revision: "78d9e02c7c08fe8ba4dd401100c6c9deb19fc566",
    label: {"zh":"专利化学与活性提取","en":"Patent chemistry & activity extraction"},
    headline: {"zh":"从专利页面，\n到结构化 SAR 数据。","en":"From patent pages\nto structured SAR data."},
    summary: {"zh":"从支持范围内的 WIPO 专利 PDF 中提取结构、编号与活性读数，整理成可复核的结构—活性表。核对原始页面，修正记录，再导出后续研究材料。","en":"Extract structures, identifiers and activity readings from supported WIPO patent PDFs into reviewable structure–activity tables. Check the original pages, correct records and export material for further research."},
    tags: ["Patent PDF","SAR","Evidence"],
    audience: {"zh":"药物化学、专利分析与 SAR 研究人员","en":"Medicinal chemists, patent analysts and SAR researchers"},
    environment: {"zh":"Linux / WSL2；DECIMER 与 RDKit","en":"Linux / WSL2; DECIMER and RDKit"},
    features: [{"zh":"将结构、编号与原始活性读数汇入同一张表","en":"Bring structures, identifiers and original activity readings into one table"},{"zh":"根据来源位置核对结构与活性的对应关系","en":"Check structure–activity assignments against their source locations"},{"zh":"修正结构与记录，同时保留证据与版本","en":"Correct structures and records while preserving evidence and versions"},{"zh":"导出 Excel、SDF、结构裁图与 QA 报告","en":"Export Excel, SDF, structure crops and QA reports"}],
    steps: [{"zh":"上传支持范围内的专利 PDF","en":"Upload a supported patent PDF"},{"zh":"对照原文核对提取结果","en":"Check the extraction against the source"},{"zh":"导出结构—活性产物","en":"Export the structure–activity outputs"}],
    boundary: {"zh": "面向 WIPO 专利 PDF。使用导出表格前，应核对质量提示，并回到原文确认不确定的结构、冲突的活性数据或不清晰的扫描内容。性质预测需作为独立研究结果进一步复核。", "en": "WIPO patent PDFs are supported. Before using an exported table, resolve quality flags and review uncertain structures, conflicting activity values or unclear source pages. Interpret property predictions separately as research estimates."},
  }
];

export const observedAt = '2026-10-08';
export { languagePath };
export const productPath = (product, lang) => `${languagePath(lang)}products/${product.id}/`;

const translatedFields = ['label', 'headline', 'summary', 'audience', 'environment', 'boundary'];
for (const [lang, entries] of Object.entries({ ja, de, fr, ko })) {
  for (const product of products) {
    const translation = entries[product.id];
    if (!translation) throw new Error(`${lang}: missing product ${product.id}`);
    for (const field of [...translatedFields, ...(product.caption ? ['caption'] : [])]) {
      if (typeof translation[field] !== 'string' || !translation[field].trim()) throw new Error(`${lang}: missing ${product.id}.${field}`);
      product[field][lang] = translation[field];
    }
    for (const field of ['features', 'steps']) {
      if (translation[field]?.length !== product[field].length) throw new Error(`${lang}: inconsistent ${product.id}.${field}`);
      product[field].forEach((item, index) => { item[lang] = translation[field][index]; });
    }
  }
}
