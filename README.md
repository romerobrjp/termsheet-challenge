# TermSheet challenge

![2024-01-08 04_20_35-TermSheet_ Real Estate Deals - Personal - Microsoft​ Edge](https://github.com/romerobrjp/termsheet-challenge/assets/638656/544a6d3d-794d-4f73-a5a9-368fd807558c)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.9.

### Challenge requirements:
- User will be taken to deal listing screen where user can see a table of pre-filled deals (again, hard-coded, no API)                                              
- Users should have the ability to add and edit deals with the above details. The user should be able to add one or more deals at once.
- Users should be able to filter the list by at least two fields of their choice.
- Users should be able to click on a deal from the list and be redirected to a deal details page.
- The user should also be able to return to the list page.    

### Check the short demo video to see all the requirements in action: https://drive.google.com/file/d/1eKFsQcy4FutYWomTulJn9nT44RCjWmje/view?usp=sharing

### The following Angular features were leveraged for this challenge:
- **Lazy Loading Routes:** Optimized loading of application sections for better performance.
- **Module Sharing:** Efficient sharing of modules for scalability and reusability.
- **Service & State Management:** Centralized data management and sharing via services and state management libraries.
- **Observables:** Leveraged to handle asynchronous operations and data streams.
- **Subject, BehaviorSubject:** Used to manage and share observable data among different parts of the application.
- **Cleanup with OnDestroy:** Proper subscription management to prevent memory leaks.
- **Reactive Forms:** Employed for form handling, multiple forms management, and validation.
- **Pipes:** Demonstrated the implementation of a custom pipe (CapitalizePipe) as an illustrative example. Additionally, leveraged the built-in Currency pipe from the Angular common module for currency formatting.
- **Directives:** Demonstrated the implementation of a custom directive (appHighlight) as an illustrative example.
- **Dialogs:** Implementation of modal dialogs for user interaction.
- **Custom Styling with SCSS:** Custom styling for enhanced UI/UX.
- **Custom Loader Component:** Included a custom loader component for a seamless user experience.
- **Interceptor:** Added an example of how to implement and register a interceptor.
- **Angular 17 template syntax:** Utilized the new template syntax for directives like `@if` and `@for`

### Extras
- Cap rate calculation, considering a range from 5% to 12%.
- Utilization of PrimeNG to expedite development and customization.
