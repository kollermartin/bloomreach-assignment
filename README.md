# Bloomreach Assignment

## 🚀 Overview

This project was developed as part of the Bloomreach assignment.

## 📌 Project Status

This project is **not fully finished**, but the **major and most important features are completed**.  
Some polishing, responsiveness improvements, broader test coverage, and especially the *“make it look prettier with CSS”* part are still on the to-do list.

Not everything is perfectly aligned — CSS classes, spacing, naming, code style… the usual suspects.  
But hey, I **did my best**, and everything at least *pretends* to work together 😄

And just to be clear: I’m totally comfortable acknowledging that some areas could use more time and polish — that’s part of the process.

## 💭 Thoughts

If I were to approach this assignment again, it would be very interesting to leverage **Angular 21**, especially its new **Signal Forms**.  
The improvements introduced there could simplify form handling, reduce boilerplate, and potentially boost performance — definitely something I’d like to explore in a future iteration.

Since Angular 20 does not include Signal Forms yet, this project ended up being a **compromise between Signals and RxJS**:  
- **Signals** are used for inputs and passing data around,  
- **RxJS** is used for reacting to Angular Reactive Forms and their value changes.  

It works well, but Signal Forms in Angular 21 would make this architecture much cleaner.

## ⚙️ Tech Choices & Rationale

### 🔸 Angular 20

I selected **Angular 20** intentionally, even though Angular 21 was released only about a week ago. Newly released major versions often require ecosystem adjustments or may introduce unexpected breaking changes. Angular 20 provided a stable and predictable foundation for development.

### 🔸 Zoneless Architecture & OnPush Change Detection

The entire application is built **Zoneless** and uses Angular's `ChangeDetectionStrategy.OnPush`.  
This ensures:

- More predictable UI updates
- Reduced change detection overhead
- Improved performance

## 🧪 Unit Testing

Due to limited time, I was not able to implement full unit test coverage. I added several tests, but since I am primarily experienced with **Jest**, setting up **Jasmine/Karma** took additional time.  
As a result, the test coverage is partial.

## 📱 Responsiveness

I did not have enough time to fully address UI responsiveness. The application works but is not yet optimized for different screen sizes.

## 🛠️ Development Server

To start a local development server, run:

```bash
ng serve
```

Navigate to:

```
http://localhost:4200/
```

The application will automatically reload when source files are modified.

## 🧱 Code Scaffolding

To generate a new component, run:

```bash
ng generate component component-name
```

For additional schematics, run:

```bash
ng generate --help
```

## 📦 Building the Project

To build the project, run:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory. Production builds include optimizations.

## 🧪 Running Unit Tests

To execute unit tests using Karma, run:

```bash
ng test
```

## 🔍 Running End-to-End Tests

To run end-to-end (e2e) tests, use:

```bash
ng e2e
```

Note: Angular CLI does not include a default e2e testing framework. You may add one such as Cypress or Playwright.

## 📚 Additional Resources

For more information about the Angular CLI, visit:  
https://angular.dev/tools/cli
