import { InjectionToken } from '@angular/core';

export const defaultAuthorizedRoute = new InjectionToken<string>('Default Authorized Route');
export const defaultUnauthorizedRoute = new InjectionToken<string>('Default Unauthorized Route');
