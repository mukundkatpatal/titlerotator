# Title Rotator

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨


## Start the application

Run `npx nx serve titlerotator` to start the development server. Happy coding!

## Build for production

Run `npx nx build titlerotator` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

# We use JWTs a lot throughout our API. For instance, when a user logs in on our API, a JWT is issued and our web-application uses this token for every request for authentication. Here's an example of such a token:
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzb21lb25lQGV4YW1wbGUubmV0IiwiYWRtaW4iOmZhbHNlLCJ2YWxpZF91bnRpbCI6IldlZCBEZWMgMzEgMjM6N
Tk6NTkgQ0VTVCAxOTY5In0.4bl2puoaRetNjO1GsweKOnnQsYgwNa9bQIC-WQZkuNo`

1. The payload is encoded, not encrypted. When we use `sub:someone.example.com`, we already help the man-in-the-middle attacker know something about the personally identifiable information about the user. His/her phishing attack vector is strengthened if visible to him. Rather, generate `GUID/UUID` or unique numbers or other opaque strings to identify the user. If, in the backend, someone changes their email address, the entire flow can be affected.
2. Also, `admin: false` is storing authorization information in the token. Attacker can self-elevate themselves to `admin: true`; the MITM attack get strengthened. Architecturally as well, this is a flawed idea as someone can revoke the admin permission in the DB, but the token validity is still there, so that users can still do tasks that are only allowed only as admins. Somehow, the tokens created after admin is set to false in the DB will have to be regenerated with a new token, which can add different kinds of issues.
3. The third part "valid_until": "Wed Dec 31 23:59:59 CEST 1969" used an expired date which is fishy, because it is before the the UNIX epoch date which is January 1, 1970. Maybe there is already a bug in the token generation. Then, instead of using the standard exp claim, a custom claim is used, e.g. valid_until.
Best practice would be to use exp: <valid unix time stamp for future>

# In our web-application, messages sent from one user to another, can contain HTML, which poses some security risks. Describe two attack vectors bad actors might try to abuse? And how would you mitigate these vectors?
1. XSS attacks, phishing, and session hijacking are some of the attack vectors. 
DOM Sanitization
2. Input Validation and Sanitization
We can mitigate it by using angular's built in tool for DOM sanitization.

This helps prevent malicious content from being executed.
```typescript
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

constructor(private sanitizer: DomSanitizer) {}

public sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
}
```
HTTP-Only and Secure Cookies:
This will ensure that session cookies are marked as HTTP-Only and Secure to prevent them from being accessed via JavaScript and to ensure they are only transmitted over HTTPS.

# Explain the difference between mutable and immutable objects.
● What is an example of an immutable object in JavaScript?
● What are the pros and cons of immutability?
● How can you achieve immutability in your own code?

1. Mutable: Objects whose properties can be modified after creation.
2. immutable: Objects whose properties can not be updated after the object is created
3. Examples: Symbol, Numbers, strings, booleans, null, and undefined.
4. How does immutability help in software world:
a. Concurrency and Parallelism: Immutable data structures are inherently thread-safe because they cannot be modified after creation. This makes concurrent and parallel programming much simpler since you don't have to worry about simultaneous modifications causing unexpected behavior or data corruption.This helps in single page applications to make sure how the data has been changing across application

b. Predictability and Debugging: With immutable data, you can be sure that once a piece of data is created, it won't change unexpectedly throughout your program. This makes your code easier to reason about, debug, and understand, as you don't have to track down unexpected mutations.

c. Functional Programming: Immutability is a core principle of functional programming, which emphasizes the use of pure functions and immutable data structures. Immutable data enables functional programming techniques like referential transparency, where a function call with the same arguments always produces the same result, aiding in reasoning about program behavior and facilitating optimization.

d. State Management: Immutable data structures are often used in state management libraries for applications, particularly in front-end development. By maintaining an immutable state, you can easily track changes, optimize rendering, and implement features like time-travel debugging. ngrx library we use in angular is a prime example of this.

e. Caching and Memoization: Immutable data can be cached and reused more effectively since you can be sure that the data won't change. This can lead to performance improvements, especially in scenarios where expensive computations can be memoized based on input arguments.

Disadvantages can be categorized into two sections.
1. Memory and performance
2. Immutable objects are created anew every time you need to make a change. This can lead to increased memory usage, especially in scenarios where you’re frequently modifying data.

3. In scenarios where milliseconds matter, this can impact your application’s responsiveness.
in some cases, copying data to create immutable objects can lead to performance bottlenecks, especially when dealing with large datasets. 
The overhead of copying data can outweigh the benefits of immutability.

4.  Maintainence
While immutability provides thread safety, it can make updating objects more cumbersome. Instead of modifying the object directly, you must create a new instance with the desired changes. This can lead to more complex code, especially when dealing with deeply nested or complex data structures.
Serialization and deserialization of immutable objects can be more complex than their mutable counterparts. You may need to implement custom serialization logic or use third-party libraries to handle this, which can add complexity to your codebase.
We can implement immutability in our own code using immutable.js or using state management techniques like ngrx. If we want to make a specific object immutable, then we have to use object.freez()

# Performance
1. Improve DB performance for the APIs. Consider using nosql DBs if required. CQRS and other patterns based on the architecture/requirements
2. Implement a caching strategy for the web application. This should be for server side objects, as well as client side such as images, svgs, fonts and usage of things like CDN
3. Implement proper load balancing strategy based on the usage.
4. Implement load tests and performance tests using technologies like blazemeter and monitor the dashboards
5. Reduce the number of http calls by implmenting aggregator patterns, or using technologies like graphQL
6. Implement a scaling/auto scaling strategy by monitoring the usage of the APIs/applications.
7. Assess and implement technologies like signalR to get notifications in the web applications rather than making timed calls to server
Client side performance
I am assuming this is not specific to angular. But I hope I can give specific examples with respect to angular
1. Implement single page applications, e.g. react, angular and implement lazy loading
2. Minimize bundle size. Use tools like esbuild, webpack and other minifyers. Angular will do it internally for you.
3. Compress images using tools like ImageMagick or online services like TinyPNG.
4. Use the srcset attribute to serve different image sizes based on the user's device.
5. Implement lazy loading for images to load them only when they are in the viewport.
6. In angular18, use patterns like deffered loading, lazy loading, named chuncks.
7. Implement angular SSR if required.
8. Implement lighthouse integration, review the report and fix any issues.
9. Implement virtual scrolls if grids benig used.
10. Run functionalities outside of angular's zone where appropriate, e.g. we dont want angular's change detection to rtigger in those cases
11. Use angular aot compilation in the production mode to reduce the parse time of the javascript at client side
12. Implement micro front end architecture where required.
13. Narrow down the number of browsers you want to support based on user feedback and reduce the number of pollyfills required
14. Asses package.json thoroghly and use tools like bundle analyzer to watch out for what packages you really require
15. keep close look at the dependencies vs devdependencies. what should be in devdependencies should not be in dependencies
17. Make sure the home page is lightest. Does not make a lot of http calls, implements skeleton loading/ deffered loading
18. Implement angular web worker on processor intensive jobs where required
19. Implement angular pwa or service worker where needed.