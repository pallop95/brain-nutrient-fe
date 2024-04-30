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

import { BookDto } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface BooksServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * 
     * 
     * @param bookDto 
     */
    booksControllerCreateBook(bookDto: BookDto, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * 
     * 
     * @param id 
     */
    booksControllerDeleteBook(id: string, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * 
     * 
     */
    booksControllerFindAllBooks(extraHttpRequestParams?: any): Observable<{}>;

    /**
     * 
     * 
     * @param id 
     */
    booksControllerFindBookById(id: string, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * 
     * 
     * @param id 
     */
    booksControllerUpdateBook(id: string, extraHttpRequestParams?: any): Observable<{}>;

}
