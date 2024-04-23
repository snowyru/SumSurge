#### This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-wagmi`](https://github.com/wevm/wagmi/tree/main/packages/create-wagmi).

# Node.js Package Vulnerabilities

## Date

This report was generated on **April 23, 2024**.

## Overview

Our recent `npm audit` has identified **3 vulnerabilities** (1 low, 2 moderate) in our Node.js project. The affected packages are `postcss` and `zod`, which are dependencies of our `next` package.

## Details

1. **postcss <8.4.31**
    - Severity: Moderate
    - Issue: PostCSS line return parsing error
    - More Info: GitHub Advisory
    - Affected: `next` versions 9.3.4-canary.0 - 13.5.4-canary.11

2. **zod <=3.22.2**
    - Severity: Moderate
    - Issue: Zod denial of service vulnerability
    - More Info: GitHub Advisory
    - Affected: `next` versions 9.3.4-canary.0 - 13.5.4-canary.11

## Action Plan

While fixes are available via `npm audit fix --force`, we have decided **not to force fix** these vulnerabilities at this time. The reason for this decision is to maintain stability and prevent potential breaking changes in our project.

Force fixing these vulnerabilities would cause `next` to update to version 13.5.6 from our current version 13.5.4. This update may introduce breaking changes that could disrupt our testing process.

We will continue to monitor these vulnerabilities and plan for a safe upgrade in the future when we can adequately test and ensure the stability of newer versions.
