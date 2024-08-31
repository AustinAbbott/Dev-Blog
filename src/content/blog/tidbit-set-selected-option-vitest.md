---
title: "Tidbit: How to Set Selected Option with React Testing Library"
description: "A quick example of how to set the selected option of a select element using Testing Library"
pubDate: "Jun 28 2024"
heroImage: "/src/images/blog-placeholder-5.jpg"
---

Yet another easy-to-forget-and-difficult-to-find answer. I was trying to remember how to set the selected option of a `select` element, and with [Testing Library](https://testing-library.com/) it's as simple as this:

```
import { fireEvent, render } from "@testing-library/react";

it("sets the selected option", () => {
    const { findByTestId } = render(<SomeComponent />);

    const selectElement = await findByTestId('selectElementId');
    fireEvent.change(selectElement, { target: { value: valueOfDesiredOption }});
})
```

Happy Friday!
