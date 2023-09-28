# Potential Pormpts to use with Aider

```
> dummy out ajv needing graphql  

> apply edits to convert all files into typescript and run with npm start  

> An """npm start"" reports that index.html is not found. The project should only be using the App.tsx file  

> It reports that it cannot find an index.html file as a required file.  

> These components, including the logo are not showing on the web page.  

> The localhost page is now completely blank.  

The debugger console reports """react-jsx-dev-runtime.development.js:87 Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: object. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.  
> Check your code at index.tsx:7"""  

The debugger also reports: """Uncaught Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.  
>     at createFiberFromTypeAndProps (react-dom.development.js:28439:1)  
>     at createFiberFromElement (react-dom.development.js:28465:1)  
>     at reconcileSingleElement (react-dom.development.js:15750:1)  
>     at reconcileChildFibers (react-dom.development.js:15808:1)  
>     at reconcileChildren (react-dom.development.js:19167:1)  
>     at updateMode (react-dom.development.js:19520:1)  
>     at beginWork (react-dom.development.js:21643:1)  
>     at HTMLUnknownElement.callCallback (react-dom.development.js:4164:1)  
>     at Object.invokeGuardedCallbackDev (react-dom.development.js:4213:1)  
>     at invokeGuardedCallback (react-dom.development.js:4277:1)  
> react-dom.development.js:18687 The above error occurred in the <StrictMode> component:"""  

It is now reporting under """npm start""" the following: """ERROR in ./src/Header.tsx 5:0-38  
> Module not found: Error: You attempted to import ../public/logo.svg which falls outside of the project src/ directory. Relative imports outside of src/ are not supported.  
> You can either move it inside src/, or add a symlink to it from project's node_modules/."""  

It is now reporting under """npm start""" the following: """ERROR in ./src/Header.tsx 5:0-38  
> Module not found: Error: You attempted to import ../public/logo.svg which falls outside of the project src/ directory. Relative imports outside of src/ are not supported.  
> You can either move it inside src/, or add a symlink to it from project's node_modules/."""  

add to the `workspaces/mySwap/package.json` scripts to run the tests  

It reports one test failed and one passed.  

"""A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them."""  

getting error on """  4 | test('renders learn react link', () => {  
>       5 |   render(<App />);  
>     > 6 |   const linkElement = screen.getByText(/learn react/i);  
>         |                              ^  
>       7 |   expect(linkElement).toBeInTheDocument();  
>       8 | });  
>       9 |"""  

are the unit tests using a functionally programmed approach?  
Can you rewrite the unit tests to use monads?  
Please use Ramda in the tests to demonstrate the capability.  
Please use Ramda in the tests to demonstrate the capability in the `workspaces/mySwap/src/Header.test.tsx`  
Please use Ramda in the tests to demonstrate the capability in the `workspaces/mySwap/src/Header.test.tsx` with compose also.  

```
