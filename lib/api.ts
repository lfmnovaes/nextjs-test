import { ResultAsync, fromPromise } from 'neverthrow';
import type { ProfessionalsResponse } from '@/lib/types';
import { ProfessionalsResponseSchema as Schema } from '@/lib/types';

// Constants
const BASE_URL = 'https://mcf-api-services-dev.onrender.com/api/v1';
const COMPANY_ID = '992e792c-f1f3-4a75-a286-fcead055026c';

export function fetchProfessionals(bearerToken?: string): ResultAsync<ProfessionalsResponse, Error> {
  // Get token from parameter first, then from environment
  const token = bearerToken || process.env.BEARER_TOKEN;
  
  if (!token) {
    console.error('Bearer token not found');
    return ResultAsync.fromSafePromise(
      Promise.reject(new Error('Bearer token not found'))
    );
  }

  return fromPromise(
    fetch(`${BASE_URL}/enterprise/professionals?companyId=${COMPANY_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }),
    (error) => {
      console.error('Network error:', error);
      return new Error(`Network error: ${error}`);
    }
  )
    .andThen((response) => {
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return ResultAsync.fromSafePromise(
          Promise.reject(new Error(`HTTP error! status: ${response.status}`))
        );
      }
      return fromPromise(
        response.json(),
        (error) => {
          console.error('Failed to parse JSON:', error);
          return new Error(`Failed to parse JSON: ${error}`);
        }
      );
    })
    .andThen((data) => {
      // Log the raw data for debugging (only in development)
      if (process.env.NODE_ENV === 'development') {
        console.log('API Response sample:', {
          statusCode: data.statusCode,
          message: data.message,
          dataLength: data.data?.length,
          firstItem: data.data?.[0] ? {
            id: data.data[0].id,
            name: data.data[0].name,
            yearsOfExperience: data.data[0].yearsOfExperience,
            yearsOfExperienceType: typeof data.data[0].yearsOfExperience
          } : null
        });
      }

      const validationResult = Schema.safeParse(data);
      
      if (!validationResult.success) {
        // Only log validation errors, don't crash the app
        console.error('Data validation failed:', validationResult.error.issues);
        console.error('Raw data sample:', data?.data?.[0]);
        return ResultAsync.fromSafePromise(
          Promise.reject(new Error('Data validation failed. Check console for details.'))
        );
      }

      return ResultAsync.fromSafePromise(Promise.resolve(validationResult.data));
    });
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
      console.error('Client network error:', error);
      return new Error(`Network error: ${error}`);
    }
  )
    .andThen((response) => {
      if (!response.ok) {
        console.error(`Client HTTP error! status: ${response.status}`);
        return ResultAsync.fromSafePromise(
          Promise.reject(new Error(`HTTP error! status: ${response.status}`))
        );
      }
      return fromPromise(
        response.json(),
        (error) => {
          console.error('Client failed to parse JSON:', error);
          return new Error(`Failed to parse JSON: ${error}`);
        }
      );
    })
    .andThen((data) => {
      const validationResult = Schema.safeParse(data);
      
      if (!validationResult.success) {
        // Only log validation errors, don't crash the app
        console.error('Client validation failed:', validationResult.error.issues);
        return ResultAsync.fromSafePromise(
          Promise.reject(new Error('Data validation failed. Check console for details.'))
        );
      }

      return ResultAsync.fromSafePromise(Promise.resolve(validationResult.data));
    });
} 