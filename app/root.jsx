// import {
//   Links,
//   Meta,
//   Outlet,
//   Scripts,
//   LiveReload,
//   ScrollRestoration,
//   useLoaderData,
// } from '@remix-run/react';
// import appStyles from './styles/app.css';
// import favicon from '../public/favicon.svg';
// import {useNonce} from '@shopify/hydrogen';

// // This is important to avoid re-fetching root queries on sub-navigations
// /**
//  * @type {ShouldRevalidateFunction}
//  */
// export const shouldRevalidate = ({formMethod, currentUrl, nextUrl}) => {
//   // revalidate when a mutation is performed e.g add to cart, login...
//   if (formMethod && formMethod !== 'GET') {
//     return true;
//   }

//   // revalidate when manually revalidating via useRevalidator
//   if (currentUrl.toString() === nextUrl.toString()) {
//     return true;
//   }

//   return false;
// };

// /**
//  * @type {LinksFunction}
//  */
// export const links = () => {
//   return [
//     {rel: 'stylesheet', href: appStyles},
//     {
//       rel: 'preconnect',
//       href: 'https://cdn.shopify.com',
//     },
//     {
//       rel: 'preconnect',
//       href: 'https://shop.app',
//     },
//     {rel: 'icon', type: 'image/svg+xml', href: favicon},
//   ];
// };

// /**
//  * @param {LoaderFunctionArgs}
//  */
// export async function loader({context}) {
//   const layout = await context.storefront.query(LAYOUT_QUERY);
//   return {layout};
// }

// export default function App() {
//   const nonce = useNonce();
//   /** @type {LoaderReturnData} */
//   const data = useLoaderData();

//   const {name} = data.layout.shop;

//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width,initial-scale=1" />
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         <h1>Hello, {name}</h1>
//         <p>This is a custom storefront powered by Hydrogen</p>
//         <Outlet />
//         <ScrollRestoration nonce={nonce} />
//         <Scripts nonce={nonce} />
//         <LiveReload nonce={nonce} />
//       </body>
//     </html>
//   );
// }

// const LAYOUT_QUERY = `#graphql
//   query layout {
//     shop {
//       name
//       description
//     }
//   }
// `;

// /** @typedef {import('@shopify/remix-oxygen').LinksFunction} LinksFunction */
// /** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
// /** @typedef {import('@remix-run/react').ShouldRevalidateFunction} ShouldRevalidateFunction */
// /** @typedef {import('@shopify/hydrogen/storefront-api-types').Shop} Shop */
// /** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */


import {
  Links,
  Meta,
  Outlet,
  Scripts,
  LiveReload,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import appStyles from './styles/app.css';
import favicon from '../public/favicon.svg';
import {useNonce} from '@shopify/hydrogen';
import {json} from '@shopify/remix-oxygen';

// Define the links function to include CSS and favicon
export const links = () => {
  return [
    {rel: 'stylesheet', href: appStyles},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
};

// Define the loader function to fetch initial data using REST
export async function loader() {
  const response = await fetch('https://your-shopify-storefront.com/api/storefront', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.PUBLIC_STOREFRONT_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch store data');
  }

  const layout = await response.json();
  return json({layout});
}

// Define the main App component
export default function App() {
  const nonce = useNonce();
  const data = useLoaderData();
  const {name} = data.layout.shop;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header shopName={name} />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  );
}

// Define the Header component
const Header = ({shopName}) => (
  <header>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/favorites">Favorites</a></li>
      </ul>
    </nav>
    <h1>{shopName}</h1>
  </header>
);

// Define the Footer component
const Footer = () => (
  <footer>
    <p>&copy; {new Date().getFullYear()} My E-commerce Store. All rights reserved.</p>
  </footer>
);

