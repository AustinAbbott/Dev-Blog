---
title: "Tidbit: How to Right-Align Content of a Single Grid Column"
description: "A quick example of aligning stuff with grid and grid-template-columns"
pubDate: "Jun 7 2024"
heroImage: "/blog-placeholder-3.jpg"
---

I always end up searching for this online, so adding a quick tidbit to save myself time down the road.

Using `display: grid` and `grid-template-columns: 1fr 1fr` is an easy way to have the content of the first column left-aligned, with the content of the second right-aligned:

```
.parent {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.right-column {
    justify-self: end;
}
```

Visual example:

![A visual example of the aforementioned CSS](../../../src/images/align-right-grid-template-column.png)
<small>Sidenote: the diagram above should say `display: grid` not `display: flex`, but I don't feel like re-writing it</small>

No `text-align` required. Happy Friday! 🍺
