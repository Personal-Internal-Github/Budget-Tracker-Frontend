# Introduction

Greetings!

Please be inform that due to backend unforeseen issue when hosting, it is better to run this Frontend code locally.

This Readme file will provide details on the code logic and how to run it.

# Code Setup

1) Please go to "Code" and download the source code.

2) Open it in an IDE and open a "CMD".

3) In your "CMD", run command "npm i". This will install all the dependencies.

4) After that, run command "npm run dev". This will start the Frontend code.

# Code Structure

![image](https://github.com/Personal-Internal-Github/Budget-Tracker-Frontend/assets/60610270/49ec87ed-1c97-46e3-88aa-ba2102ef06a7)

Above is how the code is being sturtured. Since we are building this project in React App, we have implement a logic using external package that will handle the React Lifecycle.

Here is the link to it -> https://react.dev/learn/lifecycle-of-reactive-effects

# Code Logic
To handle the React Lifecyle mentioned above, we used "React Query" or "React TanStack". Here is the link to the package -> https://tanstack.com/query/latest/docs/framework/react/overview

![image](https://github.com/Personal-Internal-Github/Budget-Tracker-Frontend/assets/60610270/ecf30dd2-51f9-42e7-a98b-e61eec088ac7)

In "main.jsx" files, I wrapped React Query and Chakra UI Provider tag around the "App" tag. 

![image](https://github.com/Personal-Internal-Github/Budget-Tracker-Frontend/assets/60610270/044486f0-ad63-43da-a537-8ec8bbf28f32)

This is because, for React Query, the "QueryClient" function will provide a reference of variables among each React Components in which I passed in "client" prop.

# Issue Faced During Development

If we build using native React, we have to manually handle the React Lifecycle by using "useEffect" hook.

This issue become evident when I add Income, Remove Income, Add Expense and Remove expense, I want the UI to immediately reflect the latest database data.

# Solution

This is where React TanStack comes in.

![image](https://github.com/Personal-Internal-Github/Budget-Tracker-Frontend/assets/60610270/9e5a2c2e-c665-4983-84ff-b0f353b3e0ec)

This how the logic looks like.

For GET API call, we will use "useQuery" like in picture below:

![image](https://github.com/Personal-Internal-Github/Budget-Tracker-Frontend/assets/60610270/882a7208-6844-480f-94ae-1d0ad35b33fc)

For Create, Update and Delete API operation, we will use "useMutation" like in picture below as well.

![image](https://github.com/Personal-Internal-Github/Budget-Tracker-Frontend/assets/60610270/9e5a2c2e-c665-4983-84ff-b0f353b3e0ec)

# React TanStack Resource Link

Before I proceed, here is the link for the topics that I will mention below.

1) useQuery -> https://tanstack.com/query/latest/docs/framework/react/guides/queries

2) useMutation -> https://tanstack.com/query/latest/docs/framework/react/guides/mutations

3) queryKey -> https://tanstack.com/query/latest/docs/framework/react/guides/query-keys

4) queryFunction -> https://tanstack.com/query/latest/docs/framework/react/guides/query-functions

5) Invalidate Query -> https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation
   

# Code Breakdown

"useQuery" and "useMutation" shared almost the same data that they will return. The most commons are "data", "isPending" and "isError" when you destructure the attribute.

"data" is the response return from an API call.

Below is how the data will be used to display data

![image](https://github.com/Personal-Internal-Github/Budget-Tracker-Frontend/assets/60610270/daef1c89-b6f6-4069-88cc-ecded96c3913)

As for "isPending" and "isError", both of it are an API state. "isPending" is used when the API call is being made while "isError" is used when an error return from it.

# queryKey

![image](https://github.com/Personal-Internal-Github/Budget-Tracker-Frontend/assets/60610270/f1b11101-e8e1-4457-be99-d94bd90c8b0f)

You can think "queryKey" as a variable that can be used anywhere in the project.

In the picture above, this is how React TanStack define their variable. These variable have the same concept as "useState" because it will make a reference of the API call result and cached it if you specify the option.

# queryFunction

![image](https://github.com/Personal-Internal-Github/Budget-Tracker-Frontend/assets/60610270/f52740c8-74ed-41dc-a726-90c9a9aefcf3)

"queryFunction is where you will add your logic to call an API like in picture above. The logic can be complicated or it can be as simple as above. The logic result will be safe in "data" attribute.

(( !!PLEASE NOTE: you will received an error if you have many API call in 1 component. To resolve this issue, it is better to not destructuring the attribute return and put it into 1 variable. You can still access the attribute using the variable name. ))

# Invalidate Query

The title above is just a naming that React TanStack gave.

The real meaning behind it is, if the initial cache data is not the same, refresh the React Tree or the page and display the latest data.

![image](https://github.com/Personal-Internal-Github/Budget-Tracker-Frontend/assets/60610270/edecc902-80dc-4ecb-9463-2c42126d7ac1)


From the image above, this is deleting expense entry. After I delete the expense entry, I want the expense list and expense list to reflect the latest data.
