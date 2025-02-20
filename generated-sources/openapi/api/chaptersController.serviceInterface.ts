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

import { ChapterDto } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface ChaptersControllerServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * 
     * 
     * @param chapterDto 
     */
    chaptersControllerCreateChapter(chapterDto: ChapterDto, extraHttpRequestParams?: any): Observable<ChapterDto>;

    /**
     * 
     * 
     * @param id 
     */
    chaptersControllerDeleteChapter(id: string, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * 
     * 
     */
    chaptersControllerFindAllChaptersS(extraHttpRequestParams?: any): Observable<Array<ChapterDto>>;

    /**
     * 
     * 
     * @param id 
     */
    chaptersControllerFindChapterById(id: string, extraHttpRequestParams?: any): Observable<ChapterDto>;

    /**
     * 
     * 
     * @param id 
     * @param chapterDto 
     */
    chaptersControllerUpdateChapter(id: string, chapterDto: ChapterDto, extraHttpRequestParams?: any): Observable<ChapterDto>;

}
