import { Injectable } from '@angular/core';
import { DummyControllerService } from '../../../../generated-sources/openapi';

@Injectable({
  providedIn: 'root'
})
export class DummyService {

  constructor(private dummyControllerService: DummyControllerService) {}

  generateBadRequestError() {
    console.log('generateBadRequestError ...');
    return this.dummyControllerService.dummyControllerGenerateBadRequestError();
  }

  generateInternalServerError() {
    console.log('generateInternalServerError ...');
    return this.dummyControllerService.dummyControllerGenerateInternalServerError();
  }

  generateNotFoundError() {
    console.log('generateNotFoundError ...');
    return this.dummyControllerService.dummyControllerGenerateNotFoundError();
  }

  generateTimeoutError() {
    console.log('generateTimeoutError ...');
    return this.dummyControllerService.dummyControllerGenerateTimeoutError();
  }

  generateUnauthorizedError() {
    console.log('generateUnauthorizedError ...');
    return this.dummyControllerService.dummyControllerGenerateUnauthorizedError();
  }

  generateValidationError(id: number) {
    console.log('generateValidationError ...');
    return this.dummyControllerService.dummyControllerGenerateValidationError(id);
  }
}
