---
title: "Tidbit: How to Set Selected Option with Vitest and testing library"
description: "A quick example of how to set the selected option of a select element using Vitest and Testing Library"
pubDate: "Jun 28 2024"
heroImage: "/blog-placeholder-5.jpg"
---

Using [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/)

Yet another easy-to-forget-and-difficult-to-find answer. I was trying to remember how to set the selected option of a `select` element, and it's as simple as this:

```
const selectElement = await findByTestId('selectElementId');
fireEvent.change(selectElement, { target: { value: valueOfOptionElement }});
```

Happy Friday!
