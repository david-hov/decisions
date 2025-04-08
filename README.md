# Decision Tree

This project provides a **Nest.js** backend application for managing and executing different types of actions, such as sending **SMS**, **emails**, and **condition-based** actions. The actions are defined using a set of interfaces and classes, and the system allows for conditional execution based on a defined condition (e.g., matching **New Year's** date). This can be used in scenarios where various actions need to be executed based on specific criteria or conditions


## Features

- **Condition-based actions**: Execute actions depending on whether a specific condition is met (matching **New Year's** date).
- **Action types**: Supports multiple action types, including `sms`, `email`, `loop`, and `condition`.
- **Action Execution**: Each action type implements an `execute` method to perform the intended action asynchronously.
- **Recursive Action Handling**: Supports recursive handling of nested actions (`trueAction`, `falseAction`) within a condition.


## Technologies

- **TypeScript**: The entire project is written in TypeScript for type safety and better development experience.
- **NestJS**: A Node.js framework used for building efficient, reliable, and scalable server-side applications.
- **class-validator**: A library used to validate the structure and data types of incoming objects.

## Action Processing System

This project provides a system to process. The input data is provided in JSON format and validated using `class-validator` within a NestJS application.

## Example Request Formats

We can use tools like **Postman** to send requests to this API.

### SMS or EMAIL
POST: http://localhost:3001/decision
```json
{
  "actions": [
    {
        "type": "email",
        "from": "from@gmail.com",
        "to": "to@gmail.com",
        "message": "Hi"
    },
    {
      "type": "sms",
      "phone": "+1234567890",
      "message": "Hi"
    }
  ]
}
```

### Conditional (hard coded 01-01-2025)
POST: http://localhost:3001/decision
```json
{
    "actions": [
        {
            "type": "condition",
            "expression": "01-01-2025",
            "trueAction": [
                {
                    "type": "sms",
                    "phone": "+1234567890",
                    "message": "Happy New Year"
                },
                {
                    "type": "sms",
                    "phone": "+1234567890",
                    "message": "Happy New Year"
                }
            ],
            "falseAction": [
                {
                    "type": "sms",
                    "phone": "+1234567890",
                    "message": "Just Good Day"
                }
            ]
        }
    ]
}
```

### Loop
POST: http://localhost:3001/decision
```json
{
    "type": "loop",
    "count": 5,
    "action": {
        "type": "sms",
        "phone": "+1234567890",
        "message": "Hi Loop"
    }
}
```


## Project Installation

To ensure the correct Node.js version, this project uses an `.nvmrc` file. If you are using nvm (Node Version Manager), you can run the following command to automatically use the appropriate version:
```sh
nvm use
```
## Follow these steps to set up the project:  (Optional)

1. Copy the example environment file and create your `.env`:

   ```sh
   cp .env.example .env
2. Set env variables in .env file:
    ```sh
    port=
    ```

Install the dependencies:

```sh
npm i
```
Start the development server:

```sh
npm run start:dev
```

## Docker Commands

### Build the Docker image

```bash
docker build -t action-processor .
```

### Run Docker image with compose

```bash
docker-compose up -d
