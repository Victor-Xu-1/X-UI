import ja from './translations/redesign-ja.mjs';
import de from './translations/redesign-de.mjs';
import fr from './translations/redesign-fr.mjs';
import ko from './translations/redesign-ko.mjs';

// Product facts remain in products.mjs; locale keys must match.
export const redesignCopy = {
  en: {
    "heroLines": [
      "Explore deeply.",
      "Think further."
    ],
    "heroText": "Open-source software and research agents for biomedical science. Explore evidence, inspect molecules and work through the next question.",
    "heroEyebrow": "Scientific software & agents",
    "heroCta": "Explore the collection",
    "secondaryCta": "Meet X-Science",
    "collectionEyebrow": "The collection",
    "collectionTitle": "Five tools. Many starting points.",
    "collectionText": "Research agents, pharmaceutical intelligence, drug discovery, synthesis and patent analysis. Find the tool that fits your question.",
    "structureEyebrow": "Molecular perspective",
    "structureTitle": "Biology, in three dimensions.",
    "structureText": "Turn a structure in your hands. Change its representation. Look at the same molecule from another angle.",
    "structureScope": "Public reference coordinates from RCSB PDB. Crystallographic waters are omitted; deposited heme cofactors are shown. These are reference examples, not outputs computed by the products.",
    "structureControls": "Structure controls",
    "proteinLabel": "Protein",
    "representationLabel": "Representation",
    "cartoon": "Cartoon",
    "surface": "Surface",
    "atoms": "Atoms",
    "spin": "Auto-rotate",
    "pause": "Pause rotation",
    "lightBackground": "Light background",
    "exportImage": "Download PNG",
    "exportReady": "Image downloaded with its PDB source identity.",
    "exportError": "The image could not be exported. Please try again.",
    "resetView": "Reset view",
    "zoomIn": "Zoom in",
    "zoomOut": "Zoom out",
    "structureHint": "Drag to rotate. Scroll or pinch to zoom.",
    "structureKeyboardHint": "Focus the structure and use arrow keys to rotate, + or − to zoom. Tab moves between controls.",
    "structureLoading": "Loading structure…",
    "structureReady": "Structure ready",
    "structureError": "The structure could not load. Try again or open its PDB record.",
    "structureUnsupported": "Interactive 3D is unavailable in this browser. You can explore the published structure in its PDB record.",
    "retry": "Try again",
    "pdbSource": "View PDB record",
    "modelAttribution": "Published coordinates · RCSB PDB",
    "methodologyEyebrow": "A research approach",
    "methodologyTitle": "Keep the question connected.",
    "methodologyText": "Each product has its own methods and environment. Begin with sources, examine the molecular context and keep the outputs open to review.",
    "methodologySteps": [
      {
        "title": "Start from the evidence",
        "text": "Read the original sources and retain the context behind each claim."
      },
      {
        "title": "Explore the molecular context",
        "text": "Inspect structures, activity and synthesis with tools appropriate to the question."
      },
      {
        "title": "Review the next step",
        "text": "Check outputs, provenance and method limits before continuing the investigation."
      }
    ],
    "proofEyebrow": "Inside the products",
    "proofTitle": "See the work behind the tools.",
    "proofText": "Genuine product captures, public repositories and practical documentation. See each tool in context, then inspect its source.",
    "creatorEyebrow": "The researcher behind the software",
    "creatorTitle": "Built close to the science.",
    "creatorText": "Victor Xu is a drug discovery researcher and independent AI tool developer. His work spans medicinal chemistry, AIDD / CADD, PROTACs and molecular glues.",
    "contactEyebrow": "Start a conversation",
    "contactTitle": "What are you investigating?",
    "contactText": "Explore the software, read the source or get in touch about your research.",
    "sourceLink": "Explore the source",
    "productCapabilitiesLabel": "Capabilities"
  },
  zh: {
    "heroLines": [
      "看得更深，",
      "想得更远。"
    ],
    "heroText": "面向生物医药研究的开源软件与 Agent。探索证据，检查分子，围绕问题推进下一步研究。",
    "heroEyebrow": "科学软件与研究 Agent",
    "heroCta": "探索全部产品",
    "secondaryCta": "认识 X-Science",
    "collectionEyebrow": "产品系列",
    "collectionTitle": "五个工具，多种研究起点。",
    "collectionText": "研究 Agent、医药情报、药物发现、合成研究与专利分析。找到适合你当前问题的工具。",
    "structureEyebrow": "从分子看起",
    "structureTitle": "在三维中，理解生物结构。",
    "structureText": "亲手旋转一个结构，切换它的表现形式，从另一个角度观察同一个分子。",
    "structureScope": "参考坐标来自 RCSB PDB；视图省略晶体水，保留原始血红素辅因子。这些是公开参考示例，并非本系列产品的计算结果。",
    "structureControls": "结构视图控制",
    "proteinLabel": "蛋白质",
    "representationLabel": "表现形式",
    "cartoon": "丝带",
    "surface": "表面",
    "atoms": "原子",
    "spin": "自动旋转",
    "pause": "暂停旋转",
    "lightBackground": "浅色背景",
    "exportImage": "下载 PNG",
    "exportReady": "图片已下载，并保留 PDB 来源标注。",
    "exportError": "图片导出失败，请重试。",
    "resetView": "重置视图",
    "zoomIn": "放大",
    "zoomOut": "缩小",
    "structureHint": "拖动旋转，滚动或双指缩放。",
    "structureKeyboardHint": "聚焦结构后，用方向键旋转，+ 或 − 缩放；用 Tab 切换控件。",
    "structureLoading": "正在加载结构…",
    "structureReady": "结构已就绪",
    "structureError": "结构加载失败。请重试，或打开对应的 PDB 记录。",
    "structureUnsupported": "当前浏览器无法显示交互式三维结构。你仍可在 PDB 记录中查看公开结构。",
    "retry": "重试",
    "pdbSource": "查看 PDB 记录",
    "modelAttribution": "公开结构坐标 · RCSB PDB",
    "methodologyEyebrow": "研究思路",
    "methodologyTitle": "让问题与证据相连。",
    "methodologyText": "每个产品都有自己的方法与运行环境。从来源开始，理解分子背景，再复核输出并继续研究。",
    "methodologySteps": [
      {
        "title": "从证据出发",
        "text": "阅读原始来源，保留每个判断背后的具体背景。"
      },
      {
        "title": "理解分子背景",
        "text": "根据研究问题选择工具，检查结构、活性与合成。"
      },
      {
        "title": "审视下一步",
        "text": "继续研究前，核对输出、来源与方法的适用范围。"
      }
    ],
    "proofEyebrow": "走进产品",
    "proofTitle": "看看工具里的真实工作。",
    "proofText": "真实产品截图、公开仓库与使用文档。了解工具的实际用途，再查看它的源码。",
    "creatorEyebrow": "软件背后的研究者",
    "creatorTitle": "从科研问题中，开发工具。",
    "creatorText": "Victor Xu 是药物发现研究者与独立 AI 工具开发者，研究涉及药物化学、AIDD / CADD、PROTAC 与分子胶。",
    "contactEyebrow": "开始交流",
    "contactTitle": "你正在研究什么？",
    "contactText": "探索产品，阅读源码，或交流你的研究问题。",
    "sourceLink": "查看源码",
    "productCapabilitiesLabel": "产品能力"
  },
  ja, de, fr, ko,
};
