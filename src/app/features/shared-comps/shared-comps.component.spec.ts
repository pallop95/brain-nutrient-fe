import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCompsComponent } from './shared-comps.component';

describe('SharedCompsComponent', () => {
  let component: SharedCompsComponent;
  let fixture: ComponentFixture<SharedCompsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedCompsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedCompsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
