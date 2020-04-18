import { ContentScriptRequestType } from '@composite-library/lib/chrome/content-scripts/models/content-script-request-type';

export interface ContentScriptRequest<Response> {
  type: ContentScriptRequestType;
  sendResponse: (response: Response) => void;
}
