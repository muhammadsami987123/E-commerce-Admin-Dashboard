# UAE E-commerce Admin Dashboard

A comprehensive admin dashboard for e-commerce business management built with Next.js and Tailwind CSS.

## Features

- **Authentication**: Secure login functionality
- **Dashboard Overview**: Visual representation of business metrics
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and filter orders with detailed views
- **Customer Profiles**: Customer information with purchase history
- **Responsive Design**: Optimized for mobile, tablet, and desktop

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_DEFAULT_EMAIL=admin@gmail.com
NEXT_PUBLIC_DEFAULT_PASSWORD=12345
NEXT_PUBLIC_APP_NAME=UAE Admin Dashboard
NEXT_PUBLIC_COMPANY_NAME=UAE E-commerce
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to access the dashboard.

### Login Credentials

- Email: admin@gmail.com
- Password: 12345

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- Client-side state management

## Project Structure

- `app/` - Next.js app directory
- `components/` - Reusable UI components
- `public/` - Static assets
- `styles/` - Global CSS and Tailwind configuration

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
