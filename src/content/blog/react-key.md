---
title: "Don't Forget Your Keys!"
description: "Why an array of JSX components are sharing state and how to fix it"
pubDate: "Mar 7 2024"
heroImage: "/blog-placeholder-2.jpg"
---

TL;DR: React will re-use an instance of a component (sharing state in the process) if you do not set the `key` attribute to differentiate identical components in the same DOM position.

Example:

I was trying to render a list of QuestionCard elements for my trivia web app, but when a new question was rendered, it would have the button state from the previous card. Initially, I thought I had made a mistake with props, but it was actually React "reconciliation", where React will reuse a component instance if it doesn't detect the location of a component change.

The fix is to force React to reset state. Per the React docs:

> There are two ways to reset state when switching between them:
>
> - Render components in different positions
> - Give each component an explicit identity with key<br>
>   — <cite>[React docs](https://react.dev/learn/preserving-and-resetting-state)</cite>

Additionally,

> - You can force a subtree to reset its state by giving it a different key

**Enter `key` (more play on words)**

For my use case (rendering new QuestionCard elements in the same position in the DOM), I went the `key` route, like so:

```
<div key={`${props.index}`}>
```

<br>

#### Original

Rendering a list of QuestionCard elements (sans `index` prop):

```
  const questionCards: ReactElement[] = props.questions?.map((questionData) => (
    <QuestionCard
      questionData={questionData}
      incrementIndex={incrementIndex}
    />
  ));
```

#### The fix

Passing `index` prop and setting it inside of QuestionCard:

```
  const questionCards: ReactElement[] = props.questions?.map((questionData) => (
    <QuestionCard
      index={index}
      questionData={questionData}
      incrementIndex={incrementIndex}
    />
  ));
```

JSX inside of QuestionCard:

```
    <div key={`${props.index}`}>
      <div>
        <div className="question-container">
            ...
```

I'm pretty sure I've hit this problem before, so I decided to write a quick blurb on the "why" behind it so I'd be less likely to forget next time. Hopefully it was helpful!
