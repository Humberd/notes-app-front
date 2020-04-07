import { AutocompleteInputFormValues } from '@composite-library/lib/forms/autocomplete-input/models/autocomplete-input-form-values';

export interface SaveWebsiteFormValues {
  title: string;
  newTag: AutocompleteInputFormValues;
  content: string;
}
