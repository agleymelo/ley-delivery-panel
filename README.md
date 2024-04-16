# Ley Delivery

Ley Delivery is a delivery management application that allows users to register categories, products, and view all orders in real time. This project was developed using Vite, Shadcn/ui, Tailwind CSS, React Query, React Router DOM, and Context API.

## Features

- Category registration for products.
- Product registration associated with categories.
- View of all orders.
- Real-time order updates.

## Live Demo

Here is a demo version for you to test the application, feel free to make changes, as they are all reverted soon after.

website: https://ley-delivery-panel.vercel.app/sign-in

email: admin@ley.com
password 123456

## Prerequisites

Bun

## Installation

1. Clone the project repository:

```bash
git clone https://github.com/agleymelo/ley-delivery-panel.git
```

```bash
cd ley-delivery-panel
```

```bash
bun install
```

## Environment Variables

Before starting the application, you need to configure the following environment variables:

- VITE_API_URL: URL of the API used by the application.
- VITE_ENABLE_API_DELAY: Configuration to enable or disable simulated API delay. Set to false to disable.

You can set these environment variables by creating a .env file in the project root and adding the variables as shown in the example below:

```env
VITE_API_URL=https://your-api.com
VITE_ENABLE_API_DELAY=false
```

## Running the Application

After configuring the environment variables, you can start the application by running the following command:

```bash
bun dev
```

This will start the application in development mode. Open your browser and navigate to `http://localhost:5173` to view the application.

## API

the project with the ready API can be found [here](https://github.com/agleymelo/ley-delivery-api)