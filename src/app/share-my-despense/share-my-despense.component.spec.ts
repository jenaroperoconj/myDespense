import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShareMyDespenseComponent } from './share-my-despense.component';

describe('ShareMyDespenseComponent', () => {
  let component: ShareMyDespenseComponent;
  let fixture: ComponentFixture<ShareMyDespenseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ShareMyDespenseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShareMyDespenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
