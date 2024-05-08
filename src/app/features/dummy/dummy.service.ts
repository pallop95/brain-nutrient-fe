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
    return this.dummyControllerService.dummyControllerGenerateInternalServerError();
  }

  generateNotFoundError() {
    return this.dummyControllerService.dummyControllerGenerateNotFoundError();
  }

  generateTimeoutError() {
    return this.dummyControllerService.dummyControllerGenerateTimeoutError();
  }

  generateUnauthorizedError() {
    return this.dummyControllerService.dummyControllerGenerateUnauthorizedError();
  }

  generateValidationError(id: number) {
    return this.dummyControllerService.dummyControllerGenerateValidationError(id);
  }
}
