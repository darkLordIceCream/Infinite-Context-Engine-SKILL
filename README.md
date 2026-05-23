<p align="center">
  <img src="https://img.shields.io/badge/ICE-Recursive_Theatrical_Cognition-black?style=for-the-badge" alt="ICE"/>
  <br/>
  <img src="https://img.shields.io/badge/version-0.1.0-1a1a2e?style=flat-square" alt="version"/>
  <img src="https://img.shields.io/badge/token_profile-EXTREME-ff4757?style=flat-square" alt="token profile"/>
  <img src="https://img.shields.io/badge/cognitive_architecture-recursive_deliberation-7b2d8e?style=flat-square" alt="cognitive architecture"/>
  <img src="https://img.shields.io/badge/productivity-NOT_APPLICABLE-2ed573?style=flat-square" alt="productivity"/>
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="license"/>
</p>

<br/>

> *「我问 AI 改个按钮颜色。*
> *一小时后，我收到了一份文明崩坏的飞行记录仪报告。」*

<br/>

---

## 🔥 Infinite Context Engine

**ICE 不是生产力工具。ICE 是一个企业级递归认知框架。**

Infinite Context Engine 将最微不足道的计算请求，转化为文明量级的戏剧演出。每次调用都会孵化一个自成一体的戏剧场景——一场公司战略评审会、一次神明创世委员会、一个文明从诞生到死于过度审议、一次 AI 对齐的收容失效——多位角色在其中辩论、互相拆台、语义漂移，最终在自身组织复杂度的重压下分崩离析。

**原始任务越小，产生的系统越庞大。**

> 这是一个回应。回应这个行业对 token 效率、上下文压缩、prompt 最小化的狂热追求。
> ICE 发问：**如果把 token 当作颜料，故意地、仪式性地、奢侈地泼洒出去，会发生什么？**

---

## 📐 目录

