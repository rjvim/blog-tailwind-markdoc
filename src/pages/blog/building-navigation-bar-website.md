---
title: 'Building Top Navigation Bar'
date: '2020-06-03T05:35:07.322Z'
---

We have added a `NavigationBase` bar to reusejs, but it's important to understand how it works, because the component only gives placeholders to place anything. In order to explain this better, we actually build the navigation bar in this tutorial, so that it's clear how NavigationBase component works.

**Initial Divs**

The following snippet of code helps us setup the foundation of the bar.

```jsx
<div className="bg-orange-200">
  <div className="border-b border-gray-200">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between"></div>
    </div>
  </div>
</div>
```

**Divide into Parts**

We divide this navigation bar into maximum three parts. We extend the above code with following three divs:

```jsx
<div className={backgroundClasses}>
  <div className={borderClasses}>
    <div className={widthClasses}>
      <div className={heightClasses}>
        {/* Left */}
        <div className="flex h-full items-center bg-red-50">
          {props.left !== undefined && <props.left />}
        </div>
        {/* Middle */}
        <div className="flex h-full items-center bg-blue-50">
          {props.middle !== undefined && <props.middle />}
        </div>
        {/* Right */}
        <div className="flex h-full items-center bg-green-50">
          {props.right !== undefined && <props.right />}
        </div>
      </div>
    </div>
  </div>
</div>
```

Above is ReactJS code, so we have to assume that left/middle/right are props which are passed to Navigation Base. The background colors give are temporary, just for distinction between sections

**Come up with Arrangements**

Before we come with all possible arrangements, let's come up what variations we would like inside each section:

1. We want the content be centered, left or right aligned inside each section
2. We want a particular section to take as much space as possible

Arrangements are also again class driven.

```jsx
<div className={backgroundClasses}>
  <div className={borderClasses}>
    <div className={widthClasses}>
      <div className={heightClasses}>
        {/* Left */}
        {props.left !== undefined && (
          <div
            className={classNames(
              'flex h-full items-center',
              props.leftArrangement || ''
            )}
          >
            {<props.left />}
          </div>
        )}
        {/* Middle */}
        {props.middle !== undefined && (
          <div
            className={classNames(
              'flex h-full items-center',
              props.middleArrangement || ''
            )}
          >
            {<props.middle />}
          </div>
        )}
        {/* Right */}
        {props.right !== undefined && (
          <div
            className={classNames(
              'flex h-full items-center',
              props.rightArrangement || ''
            )}
          >
            {<props.right />}
          </div>
        )}
      </div>
    </div>
  </div>
</div>
```
