import ja from './translations/cinematic-ja.mjs';
import de from './translations/cinematic-de.mjs';
import fr from './translations/cinematic-fr.mjs';
import ko from './translations/cinematic-ko.mjs';

// Shared concept controls and factual workflow explanations.
export const cinematicCopy = {
  "en": {
    "pause": "Pause animations",
    "resume": "Resume animations",
    "reduced": "Reduced motion enabled",
    "concept": "Interactive concept · not molecular coordinates",
    "loading": "Preparing the 3D concept…",
    "ready": "3D concept ready",
    "unavailable": "Interactive 3D is unavailable. The concept image remains available.",
    "retry": "Reload 3D",
    "image": "Show image",
    "explore": "Explore in 3D",
    "reset": "Reset view",
    "hint": "Drag to rotate · arrow keys when focused",
    "choose": "Explore a research perspective",
    "stages": "Explore the workflow",
    "stageNote": "An explanation of the workflow. Follow the documentation to run the software.",
    "material": "Starting point",
    "review": "What to inspect",
    "next": "Open the workflow guide",
    "feature": "Explore a capability",
    "perspectives": [
      "Connected research",
      "Evidence networks",
      "Structure space",
      "Synthesis branches",
      "Source mapping"
    ],
    "products": {
      "x-science": {
        "materials": [
          "Research question and project context",
          "Relevant material and configured tools",
          "Files and execution feedback"
        ],
        "reviews": [
          "Define the question and retain its context.",
          "Choose the experts, Skills and environments appropriate to the task.",
          "Inspect the artifacts and their evidence before the next investigation."
        ]
      },
      "x-pharma": {
        "materials": [
          "Authorized pharmaceutical sources",
          "Entities, source locations and data versions",
          "People and agents using the domain services"
        ],
        "reviews": [
          "Confirm source permissions and ingestion scope.",
          "Review records, provenance and governance decisions.",
          "Compare sourced information and inspect the evidence behind it."
        ]
      },
      "x-dde": {
        "materials": [
          "Targets, structures and research inputs",
          "Selected scientific engines and models",
          "Candidates and linked 2D / 3D outputs"
        ],
        "reviews": [
          "Inspect the input material and its provenance.",
          "Check method requirements and execution feedback.",
          "Distinguish model confidence, geometry, scores and measured activity."
        ]
      },
      "x-synth": {
        "materials": [
          "Target molecular structure",
          "ASKCOS search strategies and route candidates",
          "Starting materials, stock snapshots and steps"
        ],
        "reviews": [
          "Confirm the structure before route exploration.",
          "Inspect reactions, references and alternative routes.",
          "Review procurement evidence and chemical feasibility separately."
        ]
      },
      "x-patentsar": {
        "materials": [
          "WIPO patent PDF",
          "Extracted structures, identifiers and activity readings",
          "Reviewed structure–activity records"
        ],
        "reviews": [
          "Retain the source document and original context.",
          "Review source positions, assignments and original units.",
          "Resolve QA findings and manual corrections before export."
        ]
      }
    },
    "paused": "Animations paused"
  },
  "zh": {
    "pause": "暂停动画",
    "resume": "恢复动画",
    "reduced": "已启用减少动态效果",
    "concept": "交互概念场景 · 非分子坐标",
    "loading": "正在准备三维概念场景…",
    "ready": "三维概念场景已就绪",
    "unavailable": "当前无法显示交互式三维。你仍可查看概念图片。",
    "retry": "重新加载三维",
    "image": "查看图片",
    "explore": "探索三维",
    "reset": "重置视图",
    "hint": "拖动旋转 · 聚焦后可用方向键",
    "choose": "探索不同研究视角",
    "stages": "探索工作流程",
    "stageNote": "这里展示工作流程说明；运行软件请参考使用文档。",
    "material": "研究起点",
    "review": "需要核对的内容",
    "next": "打开工作流程指南",
    "feature": "探索产品能力",
    "perspectives": [
      "连接研究",
      "证据网络",
      "结构空间",
      "合成分支",
      "来源映射"
    ],
    "products": {
      "x-science": {
        "materials": [
          "研究问题与项目背景",
          "相关材料与已配置工具",
          "输出文件与执行反馈"
        ],
        "reviews": [
          "明确研究问题并保留具体背景。",
          "根据任务选择专家、Skills 与科学环境。",
          "下一步研究前，检查产物与背后的证据。"
        ]
      },
      "x-pharma": {
        "materials": [
          "获授权的医药数据来源",
          "实体、来源位置与数据版本",
          "使用领域服务的人员与 Agent"
        ],
        "reviews": [
          "确认来源权限与数据接入范围。",
          "核对记录、来源链与治理决策。",
          "比较有出处的信息，检查支撑它的证据。"
        ]
      },
      "x-dde": {
        "materials": [
          "靶点、结构与研究输入",
          "所选科学引擎与模型",
          "候选与关联的 2D / 3D 输出"
        ],
        "reviews": [
          "检查输入材料及其来源。",
          "核对方法要求与执行反馈。",
          "区分模型置信度、几何、评分与实测活性。"
        ]
      },
      "x-synth": {
        "materials": [
          "目标分子结构",
          "ASKCOS 搜索策略与候选路线",
          "起始原料、库存快照与反应步骤"
        ],
        "reviews": [
          "探索路线前，确认目标结构。",
          "检查反应、参考资料与备选路线。",
          "分别核对采购证据与化学可行性。"
        ]
      },
      "x-patentsar": {
        "materials": [
          "WIPO 专利 PDF",
          "提取的结构、编号与活性读数",
          "经过复核的结构—活性记录"
        ],
        "reviews": [
          "保留原始文档及其具体背景。",
          "核对原文位置、对应关系与原始单位。",
          "导出前处理 QA 问题与人工修正。"
        ]
      }
    },
    "paused": "动画已暂停"
  },
  ja, de, fr, ko
};
