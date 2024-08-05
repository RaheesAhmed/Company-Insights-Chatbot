# Company Insights Chatbot Setup Guide

Follow these steps to set up and run the Company Insights Chatbot on your local machine.


![UI Admin](public/1.PNG) ![UI User](public/2.PNG)



## Step 1: Clone the Repository

First, clone the repository using git:

```
git clone https://github.com/RaheesAhmed/Company-Insights-Chatbot.git
```

## Step 2: Navigate to the Project Directory

After cloning, change into the project directory:
```
cd Company-Insights-Chatbot
```

## Step 3: Install Dependencies

Install the necessary npm packages:
```
npm install
```

Create a new file in the root directory and name it as `.env` and following keys:
```
OPENAI_API_KEY=
OPENAI_ASSISTANT_ID=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

```

## Step 4: Start the Application
Start the server using npm:

```
npm run start
```

## Step 5: Access the Application
Open your web browser and go to the following URL to access the application:


```
http://localhost:3000
```


## Testing the Application
Once the application is running, you can test it by interacting with the interface provided at localhost:3000.