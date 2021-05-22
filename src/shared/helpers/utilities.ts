/**
 * @fileOverview Helper functions defined.
 * @file   utilities.ts
 * @author EasyFinder Inc.
 * @since  1.0.0
 * @version 1.0.0
 */

import { ApiType } from "../types/configurator-types";
/**
   * @param url String
   * @returns requestType String
   */
export function checkEndPointType(url: string): string {
  let requestType: string;
  // eg: /forms/5d2ead91da402a05bc90c94c/submit;
  let formSubmitUrlPattern: RegExp = new RegExp(/^\/([a-z0-9]+)\/([submit]+)$/);
  /* eg: /forms/5d2ead91da402a05bc90c94c/mappings/5d2ead91da402a05bc90c94c
           /forms
           /forms/5d2ead91da402a05bc90c94c
           /forms/5d2ead91da402a05bc90c94c/mappings
    */
  let formDefinitionUrlPattern: RegExp = new RegExp(/^([/]*)([a-z0-9]*)([/]*)([a-z]*)([/]*)([a-z0-9]*)$/);

  if (formSubmitUrlPattern.test(url)) {
    requestType = ApiType.Submission;
    return requestType;
  }

  if (formDefinitionUrlPattern.test(url)) {
    requestType = ApiType.Management;
    return requestType;
  }
}

/**
   * @param url String
   * @returns boolean
   */
export function isFormCreationEndPoint(url: string): boolean {
  let urlPattern: RegExp = new RegExp(/^([/]*)([forms]*)([/]*)$/);
  return urlPattern.test(url);
}
