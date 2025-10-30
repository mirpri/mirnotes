# TypeScript Learning
TypeScript is the enhanced JavaScript.

## Overview
> Typescript is by Microsoft!

TypeScript is a programming language that's a superset of JavaScript — building on top of it to add **static typing** so you can catch errors during development instead of at runtime. 

It was developed by Microsoft to address the difficulties of maintaining large applications written in JavaScript, and has been expanded to add a number of modern developer-friendly features.

In addition to static typing, TypeScript also adds features like interfaces, generics, type inference, access modifiers, and other constructs not present in standard JavaScript. 

TypeScript compiles to plain JavaScript, so anything that works in JavaScript works in TypeScript, including third-party JavaScript libraries and any code you've already written in JavaScript.  

## Advatages over JavaScript
***Static typing***
- improve readability and maintainability
- early error detection
- enhanced ide support
```ts
// define a variable with optional type annotation
let x: number =5; // x is of type number
let y=10; // y is of type number (inferred)
console.log(x+y); // 15
```

Beyond static typing, TypeScript introduces several other key differences and enhancements compared to standard JavaScript:

**Interfaces:**

* TypeScript introduces interfaces, which are powerful tools for defining contracts or shapes for objects. This allows you to specify the properties and methods that an object must have.
* JavaScript doesn't have a built-in interface concept.

**Classes and Object-Oriented Programming:**

* While JavaScript has classes (introduced in ES6), TypeScript enhances them with features like access modifiers (`public`, `private`, `protected`) and abstract classes, which provide more robust object-oriented programming capabilities.
* TypeScript's class system feels more like traditional object-oriented languages, which can be beneficial for developers coming from those backgrounds.

**Enums (Enumerations):**

* TypeScript offers enums, which allow you to define sets of named constants. This can make your code more readable and maintainable, especially when dealing with a fixed set of values.
* JavaScript doesn't have built-in enums.

**Namespaces and Modules:**

* TypeScript provides namespaces (though modules are now generally preferred) for organizing code and preventing naming collisions.
* TypeScript has a very robust module system that works well with modern javascript module approaches.
* While JavaScript has modules (ES modules), TypeScript's module system integrates seamlessly with its type system, providing better tooling and type checking.

**Decorators:**

* TypeScript supports decorators, which are a way to add metadata and modify classes, methods, or properties. They are often used in frameworks like Angular.
* Decorators are still an experimental feature in JavaScript.

**Generics:**

* TypeScript's generics allow you to create reusable components that work with a variety of types. This enhances code flexibility and reduces code duplication.
* While Javascript can create very flexible code, generics improve the type safety of that code.

**Type Inference:**

* While you can explicitly annotate types, TypeScript also has powerful type inference capabilities. It can often automatically determine the type of a variable or expression, reducing the need for explicit annotations.
* This makes typescript feel less verbose than some other strongly typed languages.

**Improved DOM Manipulation:**

* TypeScript provides type definitions for the DOM, making it easier and safer to work with HTML elements. This reduces the risk of runtime errors when manipulating the DOM.
