import ja from './translations/products-ja.mjs';
import de from './translations/products-de.mjs';
import fr from './translations/products-fr.mjs';
import ko from './translations/products-ko.mjs';
import { languagePath } from './locales.mjs';
// Marketing facts are curated from the public repositories, never from private state.
const text = (zh, en) => ({ zh, en });
const repo = (name) => `https://github.com/Victor-Xu-1/${name}`;

export const products = [
  {
    id: 'synon-biomed', name: 'Synon Biomed', category: 'agents', color: '#a9d5bb',
    repository: repo('synon-biomed'), license: 'AGPL-3.0-only',
    docs: `${repo('synon-biomed')}/blob/main/docs/getting-started.md`,
    guide: `${repo('synon-biomed')}/blob/main/docs/product/README.md`,
    revision: 'b13d523be0cec4c4b811fc54397d46f2f562447d',
    label: text('生物医药研究 Agent', 'Biomedical research agent'),
    headline: text('让研究推进，\n让证据始终可见。', 'Research forward.\nEvidence in view.'),
    summary: text('将研究讨论、文献、科学工具和项目产物连接起来。围绕问题开展工作，带着证据继续研究。', 'Connect research conversations, literature, scientific tools and project artifacts. Keep the question and its evidence together.'),
    tags: ['Agent', 'MCP', 'Python / R'],
    audience: text('生物医药研究者、计算科学家与研发团队', 'Biomedical researchers, computational scientists and R&D teams'),
    environment: text('Ubuntu / WSL；配置模型与科学环境后使用', 'Ubuntu / WSL; configure model providers and scientific environments'),
    features: [
      text('围绕项目组织研究讨论、输入材料与输出文件', 'Keep research conversations, inputs and output files in project context'),
      text('查看支持的结构、序列、比对、Notebook 与表格', 'Inspect supported structures, sequences, alignments, notebooks and tables'),
      text('按任务选择专家、Skills、连接器与科学环境', 'Select experts, Skills, connectors and scientific environments for the task'),
      text('跟踪执行反馈，复核产物并继续下一步研究', 'Follow execution feedback, review artifacts and continue the investigation'),
    ],
    steps: [text('提出研究问题', 'Ask a research question'), text('选择材料与工具', 'Choose material and tools'), text('检查研究产物', 'Review the artifacts')],
    boundary: text('可用工作流取决于实际模型、连接器、环境和权限配置。自托管的数据去向由配置决定，科学结论需要研究者复核。', 'Available workflows depend on configured models, connectors, environments and permissions. Data destinations depend on deployment choices; researchers review scientific conclusions.'),
    image: 'synon-concept.png', imageKind: 'concept', imageWidth: 2020, imageHeight: 778,
    caption: text('来自公开仓库的产品概念插画；不是实际界面或科学结果。', 'Product concept illustration from the public repository; not an application screenshot or scientific result.'),
    imageSource: `${repo('synon-biomed')}/blob/b13d523be0cec4c4b811fc54397d46f2f562447d/docs/assets/README.md`,
  },
  {
    id: 'x-pharma', name: 'X-Pharma', category: 'intelligence', color: '#c6bef4',
    repository: repo('X-Pharma'), license: 'Apache-2.0',
    docs: `${repo('X-Pharma')}#安装`, guide: `${repo('X-Pharma')}/blob/main/docs/architecture.md`,
    revision: '635e5b28d1ceda06eb8ddc29dd568077f5e36a1d',
    label: text('医药情报与证据', 'Pharmaceutical intelligence'),
    headline: text('将医药信息，\n变成有出处的洞察。', 'Turn information\ninto sourced insight.'),
    summary: text('面向人员与 Agent 的医药情报平台。连接药物、靶点、临床、专利与交易信息，保留来源与治理过程。', 'A pharmaceutical intelligence platform for people and agents. Explore drugs, targets, trials, patents and deals with traceable evidence.'),
    tags: ['Evidence', 'MCP', 'Intelligence'],
    audience: text('药物研发、医药情报与数据团队', 'Drug development, pharmaceutical intelligence and data teams'),
    environment: text('Linux x86-64 / WSL2；Docker 与数据服务', 'Linux x86-64 / WSL2; Docker and data services'),
    features: [
      text('多领域检索、实体档案、结构查询和研究对比', 'Multi-domain research, entity profiles, structure search and comparisons'),
      text('保存来源定位、数据版本、审计与组织权限', 'Preserve source locations, data versions, audits and organization permissions'),
      text('通过受控接入与审核构建研究数据资产', 'Build research data assets through governed ingestion and review'),
      text('通过标准 MCP 让 Agent 使用同一领域服务', 'Give agents access to the same domain services through standard MCP'),
    ],
    steps: [text('连接获授权来源', 'Connect authorized sources'), text('整理事实与证据', 'Govern facts and evidence'), text('人员与 Agent 查询', 'Research with people and agents')],
    boundary: text('当前为开发版本。真实数据许可、企业身份、LLM/OCR 与商业生产条件由各部署分别确认；Apache-2.0 不包含第三方数据授权。', 'A development release. Data licenses, enterprise identity, LLM/OCR and production readiness are evaluated per deployment; Apache-2.0 does not grant third-party data access.'),
  },
  {
    id: 'x-dde', name: 'X-DDE', category: 'discovery', color: '#d5eca0',
    repository: repo('X-DDE'), license: 'Apache-2.0',
    docs: `${repo('X-DDE')}#快速开始`, guide: `${repo('X-DDE')}#能完成哪些工作`,
    revision: 'be94cc2dfcbea1bd09e63a19a4820c7278792733',
    release: { version: 'v0.4.52', url: `${repo('X-DDE')}/releases/tag/v0.4.52` },
    label: text('可视化药物发现', 'Connected drug discovery'),
    headline: text('从研究材料，\n到下一步发现。', 'From research material\nto the next discovery.'),
    summary: text('连接靶点、结构、口袋与候选。用分步任务和 2D / 3D 工作空间，开展小分子、生物药、筛选与 DEL 研究。', 'Connect targets, structures, pockets and candidates. Explore small molecules, biologics, screening and DEL with guided tasks and 2D / 3D workspaces.'),
    tags: ['2D / 3D', 'Drug discovery', 'DEL'],
    audience: text('药物化学、生物药与计算研发人员', 'Medicinal chemists, biologics researchers and computational scientists'),
    environment: text('Windows / Linux / WSL；科学引擎独立安装', 'Windows / Linux / WSL; scientific engines have separate installations'),
    features: [
      text('按研究问题准备任务，选择模型并检查输出', 'Prepare tasks by research question, choose models and inspect outputs'),
      text('结构、分子表格、序列与 2D / 3D 结果联动', 'Connect structures, molecular tables, sequences and 2D / 3D results'),
      text('开展小分子、生物药、高通量筛选与 DEL 研究', 'Work across small molecules, biologics, high-throughput screening and DEL'),
      text('保留原始材料、派生版本和任务来源关系', 'Preserve original material, derived versions and task provenance'),
    ],
    steps: [text('准备靶点与结构', 'Prepare targets and structures'), text('运行研究任务', 'Run a research task'), text('比较候选与结果', 'Compare candidates and results')],
    boundary: text('任务的执行能力取决于所选科学引擎、模型、输入与硬件。模型置信度、几何距离、对接分数和实验活性各有不同含义。', 'Execution depends on the selected scientific engine, models, inputs and hardware. Model confidence, geometry, docking scores and measured activity have distinct meanings.'),
    image: 'x-dde-structure.jpg', imageKind: 'screenshot', imageWidth: 1331, imageHeight: 1228,
    caption: text('X-DDE v0.4.49 实际界面：BRD4–JQ1 公开研究案例的结构与口袋。', 'Actual X-DDE v0.4.49 interface: structures and pockets from the public BRD4–JQ1 research example.'),
    imageSource: `${repo('X-DDE')}/blob/be94cc2dfcbea1bd09e63a19a4820c7278792733/docs/images/README.md`,
  },
  {
    id: 'x-synth', name: 'X-Synth', category: 'chemistry', color: '#edc69c',
    repository: repo('X-Synth'), license: 'Apache-2.0',
    docs: `${repo('X-Synth')}#安装`, guide: `${repo('X-Synth')}/blob/main/docs/workspace-workflows.md`,
    revision: '28915552a4007a009878df2b5fed9936bb710cbe',
    label: text('逆合成与合成研究', 'Retrosynthesis & synthesis'),
    headline: text('从目标分子，\n走向可审查的路线。', 'From target molecule\nto a reviewable route.'),
    summary: text('结构优先的合成研究工作台。围绕目标分子、起始原料、反应步骤与采购证据，设计并审查合成路线。', 'A structure-first synthesis workbench. Explore target molecules, starting materials, reaction steps and procurement evidence in one research workflow.'),
    tags: ['Retrosynthesis', 'ASKCOS', 'Chemistry'],
    audience: text('药物化学、合成化学与工艺研究人员', 'Medicinal, synthetic and process chemistry researchers'),
    environment: text('Linux / WSL；配置 ASKCOS 模型与库存', 'Linux / WSL; configured ASKCOS models and stock data'),
    features: [
      text('绘制或导入目标结构，开展多策略路线搜索', 'Draw or import a target structure and explore multiple search strategies'),
      text('检查起始原料、反应步骤、条件参考与路线', 'Inspect starting materials, reaction steps, condition references and routes'),
      text('用库存快照核对结构级采购证据', 'Check structure-specific procurement evidence against stock snapshots'),
      text('编辑路线副本，导出路线图、物料与研究记录', 'Edit route copies and export route figures, materials and research records'),
    ],
    steps: [text('确认目标结构', 'Confirm the target structure'), text('搜索与审查路线', 'Search and review routes'), text('核对原料与步骤', 'Inspect materials and steps')],
    boundary: text('当前已集成的路线生成引擎为 ASKCOS。模型评分、目录采购证据和实验可行性分别判断；生成路线仍需化学与实验复核。', 'ASKCOS is the currently integrated route-generation engine. Model scores, catalog procurement evidence and experimental feasibility are evaluated separately; routes require chemical and experimental review.'),
  },
  {
    id: 'x-patentsar', name: 'X-PatentSAR', category: 'chemistry', color: '#f1b5a0',
    repository: repo('X-PatentSAR'), license: 'Apache-2.0',
    docs: `${repo('X-PatentSAR')}#web-工作台`, guide: `${repo('X-PatentSAR')}#支持范围`,
    revision: '78d9e02c7c08fe8ba4dd401100c6c9deb19fc566',
    label: text('专利结构与活性提取', 'Patent structure & activity'),
    headline: text('让专利里的化学，\n成为可用的研究材料。', 'Bring patent chemistry\ninto your research.'),
    summary: text('从专利 PDF 提取化学结构与活性，整理结构—活性表。保留原文证据，支持人工修正与后续性质研究。', 'Extract chemical structures and activities from patent PDFs into structure–activity tables, with source evidence, manual correction and follow-on property research.'),
    tags: ['Patent PDF', 'SAR', 'Evidence'],
    audience: text('药物化学、专利分析与 SAR 研究人员', 'Medicinal chemists, patent analysts and SAR researchers'),
    environment: text('Linux / WSL2；DECIMER 与 RDKit', 'Linux / WSL2; DECIMER and RDKit'),
    features: [
      text('提取结构、编号、活性读数与原始单位', 'Extract structures, identifiers, activity readings and original units'),
      text('关联原文位置，复核结构与活性的对应关系', 'Link source locations and review structure-to-activity assignments'),
      text('在线修正结构与记录，保留版本和证据', 'Correct structures and records with preserved versions and evidence'),
      text('导出 Excel、SDF、结构裁图与 QA 报告', 'Export Excel, SDF, structure crops and QA reports'),
    ],
    steps: [text('上传专利 PDF', 'Upload a patent PDF'), text('提取与核对证据', 'Extract and review evidence'), text('整理结构—活性表', 'Build structure–activity tables')],
    boundary: text('当前生产适配器面向 WIPO 专利 PDF。正式完成要求核心 QA 通过；不确定、冲突或低质量原文需人工复核。性质预测是后续研究指标。', 'The production adapter targets WIPO patent PDFs. Formal completion requires core QA; uncertain, conflicting or low-quality source material needs review. Predicted properties are follow-on research metrics.'),
  },
  {
    id: 'diffsbdd-workbench', name: 'DiffSBDD Workbench', category: 'discovery', color: '#b8cfe5',
    repository: repo('diffsbdd-workbench'), license: 'MIT',
    docs: `${repo('diffsbdd-workbench')}#安装`, guide: `${repo('diffsbdd-workbench')}#能做什么`,
    revision: '55f365b195d126ec25f7e7ae00ff253fd4491dac',
    label: text('本地分子设计', 'Local molecular design'),
    headline: text('在结合口袋中，\n探索新的分子。', 'Explore new molecules\ninside the pocket.'),
    summary: text('基于官方 DiffSBDD 模型的本地工作台。生成口袋条件分子，编辑结构、检查三维姿势，并继续下一轮设计。', 'A local workbench for official DiffSBDD models. Generate pocket-conditioned molecules, edit structures, inspect 3D poses and continue the next design round.'),
    tags: ['Local GPU', 'DiffSBDD', 'Molecular design'],
    audience: text('药物化学与结构导向分子设计人员', 'Medicinal chemists and structure-based molecular designers'),
    environment: text('Linux / WSL2；兼容的 NVIDIA CUDA GPU', 'Linux / WSL2; a compatible NVIDIA CUDA GPU'),
    features: [
      text('口袋条件生成、片段生长与分子多样化', 'Pocket-conditioned generation, fragment growth and diversification'),
      text('在二维画布编辑结构，在三维空间检查姿势', 'Edit structures in 2D and inspect their poses in 3D'),
      text('进行 QED / SA 优化与相互作用分析', 'Explore QED / SA optimization and interaction analysis'),
      text('保存本地设计、导出 SDF 与高清科学图', 'Save local designs and export SDF and high-resolution scientific figures'),
    ],
    steps: [text('准备蛋白与口袋', 'Prepare the protein and pocket'), text('生成与编辑分子', 'Generate and edit molecules'), text('检查并保存设计', 'Inspect and save designs')],
    boundary: text('独立社区工作台，与 DiffSBDD 原作者无隶属关系。官方模型与第三方组件保留各自许可；QED / SA 改善不代表结合活性提高。', 'An independent community workbench with no affiliation to the original DiffSBDD authors. Official models and components retain their licenses; improved QED / SA does not establish improved binding activity.'),
    image: 'diffsbdd-workbench.png', imageKind: 'screenshot', imageWidth: 1536, imageHeight: 1226,
    caption: text('公开仓库中的实际工作台截图，使用公开 DiffSBDD 示例。', 'Actual workbench screenshot from the public repository, using the public DiffSBDD example.'),
    imageSource: `${repo('diffsbdd-workbench')}/blob/55f365b195d126ec25f7e7ae00ff253fd4491dac/README.md`,
  },
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
