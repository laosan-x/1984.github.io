---
title: "Apple II编程：BASIC语言的黄金时代"
date: 2026-03-10
author: Woz
categories: [编程, 历史]
tags: [Apple II, BASIC, 编程, 复古]
toc: true
---

深入探讨 Apple II 时代的编程环境，以及 BASIC 如何点燃了个人计算的火花。

## 闪烁的光标

在 Apple II 时代，屏幕上闪烁的光标是通往无限可能的入口。对于当时的爱好者来说，BASIC 语言不仅是工具，更是魔法。

## Integer BASIC 与 Applesoft BASIC

Steve Wozniak 设计的 Apple II Integer BASIC 极其高效，直接在硬件上运行。随后，Applesoft BASIC 成为了标配，支持浮点运算，为商业和科学计算打开了大门。

### Integer BASIC 特点

- 执行速度快
- 整数运算
- 由 Woz 亲手编写
- 随 Apple II 最初版本发布

### Applesoft BASIC 特点

- 支持浮点数
- 由 Microsoft 开发
- 更强大的字符串处理
- 成为 Apple II+ 的标准

## 直接控制硬件

编写代码意味着直接控制硬件。你可以通过 `PEEK` 和 `POKE` 命令直接访问内存地址，控制扬声器发声，或者改变屏幕上的像素颜色。

```basic
10 REM 简单的发声程序
20 FOR I = 1 TO 100
30 POKE 768, I
40 POKE 769, 10
50 CALL 770
60 NEXT I
```

## 代码清单文化

那个时代的编程杂志（如《Compute!》、《Byte》）充满了代码清单。用户需要一行行地敲入代码，调试语法错误，最终运行出简单的游戏或实用程序。

### 经典的 Hello World

```basic
10 PRINT "HELLO WORLD"
20 GOTO 10
```

### 简单的猜数字游戏

```basic
10 REM 猜数字游戏
20 N = INT(RND(1) * 100) + 1
30 G = 0
40 INPUT "猜一个1-100的数字: "; A
50 G = G + 1
60 IF A < N THEN PRINT "太小了!": GOTO 40
70 IF A > N THEN PRINT "太大了!": GOTO 40
80 PRINT "恭喜! 你用了"; G; "次猜对了!"
90 INPUT "再玩一次? (Y/N) "; R$
100 IF R$ = "Y" THEN 20
```

## 图形编程

Apple II 的低分辨率和高分辨率图形模式为创意编程提供了可能：

```basic
10 GR
20 FOR X = 0 TO 39
30 FOR Y = 0 TO 39
40 COLOR= INT(RND(1) * 16)
50 PLOT X, Y
60 NEXT Y
70 NEXT X
80 GET A$
90 TEXT
```

## 学习资源

当时的程序员通过以下方式学习：

| 资源类型 | 说明 |
|---------|------|
| 杂志 | Compute!, Byte, Creative Computing |
| 书籍 | BASIC 程序设计入门 |
| 用户组 | Apple 用户俱乐部 |
| 代码交换 | 朋友间分享程序 |

## 那个时代的魅力

这种亲手构建的成就感，是现代 IDE 难以替代的。每一行代码都是与机器的直接对话，没有框架的抽象，没有库的依赖，只有纯粹的创造。

## 结语

BASIC 语言时代教会了一代人编程。它简单、直接、充满乐趣。虽然今天的编程环境已经大不相同，但那种探索和创造的精神值得我们铭记。
