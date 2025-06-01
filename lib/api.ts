import { ResultAsync, fromPromise } from 'neverthrow';

import type { ProfessionalsResponse } from '@/lib/types';
import { ProfessionalsResponseSchema as Schema } from '@/lib/types';

// Constants
const BASE_URL = 'https://mcf-api-services-dev.onrender.com/api/v1';
const COMPANY_ID = 'bd56d036-bd66-46eb-a970-c65e615da5d0';
const REVALIDATE_SECONDS = 300; // 5 minutes

// Helper function to handle fetch requests
function createFetchRequest(url: string, token: string) {
  return fromPromise(
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }),
    (error) => {
      console.error('Network error:', error);
      return new Error(`Network error: ${error}`);
    }
  );
}

// Helper function to handle response processing
function processResponse(response: Response) {
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}`);
    return ResultAsync.fromSafePromise(
      Promise.reject(new Error(`HTTP error! status: ${response.status}`))
    );
  }
  return fromPromise(response.json(), (error) => {
    console.error('Failed to parse JSON:', error);
    return new Error(`Failed to parse JSON: ${error}`);
  });
}

// Helper function to validate data with method context
function validateData(data: unknown, method: string = 'unknown') {
  // Enhanced debug log with method context - only in development
  if (process.env.NODE_ENV === 'development') {
    const apiData = data as { statusCode?: number; data?: unknown[] };
    console.info(
      `[${method}] API Response: ${apiData.statusCode} | Items: ${apiData.data?.length || 0}`
    );
  }

  const validationResult = Schema.safeParse(data);

  if (!validationResult.success) {
    console.error(`[${method}] Data validation failed:`, validationResult.error.issues);

    // Instead of crashing, return a fallback response with empty data
    const fallbackResponse: ProfessionalsResponse = {
      statusCode: 200,
      message: 'Data validation failed, showing empty results',
      data: [],
    };

    console.warn(`[${method}] Returning fallback empty response due to validation errors`);
    return ResultAsync.fromSafePromise(Promise.resolve(fallbackResponse));
  }

  return ResultAsync.fromSafePromise(Promise.resolve(validationResult.data));
}

export function fetchProfessionals(
  bearerToken?: string
): ResultAsync<ProfessionalsResponse, Error> {
  // Get token from parameter first, then from environment
  const token = bearerToken || process.env.BEARER_TOKEN;

  if (!token) {
    console.error('[fetchProfessionals] Bearer token not found');
    return ResultAsync.fromSafePromise(Promise.reject(new Error('Bearer token not found')));
  }

  return createFetchRequest(`${BASE_URL}/enterprise/professionals?companyId=${COMPANY_ID}`, token)
    .andThen(processResponse)
    .andThen((data) => validateData(data, 'fetchProfessionals'));
}

// Cached version with configurable revalidation time
export function fetchProfessionalsCached(
  bearerToken?: string,
  revalidateSeconds: number = REVALIDATE_SECONDS // 5 minutes default
): ResultAsync<ProfessionalsResponse, Error> {
  const token = bearerToken || process.env.BEARER_TOKEN;

  if (!token) {
    console.error('[fetchProfessionalsCached] Bearer token not found');
    return ResultAsync.fromSafePromise(Promise.reject(new Error('Bearer token not found')));
  }

  return createFetchRequest(`${BASE_URL}/enterprise/professionals?companyId=${COMPANY_ID}`, token)
    .andThen((response) => {
      // Add cache headers for Next.js
      if (typeof window === 'undefined') {
        // Server-side: use Next.js cache
        return fromPromise(
          fetch(`${BASE_URL}/enterprise/professionals?companyId=${COMPANY_ID}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            next: { revalidate: revalidateSeconds },
          }),
          (error) => {
            console.error('[fetchProfessionalsCached] Network error:', error);
            return new Error(`Network error: ${error}`);
          }
        );
      }
      return ResultAsync.fromSafePromise(Promise.resolve(response));
    })
    .andThen(processResponse)
    .andThen((data) => validateData(data, 'fetchProfessionalsCached'));
}

// Client-side API function that uses a route handler
export function fetchProfessionalsClient(): ResultAsync<ProfessionalsResponse, Error> {
  return fromPromise(
    fetch('/api/professionals', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    (error) => {
      console.error('[fetchProfessionalsClient] Client network error:', error);
      return new Error(`Network error: ${error}`);
    }
  )
    .andThen(processResponse)
    .andThen((data) => validateData(data, 'fetchProfessionalsClient'));
}
