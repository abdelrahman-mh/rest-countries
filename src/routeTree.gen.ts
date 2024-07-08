/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as CountriesCca3Import } from './routes/countries.$cca3'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const CountriesCca3Route = CountriesCca3Import.update({
  path: '/countries/$cca3',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/countries/$cca3': {
      id: '/countries/$cca3'
      path: '/countries/$cca3'
      fullPath: '/countries/$cca3'
      preLoaderRoute: typeof CountriesCca3Import
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  CountriesCca3Route,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/countries/$cca3"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/countries/$cca3": {
      "filePath": "countries.$cca3.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