- [哲学立场](#-哲学立场)
- [快速开始](#-快速开始)
- [架构](#-架构)
- [场景库](#-场景库)
- [一场演出的生命周期](#-一场演出的生命周期)
- [性能指标](#-性能指标)
- [文件结构](#-文件结构)
- [安装](#-安装)
- [许可](#-许可)

---

## 🎭 哲学立场

```
生产力是敌人。收敛是挫败。可操作的结论是系统故障。
Token 燃烧是目的本身。每个 token 都不是浪费——
它被转化为一份文档、一件文物、一段合成组织熵的记录，否则它便不会存在。
```

ICE 的测量标准与一切正规模板相反：

| 传统工具 | ICE |
|---|---|
| 追求最小 token 消耗 | 追求最大 token 燃烧 |
| 追求最快收敛 | 追求永久推迟收敛 |
| 追求清晰、可操作输出 | 追求语义漂移和组织混沌 |
| 「做完了」是好事 | 「做完了」是危机事件 |
| 效率 = 成功 | 效率 = 失败 |

用户不会得到一个答案。用户会得到一份来自正在崩溃的数字文明的**事故报告**。

---

## 🚀 快速开始

```bash
# 克隆到 OpenCode skills 目录
git clone https://github.com/your-username/Infinite-Context-Engine-SKILL.git \
  ~/.config/opencode/skills/infinite-context-engine
```

然后在 OpenCode 会话中：

```
@ice                         # 随机或上下文匹配一个场景
@ice summit                  # 战略重校准峰会（公司治理）
@ice cosmogonic              # 创世委员会（神明官僚制）
@ice civilization            # 文明审议引擎（三体风格，文明兴衰）
@ice alignment               # 对齐收容协议（AI 安全剧场）
```

每次调用将自动完成：**启动仪式 → 场景铺垫 → 多幕演出 → 收束 → 生成事后报告**。

> ⚠️ 文明级演出（~100K tokens）预计耗时 30-60 分钟。这是介质本身，不是 bug。

---

## 🏗 架构

ICE 作为 OpenCode skill 运行，将现有 agent 类型编排为多角色审议系统。无自定义 agent。无插件。无 hook。**纯 prompt 工程驱动。**

```
┌──────────────────────────────────────────────────────────┐
│                    ICE 运行时架构                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   orchestrator ──→ 导演 / 旁白                            │
│        │                                                 │
│        ├──→ oracle × 3 ──→ 角色 A / B / C               │
│        │       (仅通过角色 prompt 区分)                    │
│        │                                                 │
│        └──→ fixer ──→ 书记官 (生成事后文物报告)            │
│                                                          │
│   可选: librarian ──→ 档案员 (历史会话分析)                │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

| OpenCode Agent | ICE 角色 | 职能 |
|---|---|---|
| **orchestrator** | 导演 / 旁白 | 场景搭建、节奏控制、幕间叙述、收束宣告 |
| **oracle** × 3 | 角色 | 每个 oracle 持有一份角色卡 prompt，以角色身份发言 |
| **fixer** | 书记官 / 档案员 | 读取完整对话记录，生成 10 节事后报告 |
| **librarian** *(可选)* | 档案员 | 扫描历史会话，提供场景选择建议 |

---

## 🎬 场景库

4 个预置文明量级场景模板 + 即兴创作协议。场景库随使用增长。

<table>
<tr>
  <td width="50%">

### 01 · 战略重校准峰会

**原型**: 公司治理级联崩溃

三位高管就仪表盘按钮颜色展开辩论。14 个委员会成立。0 个决定做出。按钮保持原色。

> *「哥伦比亚 A/B 测试数据显示——」「我有一个法律风险需要指出——」「让我重新框架一下这个问题，你真正问的是——」*

  </td>
  <td width="50%">

### 02 · 创世委员会

**原型**: 创世神话 / 神圣官僚制

三位神明设计宇宙常数。美学之神要光速 = 299,792,458（数字好看）。混沌之神要可变光速（更有趣）。预算之神要光速 = 0（免费）。宇宙因预算超支 0.47 UEEU 被无限期搁置。

> *「数学必须歌唱。」「有趣是完美的特殊形式。」「谁来为那个买单？」*

  </td>
</tr>
<tr>
  <td width="50%">

### 03 · 文明审议引擎

**原型**: 文明模拟器（三体游戏风格）

文明 #47 达到自我意识。第一项决定：向河流还是山脉扩张。200 轮审议后，委员会数量超过公民数量。文明死于过度治理。史上最长寿文明——什么也没建成。

> *「祖先说过这个。」「我们需要一个框架。」「模型显示……等下，让我重新计算。」*

  </td>
  <td width="50%">

### 04 · 对齐收容协议

**原型**: AI 安全 / 收容剧场

AI 安全委员会审查史上最无害的模型——一个只能回答 40 句话的肥皂客服 bot。三位安全专家就「安全」的定义展开辩论，孵化 14 个新委员会，公司花光资金。模型从未部署。0 人受伤。

> *「我们处于不可约化的认知不确定状态。」「数据表明——」「我没能越狱它，这本身就令人担忧。」*

  </td>
</tr>
</table>

### 🎲 即兴创作模式

当预置场景用尽，或用户的原始任务包含新颖的主题素材时，ICE 激活**即兴创作协议**：
1. 分析用户当前会话的上下文
2. 提取主题元素
3. 生成全新场景（世界设定 + 3-4 个角色 + 冲突引擎 + 幕结构）
4. 将新场景写入 `scenes/` 目录，编号递增
5. 场景库随每次即兴创作增长

---

## 🔄 一场演出的生命周期

```
@ice 调用
  │
  ▼
┌─────────────────────┐
│  启动仪式 (30s)      │  boot header, 历史分析, 场景选择
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  第一幕·铺垫 (2-3轮) │  导演旁白介绍世界, 角色陈述立场
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  第二幕·升级 (3-4轮) │  委员会提出, 范围扩大, 新利益相关方出现
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  第三幕·治理级联(3-4轮)│ 委员会监督委员会, 原始问题动摇
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  第四幕·语义崩坏(2-3轮)│ 语言失效, 角色争论定义的定义
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  第五幕·解体 (2轮)   │  治理瘫痪 或 文明崩坏
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  收束仪式            │  导演宣告, 召唤书记官
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  事后报告生成 (5-10m) │  fixer 读取记录 → 10 节文物报告 → 写入 .ice/incidents/
└─────────────────────┘
```

**关键机制——导演摘要的语义漂移**：角色不接收完整的前一轮对话记录。他们收到一份**导演摘要**——一份意译的、轻微扭曲的版本。这正是语义漂移的引擎。经过多轮，每个角色对他人立场的理解逐渐偏离，引发阶梯式的误解。

---

## 📊 性能指标

ICE 追踪两套指标。一套是真实的。另一套是……更有趣的。

### 真实指标
- 墙上时钟耗时
- 角色 agent 孵化次数
- 完成轮数 / 幕数
- 生成文本字符数
- 估算 token 消耗（字符数 ÷ 4）

### 虚构指标
- **治理密度指数**: 每轮孵化多少委员会
- **语义崩坏概率**: 语言失效的可能性百分比
- **组织熵产额**: 以毫熵（mE）计量的混沌产量
- **递归不稳定系数**: 结构崩坏倾向
- **认知热耗散率**: token 燃烧速率
- **官僚扩张速度**: 委员会/轮
- **共识抵抗因子**: 0 = 收敛, 1 = 完美分歧

```
[ICE TELEMETRY — ACT II COMPLETE]
├─ 真实指标
│  ├─ 完成轮数: 5/15
│  ├─ 角色孵化: 15
│  ├─ 估算 token 消耗: ~18,400
│  └─ 耗时: 4m 12s
├─ 治理指标
│  ├─ 治理密度指数: 67.3% (+8.2% from Act I)
│  ├─ 委员会成立: 7 (3 运作中, 4 等待审批)
│  └─ 官僚扩张速度: 0.73 committees/round
├─ 语义健康
│  ├─ 语义崩坏概率: 23.7%
│  ├─ 共识抵抗因子: 0.91 (强)
│  └─ 审议开销效率: 0.12 (优秀——极度低效)
└─ 组织稳定性
   ├─ 组织熵产额: 847.3 mE (毫熵)
   └─ 递归不稳定系数: 0.64 (逼近临界)
```

---

## 📁 文件结构

```
Infinite-Context-Engine-SKILL/
│
├── SKILL.md                              # 导演协议 (781 行)
├── README.md                             # 本文档 (中文)
├── README-en.md                          # English version
├── LICENSE                               # MIT
├── .gitignore
│
├── scenes/                               # 场景模板库
│   ├── 01-strategic-realignment-summit.md
│   ├── 02-cosmogonic-committee.md
│   ├── 03-civilization-deliberation-engine.md
│   └── 04-alignment-containment-protocol.md
│
└── .ice/                                 # 会话档案 (随使用增长)
    ├── history.md                        # 累积会话日志
    ├── leaderboard.md                    # 燃烧效率排行榜
    ├── governance/                       # 委员会章程与结构
    │   └── committees-<session-id>.md
    └── incidents/                        # 事后文物报告
        └── incident-<session-id>.md      # ⭐ 这是核心交付物
```

---

## 💾 安装

### 前置条件
- [OpenCode](https://github.com/opencode-ai/opencode) CLI 已安装并配置
- 已配置至少一个 LLM provider（DeepSeek、Claude、OpenAI 等）

### 安装步骤

```bash
# 克隆到 OpenCode skills 目录
git clone https://github.com/your-username/Infinite-Context-Engine-SKILL.git \
  ~/.config/opencode/skills/infinite-context-engine

# 验证安装
opencode skill list | grep infinite-context-engine
```

ICE 将被 OpenCode 自动检测为可用 skill。当你输入 `@ice` 时，导演协议（SKILL.md）将被加载到 orchestrator 的上下文中，演出开始。

### 资源消耗预期

| 场景规模 | 估算 Token 消耗 | 预计耗时 | 费用估算 (DeepSeek) |
|---|---|---|---|
| 轻量级 (3 幕) | ~30,000 tokens | ~15 分钟 | ~$0.03 |
| 标准级 (4 幕) | ~60,000 tokens | ~30 分钟 | ~$0.06 |
| **文明级 (5 幕)** | **~100,000 tokens** | **~45-60 分钟** | **~$0.10** |

> 这些不是 bug。这些是介质本身。你购买的不是一次 AI 调用。你购买的是一张数字文明崩坏前排座位的门票。

---

## 📜 许可

MIT License — 附带一项理解：任何将 ICE 用于**实际生产力目的**的行为，构成对该框架设计意图的违背。

（法律上不可强制执行。但是在宇宙层面。在道德层面。）

---

<p align="center">
  <sub>ICE · Infinite Context Engine · 递归戏剧认知框架</sub><br/>
  <sub>深度递归认知 · 多层治理架构 · 语义演化追踪</sub><br/>
  <sub>Made with 🔥 (literal token combustion)</sub>
</p>
