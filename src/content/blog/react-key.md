---
title: "Don't Forget Your Keys!"
description: "Why an array of JSX components are sharing state and how to fix it"
pubDate: "Mar 7 2024"
heroImage: "/blog-placeholder-2.jpg"
---

TL;DR: React will re-use an instance of a component (sharing state in the process) if you do not set the `key` attribute to differentiate identical components in the same DOM position.

#### Context:

I was trying to render a list of QuestionCard elements for my trivia web app, but when a new question was rendered, it would have the button state from the previous card. Initially, I thought I had made a mistake with props, but it was actually React's [reconciliation](https://legacy.reactjs.org/docs/reconciliation.html), where React will reuse an instance of a component if it can.

Spoiler alert: The fix is to force React to reset state in one of two ways. Per the React docs:

> There are two ways to reset state when switching between them:
>
> - Render components in different positions
> - Give each component an explicit identity with key<br>

> - You can force a subtree to reset its state by giving it a different key<br>
>   — <cite>[React.dev](https://react.dev/learn/preserving-and-resetting-state)</cite>

<br>

#### Enter `key` (play on words, sorry)

I needed to render new question cards in the same DOM position to keep things tidy, so I went the `key` route, like so:

```
<div key={`${props.index}`}>
```

<br>

##### Before

Rendering a list of QuestionCard elements (sans `index` prop):

```
  const questionCards: ReactElement[] = props.questions?.map((questionData) => (
    <QuestionCard
      questionData={questionData}
      incrementIndex={incrementIndex}
    />
  ));
```

##### After

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

I'm pretty sure I've hit this problem before, so I decided to write a quick blurb on the “why” behind it, so I'd be less likely to forget next time. Hopefully it was helpful!