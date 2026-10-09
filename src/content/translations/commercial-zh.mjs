export default {
  useCasesLabel: '实际研究场景',
  useCasesTitle: '从你要解决的问题开始。',
  problemLabel: '你的研究起点',
  benefitLabel: '能带来什么',
  nextStepLabel: '先做哪一步',
  viewGuide: '阅读工作流程指南',
  selectUseCase: '选择研究场景',
  imageLabel: 'AI 生成生物医药概念插画',
  imageSourceLabel: '图片说明',
  sourceLabel: '阅读来源文档',
  motionPause: '暂停动态效果',
  motionResume: '恢复动态效果',
  products: {
    'x-science': [
      { problem: '一个靶点问题的材料散落在论文、笔记和讨论中。', benefit: '在项目中把研究问题、来源线索和后续工作放在一起。', nextStep: '围绕一个靶点或一篇论文创建项目，加入相关材料。' },
      { problem: '选择分析方法前，需要先看清手中的科学文件。', benefit: '结合研究讨论，查看支持的结构、序列和表格。', nextStep: '打开支持的输入文件，再选择适合当前问题的工具。' },
      { problem: '研究回答需要可以查看的文件和执行依据。', benefit: '跟踪工具反馈，回看实际产物，再继续下一步研究。', nextStep: '配置所需环境，从一个明确的小任务开始。' }
    ],
    'x-pharma': [
      { problem: '靶点、药物和临床试验信息分散在不同来源中。', benefit: '在工作台中研究相关实体，对比医药信息。', nextStep: '选定一个靶点或药物，连接你有权使用的数据来源。' },
      { problem: '一条有价值的信息很难追溯到原始记录。', benefit: '让来源位置和数据版本与经过治理的事实保持关联。', nextStep: '打开实体档案，查看记录背后的证据。' },
      { problem: '人员与 Agent 需要一致的医药数据访问口径。', benefit: '工作台与 MCP 使用相同的领域服务和权限规则。', nextStep: '配置获授权的数据，再将 MCP 客户端连接到这些服务。' }
    ],
    'x-dde': [
      { problem: '候选表格里的一个分数，无法展示完整的分子背景。', benefit: '让候选与二维结构、三维结果联动，直接查看具体分子。', nextStep: '从靶点结构开始，在工作空间中查看一个候选。' },
      { problem: '研究任务一开始就面对大量陌生参数。', benefit: '分步准备输入，选择方法，再检查实际输出。', nextStep: '选择任务，确认所需科学引擎与输入材料。' },
      { problem: '任务交接时，结果与原始材料的关系容易丢失。', benefit: '保留原始文件、派生版本和任务来源的关联。', nextStep: '选择相关输出版本，作为下一项研究任务的材料。' }
    ],
    'x-synth': [
      { problem: '一个目标分子需要可供审查的合成路线选项。', benefit: '从目标结构出发，探索 ASKCOS 的逆合成建议。', nextStep: '绘制或导入目标结构，选择路线搜索策略。' },
      { problem: '候选路线依赖的起始原料，采购来源尚不明确。', benefit: '将结构与库存快照对照，查看采购证据。', nextStep: '用已配置的库存目录核对路线中的起始原料。' },
      { problem: '备选路线需要放在一起讨论并形成研究记录。', benefit: '编辑路线副本，导出路线图、物料和研究记录。', nextStep: '审查路线副本的反应步骤，导出后开展化学评估。' }
    ],
    'x-patentsar': [
      { problem: '专利 PDF 中的结构与活性表分散在不同位置。', benefit: '将提取的结构、编号和读数整理成结构—活性表。', nextStep: '上传支持范围内的 WIPO 专利 PDF，查看提取结果。' },
      { problem: '一个对应关系或读数，需要回到原文核对。', benefit: '追溯来源位置，修正记录，同时保留证据与版本。', nextStep: '对照原文检查不确定的记录，并明确保存修正。' },
      { problem: '专利中的化学信息需要成为可复用的 SAR 研究材料。', benefit: '使用 Excel 与 SDF 提取产物，结合结构裁图与 QA 报告开展研究。', nextStep: '使用导出记录前，检查 QA 问题与原文证据。' }
    ]
  }
};
