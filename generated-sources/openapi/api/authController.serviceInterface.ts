/**
 * Brain Nutrient API
 * API documentation for Brain Nutrient project
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { AccessToken } from '../model/models';
import { LoginDto } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface AuthControllerServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * 
     * 
     * @param loginDto 
     */
    authControllerLogin(loginDto: LoginDto, extraHttpRequestParams?: any): Observable<AccessToken>;

    /**
     * 
     * 
     * @param body 
     */
    authControllerRefreshToken(body: object, extraHttpRequestParams?: any): Observable<AccessToken>;

    /**
     * 
     * 
     * @param loginDto 
     */
    authControllerRegister(loginDto: LoginDto, extraHttpRequestParams?: any): Observable<AccessToken>;

}
