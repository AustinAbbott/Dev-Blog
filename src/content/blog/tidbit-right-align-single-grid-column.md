---
title: "Tidbit: How to Right-Align Content of a Single Grid Column"
description: "A quick example of aligning stuff with grid and grid-template-columns"
pubDate: "Jun 7 2024"
heroImage: "/tidbit-header.png"
---

I always end up searching for this online, so adding a quick tidbit to save myself time down the road.

Using `display: grid` and `grid-template-columns: 1fr 1fr`, there's easy way to have the content of the first column left-aligned, with the content of the second right-aligned:

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

![A visual example of the aforementioned CSS](../../../public/align-right-grid-template-column.png)

Bam, no `text-align` required. Happy Friday! 🍺
